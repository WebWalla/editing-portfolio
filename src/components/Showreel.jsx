import { Play, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Showreel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="showreel" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">Showreel</p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">SHOWREEL</h2>
        </div>
        <p className="max-w-xl text-sm text-white/60 sm:text-base">
          Fast cuts. Clean transitions. Maximum impact.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,176,0,0.18),_transparent_40%),linear-gradient(135deg,#111111,#050505)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:36px_36px]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-[#FFB000]/90 text-[#050505] shadow-[0_0_50px_rgba(255,176,0,0.35)] transition duration-300 group-hover:scale-105"
              aria-label="Play showreel"
            >
              <Play size={32} fill="currentColor" className="ml-1" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent p-6 sm:p-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#FFB000]">Preview</div>
              <p className="mt-2 text-xl font-black uppercase tracking-[-0.06em] text-white sm:text-2xl">Play Showreel</p>
            </div>
          </div>
        </div>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/85 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111111] shadow-[0_40px_90px_rgba(0,0,0,0.8)]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#050505]/80 text-white"
              aria-label="Close video"
            >
              <X size={18} />
            </button>
            <video
              className="mx-auto block max-h-[75vh] max-w-full bg-black object-contain"
              controls
              autoPlay
              poster="/images/showreel-poster.svg"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            >
              <source src="/videos/showreel.mp4" type="video/mp4" />
            </video>
            <div className="bg-[#111111] p-5 text-center text-sm text-white/70">
              Showreel preview unavailable. Replace <span className="text-[#FFB000]">/videos/showreel.mp4</span> with your final edit.
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
