import { projects } from './projects'
import projectOverrides from './projectOverrides.json'

export const publishedProjects = projects
  .filter((project) => !projectOverrides.deletedIds.includes(String(project.id)) && !projectOverrides.deletedIds.includes(project.id))
  .map((project) => ({ ...project, ...(projectOverrides.overrides[String(project.id)] || {}) }))

export const publishedFeaturedId = projectOverrides.featuredId
