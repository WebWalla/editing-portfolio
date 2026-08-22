import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react'
import { navItems } from '../data/projects'

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const label = visible.target.id
          const item = navItems.find((nav) => nav.href === `#${label}`)
          if (item) setActive(item.label)
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    )

    sections.forEach((section) => observer.observe(section))
    window.addEventListener('scroll', onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleNavClick = (label) => {
    setActive(label)
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-[#050505]/75 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="text-sm font-black tracking-[0.18em] text-white uppercase sm:text-lg sm:tracking-[0.22em]">
          SK_CUTS8
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.label)}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                active === item.label ? 'text-[#FFB000]' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
              {active === item.label && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#FFB000]" />
              )}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#FFB000]/60 hover:text-[#FFB000]"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#FFB000]/60 bg-[#FFB000] px-5 py-2.5 text-sm font-semibold text-[#050505] transition hover:translate-y-[-1px] hover:bg-[#ffc333]"
          >
            Hire Me <ArrowUpRight size={14} />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#050505]/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.label)}
                className={`rounded-xl px-4 py-3 text-base font-medium ${
                  active === item.label ? 'bg-[#FFB000]/10 text-[#FFB000]' : 'text-white/80'
                }`}
              >
                {item.label}
              </a>
            ))}

            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFB000] px-4 py-2.5 text-sm font-semibold text-[#050505]"
              >
                Hire Me <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
