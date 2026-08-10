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
    // { key: 'gallery', label: 'Gallery', section: 'gallery' as SectionId },
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
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-border bg-background/95 backdrop-blur' : 'border-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-6">
        <button
          className="font-mono text-base font-semibold tracking-tight text-foreground"
          onClick={() => handleNavigate('home')}
        >
          Dewmith<span className="text-muted-foreground">.dev</span>
        </button>

        <div className="ml-auto hidden items-center gap-6 text-sm md:flex">
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
                      'flex items-center gap-1 border-b border-transparent pb-0.5 transition-colors duration-200',
                      isProfileActive ? 'border-foreground text-foreground' : 'text-muted-foreground hover:text-foreground',
                    ].join(' ')}
                  >
                    {item.label}
                    <ChevronDown
                      className={[
                        'size-3.5 transition-transform duration-200',
                        profileOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="card absolute left-0 top-9 min-w-[200px] !p-1.5"
                      >
                        {item.children.map((child: SectionId) => {
                          const isActiveChild = activeSection === child
                          return (
                            <button
                              key={child}
                              onClick={() => handleNavigate(child)}
                              className={[
                                'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors duration-150',
                                isActiveChild
                                  ? 'bg-accent text-accent-foreground'
                                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
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
                  'border-b border-transparent pb-0.5 transition-colors duration-200',
                  isActive ? 'border-foreground text-foreground' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => handleNavigate('contact')}
          className="ml-auto hidden rounded-lg border border-foreground bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-85 md:inline-flex md:ml-0"
        >
          Contact
        </button>

        <button
          className="ml-auto flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-foreground/40 hover:text-foreground md:hidden"
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
            <X className="size-4" strokeWidth={1.5} />
          ) : (
            <Menu className="size-4" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="mx-auto flex w-full max-w-5xl flex-col divide-y divide-border px-6">
              {navItems.map((item) => {
                if ('children' in item) {
                  return (
                    <div key={item.key} className="py-1">
                      <button
                        onClick={() => setMobileProfileOpen((prev) => !prev)}
                        className={[
                          'flex w-full items-center justify-between py-3 text-left text-sm font-medium transition-colors duration-150',
                          isProfileActive ? 'text-foreground' : 'text-muted-foreground',
                        ].join(' ')}
                      >
                        {item.label}
                        <ChevronDown
                          className={[
                            'size-4 transition-transform duration-200',
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
                            transition={{ duration: 0.2 }}
                            className="space-y-1 overflow-hidden pb-3 pl-3"
                          >
                            {item.children.map((child: SectionId) => (
                              <button
                                key={child}
                                onClick={() => handleNavigate(child)}
                                className={[
                                  'block w-full rounded-md px-2 py-2 text-left text-sm transition-colors duration-150',
                                  activeSection === child
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-muted-foreground hover:bg-secondary',
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
                      'py-3 text-left text-sm font-medium transition-colors duration-150',
                      activeSection === item.section ? 'text-foreground' : 'text-muted-foreground',
                    ].join(' ')}
                  >
                    {item.label}
                  </button>
                )
              })}
              <button
                onClick={() => handleNavigate('contact')}
                className="my-3 rounded-lg border border-foreground bg-foreground px-3 py-2 text-center text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
