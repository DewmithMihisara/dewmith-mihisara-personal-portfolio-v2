import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react'

export function ContactSection() {
  return (
    <section className="flex h-full flex-col justify-center overflow-y-auto bg-background px-6 pb-8 pt-28 md:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 md:flex-row md:items-stretch">
        <motion.div
          className="card flex flex-1 flex-col justify-between gap-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="eyebrow">Get In Touch</p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Let’s connect
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Whether it’s architecting resilient backend systems, launching full-stack products,
              or scaling cloud services — I’m excited to collaborate on the next challenge.
            </p>
          </div>

          <div className="space-y-1 border-t border-border pt-4">
            <a
              className="flex items-center gap-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href="mailto:mihisaralokuhewage@gmail.com"
            >
              <span className="flex size-9 items-center justify-center rounded-lg border border-border">
                <Mail className="size-4" />
              </span>
              mihisaralokuhewage@gmail.com
            </a>
            <a
              className="flex items-center gap-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href="https://www.linkedin.com/in/dewmith-mihisara/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex size-9 items-center justify-center rounded-lg border border-border">
                <Linkedin className="size-4" />
              </span>
              linkedin.com/in/dewmithmihisara
            </a>
            <a
              className="flex items-center gap-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com/dewmithmihisara"
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex size-9 items-center justify-center rounded-lg border border-border">
                <Github className="size-4" />
              </span>
              github.com/dewmithmihisara
            </a>
            <div className="flex items-center gap-3 py-2 text-sm font-medium text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-lg border border-border">
                <MapPin className="size-4" />
              </span>
              Colombo, Sri Lanka
            </div>
          </div>
        </motion.div>

        <motion.div
          className="card flex flex-1 flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className="space-y-5">
            {[
              { label: 'Name', type: 'text', placeholder: 'Enter your name' },
              { label: 'Email', type: 'email', placeholder: 'name@example.com' },
            ].map((field) => (
              <div key={field.label} className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground transition focus:border-foreground focus:outline-none"
                />
              </div>
            ))}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Message</label>
              <textarea
                placeholder="Tell me about your idea..."
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground transition focus:border-foreground focus:outline-none"
              />
            </div>
            <button type="button" className="btn-solid group gap-2">
              Send message
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </div>
      <footer className="mt-10 border-t border-border">
        <div className="mx-auto w-full max-w-5xl px-0 py-6 text-xs text-muted-foreground sm:text-sm">
          <span>© 2025 Dewmith Mihisara. All rights reserved.</span>
        </div>
      </footer>
    </section>
  )
}
