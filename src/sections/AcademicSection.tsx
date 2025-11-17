import { motion } from 'framer-motion'

const education = [
  {
    institution: 'Wrexham University',
    title: 'Bachelor of Science - BS, Computer Software Engineering',
    period: 'Sep 2025 - Sep 2026',
  },
  {
    institution: 'IJSE-Institute of Software Engineering',
    title: 'Higher National Diploma, Computer Software Engineering',
    period: 'Aug 2022 - Apr 2025',
  },
  {
    institution: "St. Aloysius' College",
    title: 'GCE Ordinary Level',
    period: 'Jan 2011 - Jun 2022',
  },
]

export function AcademicSection() {
  const isScrollable = education.length > 3

  const listClasses = [
    'relative space-y-6 border-l border-blue-200/70 pl-6 sm:pl-10',
    isScrollable ? 'max-h-[460px] overflow-y-auto pr-3' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="relative flex h-full flex-col justify-center bg-gradient-to-b from-slate-50 via-white to-blue-50/40 px-6 pb-24 pt-28 md:px-16">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-blue-100/40 to-transparent blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl" />
        <motion.div
          className="absolute bottom-16 right-1/5 h-48 w-48 rounded-full bg-blue-100/40 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
            Academic Journey
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Growth through continuous learning
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            A blend of academic depth and hands-on engineering experiences, shaped by institutions
            that champion innovation and practical excellence.
          </p>
        </motion.div>

        <div className={listClasses}>
          <motion.div
            className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-blue-400 via-blue-300 to-transparent"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          {education.map((entry, index) => (
            <motion.article
              key={entry.institution}
              className="relative rounded-3xl border border-blue-100/70 bg-white/85 p-6 shadow-lg shadow-blue-900/5 backdrop-blur"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="absolute -left-12 top-8 hidden size-8 items-center justify-center rounded-full border border-blue-400 bg-white text-sm font-semibold tracking-wide text-blue-600 shadow-lg shadow-blue-500/20 sm:flex">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-slate-900">{entry.institution}</h3>
              <p className="mt-2 text-sm font-medium text-blue-600">{entry.title}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                {entry.period}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

