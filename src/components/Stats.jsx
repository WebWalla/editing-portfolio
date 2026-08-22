import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/projects'

function AnimatedNumber({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1200
          const start = performance.now()

          const tick = (time) => {
            const progress = Math.min((time - start) / duration, 1)
            setCount(Math.floor(progress * value))
            if (progress < 1) {
              requestAnimationFrame(tick)
            }
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl">
      {count}
      {suffix}
    </div>
  )
}

export default function Stats() {
  return (
    <section className="border-y border-white/10 bg-[#0b0b0b]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8 lg:py-10">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="text-sm uppercase tracking-[0.18em] text-white/65">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
