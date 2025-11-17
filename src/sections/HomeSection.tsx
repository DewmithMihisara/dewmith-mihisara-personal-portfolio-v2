import { motion } from 'framer-motion'
import { ArrowDownRight, Github, Linkedin } from 'lucide-react'
import type { SectionId } from '../constants/sections'

type HomeSectionProps = {
  onNavigate: (section: SectionId) => void
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <section className="relative flex h-full flex-col justify-center overflow-hidden bg-gradient-to-br from-[#F8FBFF] via-[#EFF6FF] to-[#DBEAFE] px-6 pb-20 pt-28 text-slate-900 md:px-16">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/80 via-white/40 to-transparent"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-y-0 right-[-10%] w-2/5 rounded-full bg-gradient-to-l from-[#60A5FA]/25 via-[#2563EB]/10 to-transparent blur-3xl"
          animate={{ x: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-[#2563EB]/15 blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 26, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-12 left-1/4 h-56 w-56 rounded-full bg-[#60A5FA]/20 blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.6, 0.85, 0.6] }}
          transition={{ repeat: Infinity, duration: 24, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 text-center md:flex-row md:items-center md:gap-16 md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="order-2 flex-1 md:order-1"
        >
          <motion.span
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Associate Software Engineer
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-blue-500/80"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
          </motion.span>

          <motion.h1
            className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Dewmith Mihisara
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-base text-slate-600 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            I’m an enthusiastic and detail-oriented software engineer specializing in Java,
            Spring Boot, and scalable cloud solutions. Passionate about crafting clean,
            efficient code and collaborating in agile environments.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => onNavigate('projects')}
              className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              View Projects
              <ArrowDownRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/dewmithmihisara"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-colors duration-300 hover:border-blue-400 hover:bg-white"
              >
                <Linkedin className="size-4 transition-transform group-hover:-translate-y-0.5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/dewmithmihisara"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-slate-400 hover:bg-white"
              >
                <Github className="size-4 transition-transform group-hover:-translate-y-0.5" />
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 flex flex-1 justify-center md:order-2"
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-3xl border border-blue-100/80 bg-white/60 p-1 shadow-2xl shadow-blue-500/20 md:h-80 md:w-80">
            <motion.div
              className="absolute inset-4 rounded-3xl bg-gradient-to-br from-white via-blue-50/60 to-transparent"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-white via-blue-50/60 to-transparent"
              animate={{ y: [0, -16, 0] }}
              transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-tr from-[#2563EB]/30 to-[#60A5FA]/20">
                <span className="text-xl font-semibold text-blue-700">
                  Dewmith Mihisara
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

