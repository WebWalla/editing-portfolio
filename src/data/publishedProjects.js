import { projects } from './projects'
import projectOverrides from './projectOverrides.json'

function projectTimestamp(project) {
  const match = String(project.id).match(/(?:local|upload)-(\d+)/)
  return match ? Number(match[1]) : 0
}

export function sortProjects(projectList) {
  return projectList
    .map((project, index) => ({ project, index }))
    .sort((left, right) => projectTimestamp(right.project) - projectTimestamp(left.project) || left.index - right.index)
    .map(({ project }) => project)
}

export const publishedProjects = sortProjects(projects
  .filter((project) => !projectOverrides.deletedIds.includes(String(project.id)) && !projectOverrides.deletedIds.includes(project.id))
  .map((project) => ({ ...project, ...(projectOverrides.overrides[String(project.id)] || {}) })))

export const publishedFeaturedId = projectOverrides.featuredId
