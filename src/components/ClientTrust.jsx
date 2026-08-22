import { motion } from 'framer-motion'
import { clientLogos } from '../data/projects'

export default function ClientTrust() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-6 sm:p-8"
      >
        <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">Trusted to edit for</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clientLogos.map((name) => (
            <div key={name} className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white/70">
              {name}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
