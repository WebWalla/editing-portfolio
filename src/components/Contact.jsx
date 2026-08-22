import { ArrowRight, Camera, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="rounded-[2rem] border border-[#FFB000]/25 bg-[radial-gradient(circle_at_top,_rgba(255,176,0,0.12),transparent_38%),linear-gradient(135deg,#111111,#050505)] p-8 sm:p-10 lg:p-14"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FFB000]">Hire Me</p>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
            LET&apos;S CREATE SOMETHING THAT STANDS OUT.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Have a montage, esports project, reel, or gaming campaign in mind? Let&apos;s turn your footage into something people remember.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shanteshedits%40gmail.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFB000] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#050505] transition hover:-translate-y-0.5 hover:bg-[#ffc333] sm:w-auto"
          >
            Hire Me <ArrowRight size={16} />
          </a>

          <a
            href="https://instagram.com/sk_cuts8"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:border-[#FFB000]/60 hover:text-[#FFB000] sm:w-auto"
          >
            <Camera size={16} />
            Instagram
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <a href="mailto:shanteshedits@gmail.com" className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-[#FFB000]/50 hover:text-white">
            <Mail size={18} className="text-[#FFB000]" />
            <span>shanteshedits@gmail.com</span>
          </a>
          <a href="https://instagram.com/sk_cuts8" target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 transition hover:border-[#FFB000]/50 hover:text-white">
            <Camera size={18} className="text-[#FFB000]" />
            <span>@sk_cuts8</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
