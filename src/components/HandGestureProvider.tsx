import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CameraOff, Maximize2, Minimize2 } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type GestureContextValue = {
  isActive: boolean
  enable: () => Promise<void>
  disable: () => void
}

type WristSample = {
  y: number
  timestamp: number
}

type Props = {
  children: React.ReactNode
  onSwipeUp: () => void
  onSwipeDown: () => void
}

// ── Gesture constants ─────────────────────────────────────────────────────────

const SWIPE_DELTA_THRESHOLD = 0.12   // normalised Y change required
const SWIPE_TIME_WINDOW_MS  = 200    // ms window for swipe accumulation
const PINCH_DIST_THRESHOLD  = 0.07   // normalised thumb-to-index distance
const PINCH_FRAMES_REQUIRED = 4      // consecutive frames to confirm pinch
const GESTURE_COOLDOWN_MS   = 900    // ms between any two gesture events
const WRIST_BUFFER_SIZE     = 8

// MediaPipe hand landmark indices
const WRIST_IDX     = 0
const THUMB_TIP_IDX = 4
const INDEX_TIP_IDX = 8

// ── Context ───────────────────────────────────────────────────────────────────

const GestureContext = createContext<GestureContextValue>({
  isActive: false,
  enable: async () => {},
  disable: () => {},
})

