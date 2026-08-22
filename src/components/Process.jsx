import { motion } from 'framer-motion'
import { processSteps } from '../data/projects'

export default function Process() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">Process</p>
        <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">MY PROCESS</h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-8 hidden h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FFB000]/40 to-transparent lg:block" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative rounded-[1.5rem] border border-white/10 bg-[#0c0c0c] p-6"
            >
              <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFB000] text-xs font-black text-[#050505]">0{index + 1}</div>
              <div className="pt-4 text-2xl font-black tracking-[-0.06em] text-white">{step}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
