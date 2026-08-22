import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { useState } from 'react'
import { publishedProjects } from '../data/publishedProjects'
import { useUploadedProjects } from '../data/projectStore'

const filterOptions = ['All', 'Esports', 'Montages', 'Reels', 'Shorts', 'Gaming']

export function VideoPreview({ project, controls = false }) {
  const [poster, setPoster] = useState(project.thumbnail || '')

  const captureFirstFrame = (event) => {
    if (poster || !event.currentTarget.videoWidth) return
    const video = event.currentTarget
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    setPoster(canvas.toDataURL('image/jpeg', 0.8))
  }

  return (
    <video
      src={project.video}
      poster={poster || undefined}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      controls={controls}
      onLoadedData={captureFirstFrame}
      aria-label={`${project.title} preview`}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  )
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedVideoRatio, setSelectedVideoRatio] = useState(null)
  const { projects: uploadedProjects, deletedIds } = useUploadedProjects()
  const managedIds = new Set(uploadedProjects.map((project) => project.id))
  const currentProjects = publishedProjects.filter((project) => !managedIds.has(project.id) && !deletedIds.includes(project.id))
  const allProjects = [...uploadedProjects, ...currentProjects]

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((project) => (project.categories || [project.category]).includes(activeFilter))

  return (
    <section id="works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">Selected Works</p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">SELECTED WORKS</h2>
        </div>
        <p className="text-base text-white/60">Edits built around impact, pacing, and personality.</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 sm:gap-3">
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveFilter(option)}
            className={`rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition sm:px-4 sm:text-xs sm:tracking-[0.2em] ${
              activeFilter === option
                ? 'border-[#FFB000] bg-[#FFB000] text-[#050505]'
                : 'border-white/10 bg-white/5 text-white/70 hover:border-[#FFB000]/50 hover:text-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 sm:grid sm:gap-5 sm:overflow-visible sm:pb-0 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative min-w-full snap-start overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] sm:min-w-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <VideoPreview project={project} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between p-5 sm:flex">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#FFB000]">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.06em] text-white">{project.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVideoRatio(null)
                      setSelectedProject(project)
                    }}
                    aria-label={`Play ${project.title}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFB000] text-[#050505] shadow-[0_0_30px_rgba(255,176,0,0.4)]"
                  >
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4 sm:hidden">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#FFB000]">{project.category}</p>
                  <h3 className="mt-2 truncate text-lg font-black tracking-[-0.06em] text-white">{project.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVideoRatio(null)
                    setSelectedProject(project)
                  }}
                  aria-label={`Play ${project.title}`}
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#FFB000] text-[#050505] shadow-[0_0_30px_rgba(255,176,0,0.4)]"
                >
                  <Play size={17} fill="currentColor" className="ml-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      <a href="#works-all" className="mx-auto mt-8 flex w-fit items-center justify-center rounded-full border border-[#FFB000]/50 bg-[#FFB000]/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#FFB000] transition hover:bg-[#FFB000] hover:text-[#050505]">Show All Work</a>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[#050505]/85 p-4 backdrop-blur-md sm:items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative my-auto max-h-[calc(100vh-2rem)] w-full overflow-y-auto overscroll-contain rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] transition-[max-width] duration-300"
              style={{ maxWidth: selectedVideoRatio && selectedVideoRatio < 1 ? '34rem' : '56rem' }}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#050505]/80 text-white"
                aria-label="Close project"
              >
                <X size={18} />
              </button>

              <div className="flex max-h-[75vh] min-h-0 justify-center overflow-hidden bg-black">
                <video
                  className="block max-h-[75vh] max-w-full object-contain"
                  controls
                  autoPlay
                  poster={selectedProject.thumbnail}
                  onLoadedMetadata={(event) => {
                    setSelectedVideoRatio(event.currentTarget.videoWidth / event.currentTarget.videoHeight)
                  }}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                >
                  <source src={selectedProject.video} type="video/mp4" />
                </video>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.32em] text-[#FFB000]">{selectedProject.category}</div>
                    <h3 className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">{selectedProject.title}</h3>
                  </div>
                  <div className="text-sm text-white/60">Client: {selectedProject.client}</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">Editing style</p>
                    <p className="mt-2 text-base text-white/80">{selectedProject.style}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">Tools used</p>
                    <p className="mt-2 text-base text-white/80">{selectedProject.tools.join(', ')}</p>
                  </div>
                </div>

                <p className="text-base leading-7 text-white/70">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
