export type ProjectCategory = 'Backend' | 'Full Stack' | 'Cloud'

export type Project = {
  name: string
  description: string
  tech: string[]
  category: ProjectCategory
  link?: string
}

export const PROJECT_CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
  'Backend',
  'Full Stack',
  'Cloud',
]

export const projects: Project[] = [
  {
    name: 'Marketplace',
    description:
      'Multi-vendor marketplace platform enabling seamless product discovery, secure payments, and automated vendor onboarding.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS SQS'],
    category: 'Full Stack',
  },
  {
    name: 'ProveIt',
    description:
      'Digital evidence management system with secure file ingestion, validation workflows, and real-time audit trails.',
    tech: ['Spring Boot', 'GraphQL', 'MongoDB', 'Docker'],
    category: 'Backend',
  },
  {
    name: 'Swarnavahini Election 2025',
    description:
      'High-traffic election coverage experience with live results, analytics dashboards, and resilient cloud infrastructure.',
    tech: ['Java', 'Kafka', 'Redis', 'AWS ECS'],
    category: 'Cloud',
  },
  {
    name: 'PetMedi.lk',
    description:
      'Telehealth platform connecting pet owners with vets, featuring appointment scheduling, video consults, and prescriptions.',
    tech: ['Spring Boot', 'React', 'Tailwind', 'AWS Lambda'],
    category: 'Full Stack',
  },
]

