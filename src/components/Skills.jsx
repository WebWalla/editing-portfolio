import { motion } from 'framer-motion'
import { Clapperboard, Music2, Sparkles, Video } from 'lucide-react'
import { skillCards } from '../data/projects'

const iconMap = {
  sparkles: Sparkles,
  music: Music2,
  wand: Sparkles,
  play: Video,
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">What I do</p>
        <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">WHAT I DO</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {skillCards.map((card, index) => {
          const Icon = iconMap[card.icon] || Clapperboard

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0d0d0d] p-4 transition hover:border-[#FFB000]/60 hover:shadow-[0_0_30px_rgba(255,176,0,0.12)] sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#FFB000]/60 to-transparent" />
              <div className="mb-8 flex items-center justify-between">
                <span className="text-3xl font-black tracking-[-0.08em] text-[#FFB000]">{card.number}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FFB000]/25 bg-[#FFB000]/10 text-[#FFB000] transition duration-300 group-hover:scale-110">
                  <Icon size={18} />
                </span>
              </div>
              <h3 className="text-lg font-bold leading-tight tracking-[-0.04em] text-white sm:text-2xl">{card.title}</h3>
              <p className="mt-3 text-xs leading-5 text-white/65 sm:mt-4 sm:text-sm sm:leading-7">{card.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
