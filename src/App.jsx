import { useEffect, useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Projects from './components/Projects'
import { Experience, Certificates, Skills, About, Contact, Footer } from './components/Sections'
import './App.css'

const LINKS = {
  github: 'https://github.com/BabarKhanD',
  linkedin: 'https://www.linkedin.com/in/babar-khan-durrani-542a98277',
  contra: 'https://contra.com/babar_durrani_3fgf7tlz/work?r=babar_durrani_3fgf7tlz',
  email: 'mailto:kdurranibabar@gmail.com',
}

const NAV = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Certificates', '#certificates'],
  ['Skills', '#skills'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

const ROLES = ['AI Engineer', 'Computer Vision', 'Robotics', 'Generative AI', 'ML Systems']

const STATS = [
  ['2', 'AI/ML internships: Embotics and DevelopersHub'],
  ['3.11', 'CGPA out of 4.00, BS Robotics & Intelligent Systems'],
  ['4', 'languages: Pashto, Urdu, English, Punjabi'],
  ['6', 'roles across industry, internships and IEEE leadership'],
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="logo">
            BABAR<span>.</span>DURRANI
          </a>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? '✕' : '☰'}
          </button>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
            <li>
              <a className="nav-cta" href="/Babar_Khan_Durrani_CV.pdf" target="_blank" rel="noreferrer">
                CV
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <ParticleBackground />
          <div className="container">
            <div className="hero-grid">
              <div>
                <p className="eyebrow">AI / COMPUTER VISION / ROBOTICS</p>
                <h1>
                  Babar Khan <span className="grad-text">Durrani</span>
                </h1>
                <p className="role-line">
                  &gt; <b key={roleIdx}>{ROLES[roleIdx]}</b>
                </p>
                <p className="hero-sub">
                  Building intelligent systems that perceive, reason and operate. Robotics &amp;
                  Intelligent Systems undergraduate shipping end-to-end AI: perception, inference,
                  retrieval, deployment and robotics.
                </p>
                <div className="btn-row">
                  <a className="btn btn-primary" href="#work">View Projects</a>
                  <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
                  <a className="btn btn-ghost" href="/Babar_Khan_Durrani_CV.pdf" target="_blank" rel="noreferrer">Download CV</a>
                </div>
                <div className="chips">
                  <span className="chip">◉ AI</span>
                  <span className="chip">◉ CV</span>
                  <span className="chip">◉ ROBOTICS</span>
                  <span className="chip">◉ RAG</span>
                </div>
              </div>
              <div className="photo-wrap">
                <img className="photo" src="/profile.jpg" alt="Babar Khan Durrani" />
              </div>
            </div>

            <div className="stats">
              {STATS.map(([value, label]) => (
                <div className="stat" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Projects />
        <Experience />
        <Certificates />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}