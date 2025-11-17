import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react'

export function ContactSection() {
  return (
    <section className="relative flex h-full flex-col justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50/50 px-6 pb-16 pt-28 md:px-16">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-blue-200/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 md:flex-row md:items-stretch">
        <motion.div
          className="flex flex-1 flex-col justify-between gap-10 rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-xl shadow-blue-500/10 backdrop-blur"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Let’s connect</h2>
            <p className="mt-3 text-base text-slate-600">
              Whether it’s architecting resilient backend systems, launching full-stack products,
              or scaling cloud services — I’m excited to collaborate on the next challenge.
            </p>
          </div>

          <div className="space-y-4">
            <a
              className="group flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
              href="mailto:dewmithmihisara@gmail.com"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Mail className="size-4" />
              </span>
              dewmithmihisara@gmail.com
            </a>
            <a
              className="group flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
              href="https://www.linkedin.com/in/dewmithmihisara"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Linkedin className="size-4" />
              </span>
              linkedin.com/in/dewmithmihisara
            </a>
            <a
              className="group flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
              href="https://github.com/dewmithmihisara"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Github className="size-4" />
              </span>
              github.com/dewmithmihisara
            </a>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <MapPin className="size-4" />
              </span>
              Colombo, Sri Lanka
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col justify-center rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className="space-y-6">
            {[
              { label: 'Name', type: 'text', placeholder: 'Enter your name' },
              { label: 'Email', type: 'email', placeholder: 'name@example.com' },
            ].map((field) => (
              <div key={field.label} className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            ))}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Message</label>
              <textarea
                placeholder="Tell me about your idea..."
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500"
            >
              Send message
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </div>
      <footer className="mt-10 flex items-center justify-center">
        <div className="flex w-full max-w-6xl flex-col items-center justify-between gap-3 rounded-3xl border border-blue-100/60 bg-white/70 px-6 py-4 text-xs font-medium uppercase tracking-[0.3em] text-slate-500 shadow-inner shadow-blue-500/5 backdrop-blur md:flex-row md:text-sm md:tracking-[0.2em]">
          <span>© {new Date().getFullYear()} Dewmith Mihisara. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Designed & developed with
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75" />
              <span className="absolute inset-0 animate-ping rounded-full bg-blue-400" />
            </span>
            care.
          </span>
        </div>
      </footer>
    </section>
  )
}

