import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, useAnimation, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Navbar } from './Navbar'
import { sections, type SectionId } from '../constants/sections'
import { HomeSection } from '../sections/HomeSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { AboutSection } from '../sections/AboutSection'
import { AcademicSection } from '../sections/AcademicSection'
import { TrustedVoicesSection } from '../sections/TrustedVoicesSection'
// import { GallerySection } from '../sections/GallerySection'
import { ContactSection } from '../sections/ContactSection'

const MOBILE_BREAKPOINT = '(max-width: 768px)'

export function Portfolio() {
  const navigate = useNavigate()
  const location = useLocation()
  const controls = useAnimation()

  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_BREAKPOINT).matches : false,
  )

  const isAnimatingRef = useRef(false)
  const touchStartRef = useRef<number | null>(null)
  const progressMotion = useSpring(0, { stiffness: 120, damping: 24, mass: 0.8 })
  const progressGradient = useTransform(progressMotion, (value) => {
    const clamped = Math.min(Math.max(value, 0), 1)
    const degrees = clamped * 360
    return `conic-gradient(from 90deg at 50% 50%, rgba(37,99,235,0.85) ${degrees}deg, rgba(226,232,240,0.5) ${degrees}deg)`
  })

  const activeSectionId = useMemo<SectionId>(
    () => sections[activeIndex]?.id ?? 'home',
    [activeIndex],
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const pathSegment = location.pathname.replace('/', '') || 'home'
    const nextIndex = sections.findIndex((section) => section.id === pathSegment)

    if (nextIndex === -1) {
      navigate(`/${sections[0].id}`, { replace: true })
      return
    }

    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex)
    }
  }, [activeIndex, location.pathname, navigate])

  useEffect(() => {
    if (isMobile) return
    const animate = async () => {
      isAnimatingRef.current = true
      await controls.start({
        y: `-${activeIndex * 100}vh`,
        transition: {
          type: 'spring',
          stiffness: 110,
          damping: 20,
        },
      })
      isAnimatingRef.current = false
    }

    void animate()
  }, [activeIndex, controls, isMobile])

  const handleNavigate = useCallback(
    (section: SectionId) => {
      const nextIndex = sections.findIndex((entry) => entry.id === section)
      if (nextIndex === -1) return

      if (isMobile) {
        const target = document.getElementById(`section-${section}`)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        if (nextIndex !== activeIndex) {
          navigate(`/${section}`)
        }
        return
      }

      if (nextIndex === activeIndex || isAnimatingRef.current) return
      navigate(`/${section}`)
    },
    [activeIndex, isMobile, navigate],
  )

  const changeSectionByDelta = useCallback(
    (delta: number) => {
      if (isMobile || isAnimatingRef.current) return
      const nextIndex = Math.min(
        Math.max(activeIndex + delta, 0),
        sections.length - 1,
      )
      if (nextIndex === activeIndex) return
      navigate(`/${sections[nextIndex].id}`)
    },
    [activeIndex, isMobile, navigate],
  )

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (isMobile || isAnimatingRef.current) return
      if (Math.abs(event.deltaY) < 20) return
      changeSectionByDelta(event.deltaY > 0 ? 1 : -1)
    },
    [changeSectionByDelta, isMobile],
  )

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (isMobile) return
      touchStartRef.current = event.touches[0].clientY
    },
    [isMobile],
  )

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (isMobile || touchStartRef.current === null) return
      const delta = touchStartRef.current - event.changedTouches[0].clientY
      touchStartRef.current = null
      if (Math.abs(delta) < 40) return
      changeSectionByDelta(delta > 0 ? 1 : -1)
    },
    [changeSectionByDelta, isMobile],
  )

  useEffect(() => {
    if (isMobile) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) return
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        changeSectionByDelta(1)
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        changeSectionByDelta(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [changeSectionByDelta, isMobile])

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }

    document.body.style.overflow = ''
    return undefined
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const denominator = Math.max(sections.length - 1, 1)
    const ratio = activeIndex / denominator
    progressMotion.set(ratio)
  }, [activeIndex, isMobile, progressMotion])

  useEffect(() => {
    if (!isMobile) return
    const updateProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const ratio = totalHeight > 0 ? window.scrollY / totalHeight : 0
      progressMotion.set(Math.min(Math.max(ratio, 0), 1))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [isMobile, progressMotion])

  useEffect(() => {
    if (!isMobile) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          const sectionId = visible[0].target.getAttribute('data-section-id') as SectionId | null
          if (!sectionId) return
          const nextIndex = sections.findIndex((section) => section.id === sectionId)
          if (nextIndex !== -1 && nextIndex !== activeIndex) {
            setActiveIndex(nextIndex)
          }
        }
      },
      { threshold: [0.3, 0.5, 0.7] },
    )

    sections.forEach((section) => {
      const element = document.getElementById(`section-${section.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [activeIndex, isMobile])

  const rootClassName = [
    'relative w-full bg-slate-50 text-slate-900',
    isMobile ? 'min-h-screen overflow-x-hidden' : 'h-screen overflow-hidden',
  ].join(' ')

  return (
    <div className={rootClassName}>
      <Navbar
        activeSection={activeSectionId}
        onNavigate={handleNavigate}
        scrolled={activeIndex > 0}
      />

      {isMobile ? (
        <div className="flex flex-col">
          {sections.map((section) => (
            <section
              key={section.id}
              id={`section-${section.id}`}
              data-section-id={section.id}
              className="min-h-screen w-full"
            >
              {renderSection(section.id, handleNavigate)}
            </section>
          ))}
        </div>
      ) : (
        <div
          className="absolute inset-0"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex h-full flex-col"
            animate={controls}
            style={{ height: `${sections.length * 100}vh` }}
          >
            {sections.map((section) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                data-section-id={section.id}
                className="h-screen w-full"
              >
                {renderSection(section.id, handleNavigate)}
              </section>
            ))}
          </motion.div>
        </div>
      )}

      <motion.button
        type="button"
        aria-label="Scroll to top"
        onClick={() => {
          if (isMobile) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            handleNavigate('home')
          }
        }}
        className={[
          'group pointer-events-auto fixed right-4 z-40 flex items-center justify-center rounded-full border border-white/70 bg-white/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl',
          isMobile ? 'bottom-6 size-12 shadow-lg shadow-blue-500/10' : 'bottom-8 size-14 shadow-xl shadow-blue-500/10',
        ].join(' ')}
        style={{ backgroundImage: progressGradient }}
      >
        <div
          className={[
            'flex items-center justify-center rounded-full bg-white/80 text-blue-600 shadow-inner shadow-blue-500/10 transition group-hover:text-blue-700',
            isMobile ? 'size-9' : 'size-10',
          ].join(' ')}
        >
          <ArrowUp className={isMobile ? 'size-4' : 'size-5'} strokeWidth={1.5} />
        </div>
      </motion.button>
    </div>
  )
}

function renderSection(section: SectionId, onNavigate: (section: SectionId) => void) {
  switch (section) {
    case 'home':
      return <HomeSection onNavigate={onNavigate} />
    case 'projects':
      return <ProjectsSection onNavigate={onNavigate} />
    case 'about':
      return <AboutSection />
    case 'academic':
      return <AcademicSection />
    case 'trusted':
      return <TrustedVoicesSection />
    // case 'gallery':
    //   return <GallerySection />
    case 'contact':
      return <ContactSection />
    default:
      return null
  }
}

