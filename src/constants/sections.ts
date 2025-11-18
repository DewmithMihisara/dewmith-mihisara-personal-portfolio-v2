export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About Me' },
  { id: 'academic', label: 'Academic Journey' },
  { id: 'trusted', label: 'Trusted Voices' },
  // { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

