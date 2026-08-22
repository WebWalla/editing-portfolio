import { motion } from 'framer-motion'
import { experienceEntries } from '../data/projects'

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">Experience</p>
        <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">EXPERIENCE</h2>
      </motion.div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-[18px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-[#FFB000]/70 to-transparent md:block" />

        <div className="space-y-5 md:space-y-8">
          {experienceEntries.map((entry, index) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative md:pl-16"
            >
              <div className="absolute left-0 top-6 hidden h-5 w-5 rounded-full border-4 border-[#050505] bg-[#FFB000] md:block" />
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0c0c0c] p-6 sm:p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFB000]">{index + 1}</div>
                <h3 className="mt-3 text-2xl font-bold tracking-[-0.05em] text-white">{entry.title}</h3>
                <p className="mt-4 text-base leading-7 text-white/65">{entry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
