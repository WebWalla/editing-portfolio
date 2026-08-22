import { useEffect, useState } from 'react'
import About from './components/About'
import Admin from './components/Admin'
import ClientTrust from './components/ClientTrust'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Skills from './components/Skills'
import Stats from './components/Stats'
import Tools from './components/Tools'
import WorksPage from './components/WorksPage'

function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin')
  const [isWorksPage, setIsWorksPage] = useState(() => window.location.hash === '#works-all')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('sk-theme')
    return saved || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('sk-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin')
      setIsWorksPage(window.location.hash === '#works-all')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (isAdmin) return <Admin />
  if (isWorksPage) return <WorksPage />

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
      <div className="grain pointer-events-none fixed inset-0 opacity-50" />
      <Navbar theme={theme} toggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Tools />
        <Experience />
        <Portfolio />
        <ClientTrust />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
