import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">About me</p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl">ABOUT ME</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          <p className="text-base leading-8 text-white/75 sm:text-lg">
            &quot;I&apos;m SK_CUTS8, also known as Shantesh K — a gaming and esports video editor focused on turning raw gameplay into fast-paced, engaging visual stories.
          </p>
          <p className="text-base leading-8 text-white/75 sm:text-lg">
            I specialize in gaming montages, esports highlights, reels, short-form content, music synchronization, motion graphics, and cinematic gameplay edits.
          </p>
          <p className="text-base leading-8 text-white/75 sm:text-lg">
            My goal is simple: make every frame feel intentional and keep viewers engaged from the first second to the last.&quot;
          </p>

          <div className="pt-2 text-base font-medium italic text-[#FFB000]">
            — Shantesh K
          </div>
        </motion.div>
      </div>
    </section>
  )
}
