import { motion } from 'framer-motion'

const toolsList = [
  { name: 'Premiere Pro', purpose: 'Video Editing', logo: '/images/tools/premiere-pro.jpg' },
  { name: 'After Effects', purpose: 'Motion Graphics', logo: '/images/tools/after-effects.jpg' },
  { name: 'Photoshop', purpose: 'Graphics & Thumbnails', logo: '/images/tools/photoshop.jpg' },
  { name: 'DaVinci Resolve', purpose: 'Color & Finishing', logo: '/images/tools/davinci-resolve.jpg' },
  { name: 'CapCut', purpose: 'Social-first quick edits', logo: '/images/tools/capcut.jpg' },
]

export default function Tools() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">Tools</p>
        <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">TOOLS I USE</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {toolsList.map((tool, index) => {
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-[1.25rem] border border-white/10 bg-[#0c0c0c] p-4 transition hover:-translate-y-1 hover:border-[#FFB000]/50 hover:bg-[#101010] sm:rounded-[1.5rem] sm:p-5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB000]/10 text-[#FFB000]">
                <img src={tool.logo} alt={`${tool.name} logo`} className="h-8 w-8 object-contain" />
              </div>
              <div className="text-base font-bold leading-tight tracking-[-0.04em] text-white sm:text-xl">{tool.name}</div>
              <div className="mt-2 text-xs text-white/60 sm:text-sm">{tool.purpose}</div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