export function useGesture() {
  return useContext(GestureContext)
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function HandGestureProvider({ children, onSwipeUp, onSwipeDown }: Props) {
  // UI state (triggers renders)
  const [isActive, setIsActive]       = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isPulsing, setIsPulsing]     = useState(false)

  // Engine refs (mutated inside rAF loop — no re-renders)
  const landmarkerRef   = useRef<import('@mediapipe/tasks-vision').HandLandmarker | null>(null)
  const streamRef       = useRef<MediaStream | null>(null)
  const videoRef        = useRef<HTMLVideoElement | null>(null)
  const canvasRef       = useRef<HTMLCanvasElement | null>(null)
  const rafIdRef        = useRef<number>(0)
  const wristBufferRef  = useRef<WristSample[]>([])
  const lastGestureRef  = useRef<number>(0)
  const pinchCountRef   = useRef<number>(0)
  const isActiveRef     = useRef<boolean>(false)

  // Stable refs for callbacks (avoids stale closures in rAF loop)
  const onSwipeUpRef   = useRef(onSwipeUp)
  const onSwipeDownRef = useRef(onSwipeDown)
  useEffect(() => { onSwipeUpRef.current = onSwipeUp },   [onSwipeUp])
  useEffect(() => { onSwipeDownRef.current = onSwipeDown }, [onSwipeDown])

  // ── Gesture logic ──────────────────────────────────────────────────────────

  const fireGesture = useCallback((kind: 'swipe-up' | 'swipe-down' | 'pinch', x?: number, y?: number) => {
    lastGestureRef.current  = performance.now()
    wristBufferRef.current  = []
    pinchCountRef.current   = 0

    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 600)

    if (kind === 'swipe-up')   { onSwipeUpRef.current() }
    if (kind === 'swipe-down') { onSwipeDownRef.current() }
    if (kind === 'pinch' && x !== undefined && y !== undefined) {
      const el = document.elementFromPoint(x, y)
      if (el) { (el as HTMLElement).click() }
    }
  }, [])

  const processLandmarks = useCallback((
    landmarks: { x: number; y: number; z: number }[],
  ) => {
    const now = performance.now()
    if (now - lastGestureRef.current < GESTURE_COOLDOWN_MS) return

    // ── Swipe detection ──
    const wrist  = landmarks[WRIST_IDX]
    const buffer = wristBufferRef.current

    buffer.push({ y: wrist.y, timestamp: now })

    const cutoff  = now - SWIPE_TIME_WINDOW_MS
    const trimmed = buffer.filter(s => s.timestamp > cutoff).slice(-WRIST_BUFFER_SIZE)
    wristBufferRef.current = trimmed

    if (trimmed.length >= 2) {
      const oldest = trimmed[0]
      const newest = trimmed[trimmed.length - 1]
      const deltaY = newest.y - oldest.y

      // Y=0 is at top in MediaPipe: deltaY < 0 means hand moved UP
      if (deltaY < -SWIPE_DELTA_THRESHOLD) {
        fireGesture('swipe-up')
        return
      }
      if (deltaY > SWIPE_DELTA_THRESHOLD) {
        fireGesture('swipe-down')
        return
      }
    }

    // ── Pinch detection ──
    const thumbTip = landmarks[THUMB_TIP_IDX]
    const indexTip = landmarks[INDEX_TIP_IDX]
    const dx   = thumbTip.x - indexTip.x
    const dy   = thumbTip.y - indexTip.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < PINCH_DIST_THRESHOLD) {
      pinchCountRef.current++
      if (pinchCountRef.current >= PINCH_FRAMES_REQUIRED) {
        // X is flipped because video is CSS-mirrored
        const midX = (thumbTip.x + indexTip.x) / 2
        const midY = (thumbTip.y + indexTip.y) / 2
        const screenX = (1 - midX) * window.innerWidth
        const screenY = midY * window.innerHeight
        fireGesture('pinch', screenX, screenY)
      }
    } else {
      pinchCountRef.current = 0
    }
  }, [fireGesture])

  // ── Canvas overlay ────────────────────────────────────────────────────────

  const drawLandmarks = useCallback((landmarks: { x: number; y: number }[]) => {
    const canvas = canvasRef.current
    const video  = videoRef.current
    if (!canvas || !video) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = video.videoWidth  || 320
    canvas.height = video.videoHeight || 240
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const keyPoints = [WRIST_IDX, THUMB_TIP_IDX, INDEX_TIP_IDX]
    for (const i of keyPoints) {
      const lm = landmarks[i]
      ctx.beginPath()
      ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 5, 0, Math.PI * 2)
      ctx.fillStyle = i === WRIST_IDX ? '#2563eb' : '#93c5fd'
      ctx.fill()
    }
  }, [])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  // ── Detection loop ────────────────────────────────────────────────────────

  const detectionLoop = useCallback((timestamp: number) => {
    if (!isActiveRef.current) return

    const video     = videoRef.current
    const landmarker = landmarkerRef.current

    if (!video || !landmarker || video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      rafIdRef.current = requestAnimationFrame(detectionLoop)
      return
    }

    const result = landmarker.detectForVideo(video, timestamp)

    if (result.landmarks.length > 0) {
      processLandmarks(result.landmarks[0])
      drawLandmarks(result.landmarks[0])
    } else {
      clearCanvas()
      pinchCountRef.current = 0
    }

    rafIdRef.current = requestAnimationFrame(detectionLoop)
  }, [processLandmarks, drawLandmarks, clearCanvas])

  // ── Enable / Disable ──────────────────────────────────────────────────────

  const disable = useCallback(() => {
    isActiveRef.current = false
    cancelAnimationFrame(rafIdRef.current)

    streamRef.current?.getTracks().forEach(track => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    landmarkerRef.current?.close()
    landmarkerRef.current = null

    wristBufferRef.current = []
    pinchCountRef.current  = 0

    setIsActive(false)
    setIsPulsing(false)
  }, [])

  const enable = useCallback(async () => {
    const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision')

    const [vision, stream] = await Promise.all([
      FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm',
      ),
      navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
        audio: false,
      }),
    ])

    const landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 1,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    landmarkerRef.current = landmarker
    streamRef.current     = stream

    if (videoRef.current) {
      videoRef.current.srcObject = stream
      await videoRef.current.play()
    }

    isActiveRef.current = true
    setIsActive(true)

    rafIdRef.current = requestAnimationFrame(detectionLoop)
  }, [detectionLoop])

  // Cleanup on unmount
  useEffect(() => () => { disable() }, [disable])

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <GestureContext.Provider value={{ isActive, enable, disable }}>
      {children}

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-2"
          >
            {/* Camera preview circle */}
            <motion.div
              className={[
                'relative overflow-hidden rounded-full border-2 shadow-xl shadow-blue-500/20 transition-all duration-300 bg-slate-900',
                isMinimized ? 'size-10' : 'size-20',
                isPulsing ? 'border-blue-400' : 'border-white/70',
              ].join(' ')}
              animate={
                isPulsing
                  ? { boxShadow: ['0 0 0 0 rgba(37,99,235,0.5)', '0 0 0 14px rgba(37,99,235,0)'] }
                  : {}
              }
              transition={{ duration: 0.6 }}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
                playsInline
                muted
                autoPlay
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
                style={{ transform: 'scaleX(-1)' }}
              />
            </motion.div>

            {/* Minimize / expand toggle */}
            <button
              type="button"
              onClick={() => setIsMinimized(prev => !prev)}
              className="flex size-6 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-md backdrop-blur transition hover:text-blue-600"
              aria-label={isMinimized ? 'Expand camera preview' : 'Minimize camera preview'}
            >
              {isMinimized
                ? <Maximize2 className="size-3" />
                : <Minimize2 className="size-3" />
              }
            </button>

            {/* Stop gesture mode */}
            <button
              type="button"
              onClick={disable}
              className="flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs font-medium text-slate-500 shadow-md backdrop-blur transition hover:text-red-500"
            >
              <CameraOff className="size-3" />
              Stop
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </GestureContext.Provider>
  )
}
