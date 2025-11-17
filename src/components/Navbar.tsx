import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { sections, type SectionId } from '../constants/sections'

type NavbarProps = {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
  scrolled: boolean
}

export function Navbar({ activeSection, onNavigate, scrolled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)

  const variant = useMemo(
    () =>
      scrolled
        ? 'scrolled'
        : 'top',
    [scrolled],
  )

  const sectionLabelMap = useMemo(
    () => Object.fromEntries(sections.map((section) => [section.id, section.label])) as Record<
      SectionId,
      string
    >,
    [],
  )

  const profileSections: SectionId[] = ['about', 'academic', 'trusted']

  type NavItem =
    | { key: string; label: string; section: SectionId }
    | { key: string; label: string; children: SectionId[] }

  const navItems: NavItem[] = [
    { key: 'home', label: 'Home', section: 'home' as SectionId },
    { key: 'projects', label: 'Projects', section: 'projects' as SectionId },
    { key: 'profile', label: 'Profile', children: profileSections },
    { key: 'gallery', label: 'Gallery', section: 'gallery' as SectionId },
    { key: 'contact', label: 'Contact', section: 'contact' as SectionId },
  ] as const

  const isProfileActive = profileSections.includes(activeSection)

  useEffect(() => {
    setProfileOpen(false)
    setMobileProfileOpen(false)
  }, [activeSection])

  const handleNavigate = (section: SectionId) => {
    onNavigate(section)
    setIsOpen(false)
    setMobileProfileOpen(false)
    setProfileOpen(false)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
      <motion.nav
        className="pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-6 py-3 shadow-lg shadow-slate-900/5"
        variants={navbarVariants}
        animate={variant}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <button
          className="text-lg font-semibold tracking-tight text-slate-900"
          onClick={() => handleNavigate('home')}
        >
          Dewmith Mihisara
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            if ('children' in item) {
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className={[
                      'relative flex items-center gap-1 text-sm font-medium transition-colors duration-300',
                      isProfileActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500',
                    ].join(' ')}
                  >
                    {item.label}
                    <ChevronDown
                      className={[
                        'size-4 transition-transform duration-300',
                        profileOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                    {isProfileActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-blue-600"
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-10 min-w-[220px] rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur"
                      >
                        {item.children.map((child: SectionId) => {
                          const isActiveChild = activeSection === child
                          return (
                            <button
                              key={child}
                              onClick={() => handleNavigate(child)}
                              className={[
                                'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200',
                                isActiveChild
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'text-slate-600 hover:bg-slate-100',
                              ].join(' ')}
                            >
                              {sectionLabelMap[child]}
                            </button>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            const isActive = activeSection === item.section
            return (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.section)}
                className={[
                  'relative text-sm font-medium transition-colors duration-300',
                  isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500',
                ].join(' ')}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-blue-600"
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 text-slate-600 transition hover:border-blue-200 hover:text-blue-600 md:hidden"
          onClick={() =>
            setIsOpen((prev) => {
              const next = !prev
              if (!next) {
                setMobileProfileOpen(false)
              }
              return next
            })
          }
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <X className="size-5" strokeWidth={1.5} />
          ) : (
            <Menu className="size-5" strokeWidth={1.5} />
          )}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-3 rounded-3xl border border-white/70 bg-white/95 px-6 pb-6 pt-2 shadow-xl shadow-blue-500/10 backdrop-blur md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                if ('children' in item) {
                  return (
                    <div key={item.key} className="rounded-2xl border border-slate-200/70 p-2">
                      <button
                        onClick={() => setMobileProfileOpen((prev) => !prev)}
                        className={[
                          'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors duration-200',
                          isProfileActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700',
                        ].join(' ')}
                      >
                        {item.label}
                        <ChevronDown
                          className={[
                            'size-4 transition-transform duration-300',
                            mobileProfileOpen ? 'rotate-180' : '',
                          ].join(' ')}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileProfileOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 space-y-1 pl-3"
                          >
                            {item.children.map((child: SectionId) => (
                              <button
                                key={child}
                                onClick={() => handleNavigate(child)}
                                className={[
                                  'block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200',
                                  activeSection === child
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-slate-600 hover:bg-slate-100',
                                ].join(' ')}
                              >
                                {sectionLabelMap[child]}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavigate(item.section)}
                    className={[
                      'rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200',
                      activeSection === item.section
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-100',
                    ].join(' ')}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const navbarVariants = {
  top: {
    background:
      'linear-gradient(120deg, rgba(255,255,255,0.92) 10%, rgba(240,247,255,0.82) 45%, rgba(189,215,255,0.78) 100%)',
    borderColor: 'rgba(232,240,255,0.8)',
    boxShadow: '0px 22px 45px -30px rgba(37,99,235,0.45)',
  },
  scrolled: {
    background:
      'linear-gradient(120deg, rgba(255,255,255,0.95) 10%, rgba(248,250,255,0.92) 100%)',
    borderColor: 'rgba(226,232,240,0.8)',
    boxShadow: '0px 20px 35px -28px rgba(15,23,42,0.35)',
  },
} as const

