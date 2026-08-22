import { ArrowRight, Play, Sparkles, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUploadedProjects } from '../data/projectStore'
import { useState } from 'react'

export default function Hero() {
  const { projects, featuredId } = useUploadedProjects()
  const latestProject = projects.find((project) => String(project.id) === featuredId) || projects[0]
  const [isLatestOpen, setIsLatestOpen] = useState(false)

  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,176,0,0.16),_transparent_35%),radial-gradient(circle_at_left,_rgba(255,255,255,0.04),_transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:pb-28 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFB000]/30 bg-[#FFB000]/8 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFB000] sm:mb-6 sm:px-3 sm:text-[10px] sm:tracking-[0.32em]">
            <Sparkles size={12} />
            Gaming × Esports × Video Editing
          </div>

          <h1 className="font-black uppercase leading-[0.9] tracking-[-0.06em] text-white text-[2.65rem] sm:text-6xl lg:text-8xl">
            SK_CUTS8
          </h1>

          <h2 className="mt-4 max-w-xl text-[2rem] font-bold leading-[0.98] tracking-[-0.05em] text-white/90 sm:text-5xl">
            Gaming & Esports
            <span className="mt-2 block text-[#FFB000]">Video Editor</span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-6 text-white/65 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
            Turning raw gameplay into high-energy visual stories built for creators, esports teams, and social media.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <a
              href="#works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFB000] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#050505] transition hover:-translate-y-0.5 hover:bg-[#ffc333] sm:w-auto"
            >
              View My Work <ArrowRight size={16} />
            </a>

            <a
              href="#works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-[#FFB000]/50 hover:text-[#FFB000] sm:w-auto"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFB000] text-[#050505]">
                <Play size={12} fill="currentColor" />
              </span>
              View My Work
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -left-8 top-10 h-20 w-20 rounded-full bg-[#FFB000]/20 blur-3xl" />
          <div className="absolute -right-6 bottom-12 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010]/90 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080808]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(255,176,0,0.14),_transparent_45%),linear-gradient(135deg,#111111,#050505)]">
                {latestProject && <video src={latestProject.video} muted loop autoPlay playsInline preload="metadata" aria-label={`${latestProject.title} latest edit preview`} className="absolute inset-0 h-full w-full object-cover opacity-70" />}
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute left-8 top-8 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white/75">
                  Portfolio Reel
                </div>

                <div className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-12">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-[10px] uppercase tracking-[0.28em] text-[#FFB000]">Latest edit</div>
                          <p className="mt-2 text-2xl font-black uppercase tracking-[-0.06em] text-white">{latestProject?.title || 'Arena Rush'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => latestProject && setIsLatestOpen(true)}
                      aria-label={`Play ${latestProject?.title || 'latest edit'}`}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFB000] text-[#050505] shadow-[0_0_30px_rgba(255,176,0,0.5)]"
                    >
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {isLatestOpen && latestProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] shadow-[0_40px_90px_rgba(0,0,0,0.8)]">
            <button type="button" onClick={() => setIsLatestOpen(false)} aria-label="Close latest edit" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#050505]/80 text-white"><X size={18} /></button>
            <video src={latestProject.video} controls autoPlay playsInline className="mx-auto block max-h-[75vh] max-w-full bg-black object-contain" />
            <div className="p-5"><p className="text-xs uppercase tracking-[0.25em] text-[#FFB000]">Latest edit</p><h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.06em] text-white">{latestProject.title}</h3></div>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50">
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em]">
          <span>Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </div>
    </section>
  )
}
