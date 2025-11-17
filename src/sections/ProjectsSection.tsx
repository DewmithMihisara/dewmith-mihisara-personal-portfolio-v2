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
     <section className="relative flex h-full flex-col justify-center bg-gradient-to-b from-white to-slate-50 px-6 pb-24 pt-28 md:px-16">
       <div className="absolute inset-0">
         <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-blue-100/40 to-transparent blur-3xl" />
         <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50 to-transparent blur-3xl" />
       </div>
 
       <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
         <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
           <div>
             <motion.h2
               className="text-3xl font-semibold text-slate-900 md:text-4xl"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
               Featured Work
             </motion.h2>
             <motion.p
               className="mt-2 max-w-xl text-base text-slate-600"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1, duration: 0.6 }}
             >
               A curated selection of projects that highlight experience across backend systems,
               end-to-end product development, and scalable cloud architectures.
             </motion.p>
           </div>
 
           <motion.div
             className="flex items-center justify-between gap-4 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur"
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.5 }}
           >
             <span className="font-medium text-blue-900">Highlighted Projects</span>
             <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
               {total} total
             </span>
           </motion.div>
         </div>
 
         <div className="relative mx-auto w-full max-w-6xl">
           {showNavigation && (
             <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-2 md:px-4">
               <div className="flex items-center justify-between">
                 <button
                   type="button"
                   onClick={handlePrev}
                   className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-blue-200/70 bg-white/85 text-blue-600 shadow-md shadow-blue-900/10 backdrop-blur transition hover:-translate-x-1 hover:border-blue-400 hover:bg-white md:size-12"
                   aria-label="Previous project"
                 >
                   <ArrowLeft className="size-4" />
                 </button>
 
                 <button
                   type="button"
                   onClick={handleNext}
                   className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-blue-200/70 bg-white/85 text-blue-600 shadow-md shadow-blue-900/10 backdrop-blur transition hover:translate-x-1 hover:border-blue-400 hover:bg-white md:size-12"
                   aria-label="Next project"
                 >
                   <ArrowRight className="size-4" />
                 </button>
               </div>
             </div>
           )}
 
           <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-3 sm:px-8 md:px-12">
             {visibleProjects.map((project) => (
               <ProjectCard key={`${project.name}-${project.category}`} project={project} />
             ))}
           </div>
 
           {showNavigation && (
             <div className="mt-6 flex items-center justify-center gap-2">
               {projects.map((project, index) => {
                 const isActive = index === startIndex
                 return (
                   <button
                     key={project.name}
                     type="button"
                     onClick={() => setStartIndex(index)}
                     className={[
                       'size-2 rounded-full transition-all duration-200',
                       isActive ? 'scale-125 bg-blue-600' : 'bg-slate-300',
                     ].join(' ')}
                     aria-label={`Show project ${project.name}`}
                   />
                 )
               })}
             </div>
           )}
         </div>
 
         <motion.div
           className="mt-2 flex justify-center"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3, duration: 0.6 }}
         >
           <button
             onClick={() => onNavigate('contact')}
             className="group inline-flex items-center gap-2 rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-600 shadow-[0_20px_50px_-25px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-50"
           >
             Start a project together
             <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
           </button>
         </motion.div>
       </div>
     </section>
   )
 }
 
 function ProjectCard({ project }: { project: Project }) {
   return (
     <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
       <div>
         <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
           {project.category}
         </span>
       </div>
       <h3 className="mt-4 text-lg font-semibold text-slate-900">{project.name}</h3>
       <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>
       <div className="mt-3 flex flex-wrap gap-2">
         {project.tech.map((tech) => (
           <span
             key={tech}
             className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
           >
             {tech}
           </span>
         ))}
       </div>
       <div className="mt-auto pt-4">
         <button className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700">
           View More
           <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
         </button>
       </div>
     </div>
   )
 }
