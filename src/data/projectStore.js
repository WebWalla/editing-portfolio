import { useEffect, useState } from 'react'

const databaseName = 'sk-cuts-portfolio'
const storeName = 'uploaded-projects'
const deletedKey = 'sk-cuts-deleted-projects'
const featuredKey = 'sk-cuts-featured-project'

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(storeName, { keyPath: 'id' })
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function readProjects() {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, 'readonly').objectStore(storeName).getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function writeProject(project) {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, 'readwrite').objectStore(storeName).put(project)
    request.onsuccess = resolve
    request.onerror = () => reject(request.error)
  })
}

async function deleteProject(id) {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, 'readwrite').objectStore(storeName).delete(id)
    request.onsuccess = resolve
    request.onerror = () => reject(request.error)
  })
}

function presentProjects(projects) {
  return projects.map((project) => ({
    ...project,
    video: typeof project.videoBlob === 'string' ? project.videoBlob : URL.createObjectURL(project.videoBlob),
    isUploaded: true,
  }))
}

export function useUploadedProjects() {
  const [projects, setProjects] = useState([])
  const [deletedIds, setDeletedIds] = useState(() => JSON.parse(localStorage.getItem(deletedKey) || '[]'))
  const [featuredId, setFeaturedId] = useState(() => localStorage.getItem(featuredKey))

  const refresh = async () => setProjects(presentProjects(await readProjects()))

  useEffect(() => {
    refresh()
  }, [])

  const saveProject = async (project, videoFile) => {
    await writeProject({ ...project, videoBlob: videoFile || project.videoBlob, updatedAt: Date.now() })
    const nextDeletedIds = deletedIds.filter((id) => id !== project.id)
    localStorage.setItem(deletedKey, JSON.stringify(nextDeletedIds))
    setDeletedIds(nextDeletedIds)
    await refresh()
  }

  const removeProject = async (id) => {
    await deleteProject(id)
    const nextDeletedIds = [...new Set([...deletedIds, id])]
    localStorage.setItem(deletedKey, JSON.stringify(nextDeletedIds))
    setDeletedIds(nextDeletedIds)
    await refresh()
  }

  const setFeaturedProject = (id) => {
    localStorage.setItem(featuredKey, id)
    setFeaturedId(id)
  }

  return { projects, deletedIds, featuredId, saveProject, removeProject, setFeaturedProject }
}