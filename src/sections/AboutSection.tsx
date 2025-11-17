import { motion } from 'framer-motion'
import { Code2, Cpu, Layers, Rocket } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Backend Engineering',
    description:
      'Designing resilient services with Java, Spring Boot, and event-driven patterns that scale gracefully.',
  },
  {
    icon: Layers,
    title: 'Solution Architecture',
    description:
      'Translating complex domain logic into modular, cloud-ready architectures that remain easy to evolve.',
  },
  {
    icon: Cpu,
    title: 'Cloud & Automation',
    description:
      'Automating CI/CD workflows and infrastructure to deliver features faster without sacrificing reliability.',
  },
  {
    icon: Rocket,
    title: 'Team Collaboration',
    description:
      'Mentoring teams, facilitating agile rituals, and aligning technical delivery with business outcomes.',
  },
]

const stats = [
  { label: 'Years coding', value: '5+' },
  { label: 'Production projects', value: '12' },
  { label: 'Cloud platforms', value: 'AWS, GCP' },
  { label: 'Favorite stack', value: 'Java · Spring Boot · React' },
]

export function AboutSection() {
  return (
    <section className="relative flex h-full flex-col justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50/40 px-6 pb-24 pt-28 md:px-16">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-blue-100/40 to-transparent blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-16 left-1/5 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row">
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
              About Me
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Building reliable experiences, one sprint at a time
            </h2>
            <p className="max-w-xl text-base text-slate-600">
              I’m Dewmith Mihisara, a software engineer who bridges robust backend engineering with
              collaborative product delivery. My focus lies in crafting performant APIs, optimizing
              service reliability, and deploying solutions that scale confidently in the cloud.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="flex flex-col rounded-2xl border border-blue-100/70 bg-white/80 px-4 py-5 shadow-lg shadow-blue-900/5 backdrop-blur"
                whileHover={{ y: -6, boxShadow: '0px 30px 60px -40px rgba(37,99,235,0.4)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <span className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500">
                  {stat.label}
                </span>
                <span className="mt-2 text-2xl font-semibold text-blue-600">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex-1 rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-lg shadow-slate-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative space-y-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

