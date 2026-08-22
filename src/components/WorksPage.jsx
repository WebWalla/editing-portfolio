import { ArrowLeft, Play } from 'lucide-react'
import { useState } from 'react'
import { projects } from '../data/projects'
import { useUploadedProjects } from '../data/projectStore'
import { VideoPreview } from './Portfolio'

const filters = ['All', 'Esports', 'Montages', 'Reels', 'Shorts', 'Gaming']

export default function WorksPage() {
  const { projects: uploadedProjects, deletedIds } = useUploadedProjects()
  const managedIds = new Set(uploadedProjects.map((project) => project.id))
  const allProjects = [...uploadedProjects, ...projects.filter((project) => !managedIds.has(project.id) && !deletedIds.includes(project.id))]
  const [activeFilter, setActiveFilter] = useState('All')
  const visibleProjects = activeFilter === 'All' ? allProjects : allProjects.filter((project) => (project.categories || [project.category]).includes(activeFilter))

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8 text-[var(--text)] sm:px-6 lg:px-10">
      <header className="mx-auto max-w-7xl border-b border-white/10 pb-8">
        <a href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-[#FFB000]"><ArrowLeft size={15} /> Back to home</a>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">SK_CUTS8 / Portfolio</p>
        <h1 className="mt-4 text-5xl font-black uppercase tracking-[-0.07em] text-white sm:text-7xl">All works</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">A complete collection of gaming, esports, montage, and social edits.</p>
      </header>
      <main className="mx-auto max-w-7xl py-8">
        <div className="mb-8 flex flex-wrap gap-2">{filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${activeFilter === filter ? 'border-[#FFB000] bg-[#FFB000] text-[#050505]' : 'border-white/10 bg-white/5 text-white/65'}`}>{filter}</button>)}</div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleProjects.map((project) => <article key={project.id} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b0b]"><div className="relative aspect-video bg-black"><VideoPreview project={project} controls /><span className="absolute left-4 top-4 rounded-full bg-[#050505]/75 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#FFB000]">{project.category}</span></div><div className="flex items-center justify-between gap-3 p-5"><h2 className="text-xl font-black uppercase tracking-[-0.05em] text-white">{project.title}</h2><Play size={16} className="flex-none text-[#FFB000]" fill="currentColor" /></div></article>)}</div>
      </main>
    </div>
  )
}