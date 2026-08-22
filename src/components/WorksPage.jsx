import { ArrowLeft, Play, X } from 'lucide-react'
import { useState } from 'react'
import { publishedProjects, sortProjects } from '../data/publishedProjects'
import { useUploadedProjects } from '../data/projectStore'
import { VideoPreview } from './Portfolio'

const filters = ['All', 'Esports', 'Montages', 'Reels', 'Shorts', 'Gaming']

export default function WorksPage() {
  const { projects: uploadedProjects, deletedIds } = useUploadedProjects()
  const managedIds = new Set(uploadedProjects.map((project) => project.id))
  const allProjects = sortProjects([...uploadedProjects, ...publishedProjects.filter((project) => !managedIds.has(project.id) && !deletedIds.includes(project.id))])
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleProjects.map((project) => <article key={project.id} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b0b]"><button type="button" onClick={() => setSelectedProject(project)} className="relative block aspect-video w-full bg-black text-left"><VideoPreview project={project} /><span className="absolute left-4 top-4 rounded-full bg-[#050505]/75 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#FFB000]">{project.category}</span><span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/25"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFB000] text-[#050505] shadow-[0_0_30px_rgba(255,176,0,0.4)]"><Play size={20} fill="currentColor" /></span></span></button><button type="button" onClick={() => setSelectedProject(project)} className="flex w-full items-center justify-between gap-3 p-5 text-left"><h2 className="text-xl font-black uppercase tracking-[-0.05em] text-white">{project.title}</h2><Play size={16} className="flex-none text-[#FFB000]" fill="currentColor" /></button></article>)}</div>
      </main>

      {selectedProject && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/85 p-4 backdrop-blur-md"><div className="relative max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] shadow-[0_40px_90px_rgba(0,0,0,0.8)]"><button type="button" onClick={() => setSelectedProject(null)} aria-label="Close project" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#050505]/80 text-white"><X size={18} /></button><div className="flex max-h-[65vh] justify-center overflow-hidden bg-black"><video src={selectedProject.video} controls autoPlay playsInline className="block max-h-[65vh] max-w-full object-contain" /></div><div className="space-y-5 p-6 sm:p-8"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] uppercase tracking-[0.32em] text-[#FFB000]">{selectedProject.category}</p><h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.06em] text-white">{selectedProject.title}</h2></div><div className="text-sm text-white/60">Client: {selectedProject.client}</div></div><div className="grid gap-4 sm:grid-cols-2"><div><p className="text-xs uppercase tracking-[0.25em] text-white/45">Editing style</p><p className="mt-2 text-base text-white/80">{selectedProject.style}</p></div><div><p className="text-xs uppercase tracking-[0.25em] text-white/45">Tools used</p><p className="mt-2 text-base text-white/80">{selectedProject.tools.join(', ')}</p></div></div><p className="text-base leading-7 text-white/70">{selectedProject.description}</p></div></div></div>}
    </div>
  )
}