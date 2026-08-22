export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 text-sm text-white/60 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-8">
        <div className="text-center font-black uppercase tracking-[0.16em] text-white lg:text-left lg:tracking-[0.22em]">SK_CUTS8</div>

        <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <a href="#home" className="transition hover:text-[#FFB000]">Home</a>
          <a href="#about" className="transition hover:text-[#FFB000]">About</a>
          <a href="#works" className="transition hover:text-[#FFB000]">Works</a>
          <a href="#contact" className="transition hover:text-[#FFB000]">Contact</a>
        </nav>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 lg:justify-end">
          <a href="https://instagram.com/sk_cuts8" target="_blank" rel="noreferrer" className="transition hover:text-[#FFB000]">Instagram</a>
          <a href="mailto:shanteshworks@gmail.com" className="transition hover:text-[#FFB000]">Email</a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/45 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>© 2026 SK_CUTS8. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/80">Privacy Policy</a>
            <a href="#" className="hover:text-white/80">Terms &amp; Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
