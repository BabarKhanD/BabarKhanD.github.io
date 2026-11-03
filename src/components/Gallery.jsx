import { useCallback, useEffect, useState } from 'react'
import Reveal from './Reveal'
import { UNIVERSITY } from '../data/university'
import './Gallery.css'

function Tags({ tags }) {
  return (
    <div className="tags">
      {tags.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )
}

function Lightbox({ project, onClose }) {
  const [i, setI] = useState(0)
  const n = project.media.length
  const prev = useCallback(() => setI((x) => (x - 1 + n) % n), [n])
  const next = useCallback(() => setI((x) => (x + 1) % n), [n])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = old
    }
  }, [onClose, prev, next])

  const m = project.media[i]

  return (
    <div className="gal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="gal-box" onClick={(e) => e.stopPropagation()} style={{ '--accent': project.accent }}>
        <button className="gal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="gal-head">
          <h4>{project.title}</h4>
          {n > 1 && <span>{i + 1} / {n}</span>}
        </div>
        <div className="gal-stage">
          {n > 1 && (
            <button className="gal-nav left" onClick={prev} aria-label="Previous">‹</button>
          )}
          {m.type === 'video' ? (
            <video key={m.src} src={m.src} controls playsInline preload="metadata" />
          ) : (
            <img key={m.src} src={m.src} alt={m.caption || project.title} />
          )}
          {n > 1 && (
            <button className="gal-nav right" onClick={next} aria-label="Next">›</button>
          )}
        </div>
        {m.caption && <p className="gal-cap">{m.caption}</p>}
        {n > 1 && (
          <div className="gal-dots">
            {project.media.map((x, idx) => (
              <button
                key={x.src}
                className={idx === i ? 'on' : ''}
                onClick={() => setI(idx)}
                aria-label={`Show item ${idx + 1}`}
              >
                {x.type === 'video' ? 'Video' : `Image ${idx + 1}`}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Engineering() {
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="engineering" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">ENGINEERING &amp; APPLIED PROJECTS</p>
          <h2 className="section-title">
            Hands-on <span className="grad-text">engineering</span>
          </h2>
          <p className="gal-sub">
            Robotics hardware, networking, CAD and data projects from my Bahria University coursework.
            Click a project to see photos, diagrams and demos.
          </p>
        </Reveal>

        <div className="gal-grid">
          {UNIVERSITY.map((p, idx) => {
            const thumb = p.media.find((m) => m.type === 'image')
            return (
              <Reveal key={p.id} delay={idx * 70}>
                <button
                  type="button"
                  className="card gcard"
                  style={{ '--accent': p.accent }}
                  onClick={() => setOpen(p)}
                >
                  <div className="card-top">
                    <h4>{p.title}</h4>
                    <span className="arrow">↗</span>
                  </div>
                  <p className="credit">{p.course}</p>
                  <p className="metric">{p.metric}</p>
                  <p className="card-desc">{p.desc}</p>
                  {thumb && <img className="gthumb" src={thumb.src} alt={p.title} loading="lazy" />}
                  <Tags tags={p.tags} />
                  <span className="gal-open">View gallery · {p.media.length} {p.media.length === 1 ? 'item' : 'items'}</span>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
      {open && <Lightbox project={open} onClose={close} />}
    </section>
  )
}