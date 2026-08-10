import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import type { SectionId } from '../constants/sections'

type ProjectsSectionProps = {
  onNavigate: (section: SectionId) => void
}

export function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const [startIndex, setStartIndex] = useState(0)
  const total = projects.length
  const showNavigation = total > 3

  const visibleProjects =
    total <= 3
      ? projects
      : [0, 1, 2].map((offset) => projects[(startIndex + offset) % total])

  const handlePrev = () => {
    if (!showNavigation) return
    setStartIndex((prev) => (prev - 1 + total) % total)
  }

  const handleNext = () => {
    if (!showNavigation) return
    setStartIndex((prev) => (prev + 1) % total)
  }

  return (
    <section className="flex h-full flex-col justify-center overflow-y-auto bg-background px-6 pb-24 pt-28 md:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">Featured Work</p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              A curated selection of projects.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Experience across backend systems, end-to-end product development, and scalable
              cloud architectures.
            </p>
          </motion.div>

          <motion.p
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {String(total).padStart(2, '0')} total
          </motion.p>
        </div>

        <div className="relative">
          {showNavigation && (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 px-2 md:block md:px-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="pointer-events-auto flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition hover:border-foreground/40"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="pointer-events-auto flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition hover:border-foreground/40"
                  aria-label="Next project"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-3 sm:px-8 md:px-12">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={`${project.name}-${project.category}`}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </div>

          {showNavigation && (
            <div className="mt-6 hidden items-center justify-center gap-2 md:flex">
              {projects.map((project, index) => {
                const isActive = index === startIndex
                return (
                  <button
                    key={project.name}
                    type="button"
                    onClick={() => setStartIndex(index)}
                    className={[
                      'size-2 rounded-full transition-all duration-200',
                      isActive ? 'scale-125 bg-foreground' : 'bg-border',
                    ].join(' ')}
                    aria-label={`Show project ${project.name}`}
                  />
                )
              })}
            </div>
          )}
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <button onClick={() => onNavigate('contact')} className="btn-outline group gap-2">
            Start a project together
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="card flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="tag">{String(index + 1).padStart(2, '0')}</span>
        <span className="eyebrow">{project.category}</span>
      </div>
      <h3 className="mt-4 font-display text-lg leading-tight text-foreground">{project.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  )
}
