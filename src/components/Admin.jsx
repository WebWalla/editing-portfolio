import { Edit3, ExternalLink, Film, Plus, Save, Trash2, Upload, X } from 'lucide-react'
import { useState } from 'react'
import { publishedProjects as websiteProjects } from '../data/publishedProjects'
import projectOverrides from '../data/projectOverrides.json'
import { useUploadedProjects } from '../data/projectStore'

const categories = ['Esports', 'Montages', 'Reels', 'Shorts', 'Gaming']
const emptyForm = { title: '', description: '', client: '', style: '', tools: '', categories: [], videoFile: null }

export default function Admin() {
  const { projects, deletedIds, featuredId, saveProject, removeProject, setFeaturedProject } = useUploadedProjects()
  const effectiveFeaturedId = projectOverrides.featuredId || featuredId
  const managedIds = new Set(projects.map((project) => project.id))
  const currentProjects = websiteProjects.filter((project) => !managedIds.has(project.id) && !deletedIds.includes(project.id))
  const allProjects = [...projects, ...currentProjects]
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [makeLatest, setMakeLatest] = useState(false)
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const toggleCategory = (category) => setForm((current) => ({ ...current, categories: current.categories.includes(category) ? current.categories.filter((item) => item !== category) : [...current.categories, category] }))

  const editProject = (project) => {
    setEditingId(project.id)
    setForm({ title: project.title, description: project.description, client: project.client, style: project.style, tools: project.tools.join(', '), categories: project.categories || [project.category], videoFile: null, videoBlob: project.videoBlob || project.video })
    setMakeLatest(effectiveFeaturedId === String(project.id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.categories.length || (!form.videoFile && !editingId)) return

    if (import.meta.env.DEV && form.videoFile && !editingId) {
      const formData = new FormData()
      formData.append('video', form.videoFile)
      formData.append('title', form.title.trim())
      formData.append('categories', JSON.stringify(form.categories))
      formData.append('description', form.description.trim())
      formData.append('client', form.client.trim())
      formData.append('style', form.style.trim())
      formData.append('tools', form.tools)
      formData.append('featured', String(makeLatest))
      const response = await fetch('/api/local-projects', { method: 'POST', body: formData })
      if (!response.ok) {
        setMessage('Could not save the video to the project folder.')
        return
      }
      setMessage('Saved to public/videos and projects.js. Refreshing...')
      window.setTimeout(() => window.location.reload(), 500)
      return
    }

    if (import.meta.env.DEV) {
      const response = await fetch('/api/local-project-actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', project: { id: editingId, title: form.title.trim(), category: form.categories[0], categories: form.categories, description: form.description.trim() || 'Uploaded portfolio edit.', client: form.client.trim() || 'SK_CUTS8', style: form.style.trim() || 'Gaming video edit', tools: form.tools.split(',').map((tool) => tool.trim()).filter(Boolean), video: form.videoBlob } }) })
      if (!response.ok) { setMessage('Could not save project changes.'); return }
      await fetch('/api/local-project-actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'feature', id: editingId, featured: makeLatest }) })
      setMessage('Saved to projects.json. Refreshing...')
      window.setTimeout(() => window.location.reload(), 500)
      return
    }

    const projectId = editingId || `upload-${Date.now()}`
    await saveProject({ id: projectId, title: form.title.trim(), category: form.categories[0], categories: form.categories, description: form.description.trim() || 'Uploaded portfolio edit.', client: form.client.trim() || 'SK_CUTS8', style: form.style.trim() || 'Gaming video edit', tools: form.tools.split(',').map((tool) => tool.trim()).filter(Boolean), videoBlob: form.videoBlob }, form.videoFile)
    if (makeLatest) setFeaturedProject(String(projectId))
    setForm(emptyForm)
    setEditingId(null)
    setMessage('Video saved to your portfolio.')
  }

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this video from the portfolio?')) return
    if (import.meta.env.DEV) {
      await removeProject(id)
      const project = allProjects.find((item) => String(item.id) === String(id))
      await fetch('/api/local-project-actions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', id, project: { video: project?.video } }) })
      setMessage('Deleted from projects.json. Refreshing...')
      window.setTimeout(() => window.location.reload(), 500)
      return
    }
    await removeProject(id)
    setMessage('Video deleted.')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8 text-[var(--text)] sm:px-6 lg:px-10">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div><p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">SK_CUTS8 / Admin</p><h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.06em] text-white">Manage videos</h1></div>
        <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 hover:border-[#FFB000] hover:text-white"><ExternalLink size={15} /> Website</a>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <form onSubmit={submit} className="rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] p-6 sm:p-8">
          <div className="mb-7 flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.3em] text-[#FFB000]">{editingId ? 'Edit entry' : 'New entry'}</p><h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em] text-white">{editingId ? 'Update video' : 'Upload a video'}</h2></div>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} aria-label="Cancel editing" className="text-white/50 hover:text-white"><X size={20} /></button>}</div>
          <label className="mb-5 block cursor-pointer rounded-2xl border border-dashed border-[#FFB000]/45 bg-[#FFB000]/5 p-6 text-center hover:bg-[#FFB000]/10"><Upload className="mx-auto mb-3 text-[#FFB000]" size={24} /><span className="block text-sm font-semibold text-white">{form.videoFile ? form.videoFile.name : editingId ? 'Choose a replacement video' : 'Choose video file'}</span><span className="mt-1 block text-xs text-white/45">MP4, WebM or MOV</span><input type="file" accept="video/*" className="sr-only" onChange={(event) => updateField('videoFile', event.target.files[0])} /></label>
          <div className="space-y-4"><input required value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="Video title" className="admin-input" /><textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Description" rows="3" className="admin-input resize-none" /><div className="grid gap-4 sm:grid-cols-2"><input value={form.client} onChange={(event) => updateField('client', event.target.value)} placeholder="Client" className="admin-input" /><input value={form.style} onChange={(event) => updateField('style', event.target.value)} placeholder="Editing style" className="admin-input" /></div><input value={form.tools} onChange={(event) => updateField('tools', event.target.value)} placeholder="Tools, separated by commas" className="admin-input" /></div>
          <fieldset className="mt-6"><legend className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/55">Categories</legend><div className="flex flex-wrap gap-2">{categories.map((category) => <button key={category} type="button" onClick={() => toggleCategory(category)} className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.12em] ${form.categories.includes(category) ? 'border-[#FFB000] bg-[#FFB000] text-[#050505]' : 'border-white/10 bg-white/5 text-white/65'}`}>{category}</button>)}</div></fieldset>
          <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-white/70"><input type="checkbox" checked={makeLatest} onChange={(event) => setMakeLatest(event.target.checked)} className="h-4 w-4 accent-[#FFB000]" /> Set as latest edit on homepage</label>
          <button type="submit" disabled={!form.categories.length || (!form.videoFile && !editingId)} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFB000] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#050505] disabled:cursor-not-allowed disabled:opacity-35">{editingId ? <Save size={17} /> : <Plus size={17} />} {editingId ? 'Save changes' : 'Publish video'}</button>{message && <p className="mt-4 text-center text-sm text-[#FFB000]">{message}</p>}
        </form>

        <section>
          <div className="mb-5 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[0.3em] text-[#FFB000]">Library</p><h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.05em] text-white">Your videos</h2></div><span className="text-sm text-white/45">{allProjects.length} {allProjects.length === 1 ? 'video' : 'videos'}</span></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => <article key={project.id} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b0b0b]"><video src={project.video} controls preload="metadata" className="aspect-video w-full bg-black object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#FFB000]">{(project.categories || [project.category]).join(' / ')}</p><h3 className="mt-2 text-xl font-black uppercase tracking-[-0.05em] text-white">{project.title}</h3>{effectiveFeaturedId === String(project.id) && <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#FFB000]">Homepage latest edit</p>}</div><div className="flex gap-1"><button type="button" onClick={() => editProject(project)} aria-label={`Edit ${project.title}`} className="p-2 text-white/55 hover:text-[#FFB000]"><Edit3 size={16} /></button><button type="button" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.title}`} className="p-2 text-white/55 hover:text-red-400"><Trash2 size={16} /></button></div></div></div></article>)}
            {currentProjects.map((project) => <article key={project.id} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b0b0b]"><video src={project.video} controls preload="metadata" className="aspect-video w-full bg-black object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Portfolio video</p><h3 className="mt-2 text-xl font-black uppercase tracking-[-0.05em] text-white">{project.title}</h3></div><div className="flex gap-1"><button type="button" onClick={() => editProject(project)} aria-label={`Edit ${project.title}`} className="p-2 text-white/55 hover:text-[#FFB000]"><Edit3 size={16} /></button><button type="button" onClick={() => deleteProject(project.id)} aria-label={`Delete ${project.title}`} className="p-2 text-white/55 hover:text-red-400"><Trash2 size={16} /></button></div></div></div></article>)}
          </div>
          {!allProjects.length && <div className="rounded-[1.5rem] border border-dashed border-white/10 p-10 text-center text-white/45"><Film className="mx-auto mb-3" size={28} /><p>No videos yet.</p></div>}
        </section>
      </main>
    </div>
  )
}