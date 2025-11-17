import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'

const recommendations = [
  {
    author: 'Siduja Perera',
    role: 'Project Manager at HCode Solutions',
    date: 'December 30, 2024',
    relation: 'Managed Dewmith directly',
    quote:
      'As a project manager, I have had the opportunity to evaluate Dewmith’s performance, and he always stands out as a hardworking and dedicated developer. His focus on delivering tasks on time and with precision is worthy of note. Dewmith has also been an excellent mentor to our interns, guiding them effectively in their projects and tasks, which has significantly enhanced their learning experience. His experience as a backend developer, paired with his enthusiasm for coding, sets him for a successful career in the technology business. Dewmith\'s dedication to quality and teamwork make him a valuable addition to our projects.',
  },
  {
    author: 'Kasun Vithanage',
    role: 'Founder of Akrivo Ltd · Software Engineer',
    date: 'October 15, 2024',
    relation: '',
    quote:
      'I had the pleasure of training Dewmith Mihisara in Software Engineering and was consistently impressed by his dedication, quick learning, and strong technical skills. He quickly grasps new concepts and applies them effectively in real-world projects. Dewmith writes clean, efficient code and approaches problems with a thoughtful, analytical mindset. He’s also a great team player who actively collaborates and contributes to discussions. I’m confident in Dewmith’s potential as a software engineer and highly recommend him as a talented, hardworking, and proactive professional.',
  },
  {
    author: 'Punsara Prathibha',
    role: 'Software Engineer at Wiley',
    date: 'December 6, 2023',
    relation: 'Former lecturer at IJSE',
    quote:
      "As a Lecturer I'm pleased to recommend Dewmith without any hesitation when he study at IJSE. Throughout his academic journey, he consistently demonstrated a strong work ethic, keen intellectual curiosity, and a passion for learning. He is a dedicated and responsible individual who consistently goes above and beyond expectations. I am confident that Dewmith will continue to thrive in any academic or professional pursuit he chooses to undertake in future.",
  },
]

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    scale: 0.92,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -140 : 140,
    opacity: 0,
    scale: 0.92,
    filter: 'blur(6px)',
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
}

export function TrustedVoicesSection() {
  const total = recommendations.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const activeRecommendation = useMemo(() => recommendations[activeIndex], [activeIndex])

  const cycleTo = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1)
    const safeIndex = (nextIndex + total) % total
    setActiveIndex(safeIndex)
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      cycleTo(activeIndex + 1)
    }, 9000)
    return () => window.clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, total])

  const handleDotNavigate = (index: number) => {
    if (index === activeIndex) return
    cycleTo(index)
  }

  return (
    <section className="relative flex h-full flex-col justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50/40 px-6 pb-24 pt-28 md:px-16">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-blue-100/30 to-transparent blur-3xl"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/5 top-1/4 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, -12, 0], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-12 right-1/4 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
            Trusted Voices
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Testimonials that fuel my craft
          </h2>
          <p className="max-w-3xl text-base text-slate-600">
            Mentors, leaders, and collaborators who have experienced my commitment to quality
            engineering, dependable delivery, and collaborative problem solving.
          </p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[min(100%,24rem)] sm:max-w-3xl md:max-w-5xl">
          <div className="absolute -inset-6 sm:-inset-10 md:-inset-12 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/85 p-2 shadow-2xl shadow-blue-900/20 backdrop-blur-xl md:rounded-[2.25rem]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

            <div className="flex items-center justify-between gap-3 px-4 pt-5 md:gap-4 md:px-6 md:pt-6">
              <motion.button
                type="button"
                onClick={() => cycleTo(activeIndex - 1)}
                className="group flex size-10 items-center justify-center rounded-full border border-blue-200/70 bg-white/80 text-blue-600 shadow-md shadow-blue-500/20 transition hover:-translate-x-1 hover:border-blue-400 hover:bg-white md:size-11"
                whileTap={{ scale: 0.92 }}
                aria-label="Previous recommendation"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              </motion.button>
              <motion.div
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-400 sm:text-xs"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </motion.div>
              <motion.button
                type="button"
                onClick={() => cycleTo(activeIndex + 1)}
                className="group flex size-10 items-center justify-center rounded-full border border-blue-200/70 bg-white/80 text-blue-600 shadow-md shadow-blue-500/20 transition hover:translate-x-1 hover:border-blue-400 hover:bg-white md:size-11"
                whileTap={{ scale: 0.92 }}
                aria-label="Next recommendation"
              >
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>

            <div className="relative px-4 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-6 md:px-10 md:pb-12">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.article
                  key={activeRecommendation.author}
                  className="flex flex-1 flex-col gap-6"
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-blue-200/80 bg-gradient-to-br from-blue-100 via-white to-white text-blue-600 shadow-inner shadow-blue-500/20 md:size-12">
                      <Quote className="size-5" />
                    </span>
                    <motion.div
                      className="h-px flex-1 bg-gradient-to-r from-blue-500/40 via-blue-300/30 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-blue-500/80 sm:text-xs">
                      Testimonial
                    </span>
                  </div>

                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
                    {activeRecommendation.quote}
                  </p>

                  <div className="space-y-1 rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-inner shadow-blue-500/10">
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                      {activeRecommendation.author}
                    </h3>
                    <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-blue-600 sm:text-xs">
                      {[activeRecommendation.role, activeRecommendation.date, activeRecommendation.relation]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-2 pb-5">
              {recommendations.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <motion.button
                    key={item.author}
                    type="button"
                    onClick={() => handleDotNavigate(index)}
                    className="relative flex h-3.5 w-3.5 items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Show testimonial ${index + 1}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-blue-200/40 blur-[2px]" />
                    <span
                      className={[
                        'relative block size-2 rounded-full transition-all duration-300',
                        isActive ? 'bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.7)] scale-125' : 'bg-slate-300',
                      ].join(' ')}
                    />
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

