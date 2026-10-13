import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { repo, FEATURED, RESEARCH, BUSINESS, FOUNDATIONS } from '../data/projects'
import './Projects.css'

const ROBO_STAGES = [
  ['IMAGE', 'Monocular RGB image or video'],
  ['DETECTION', 'YOLOv8-Seg instance masks'],
  ['DEPTH', 'Depth Anything V2 + instance depth alignment'],
  ['TRACKING', 'ByteTrack + motion estimation'],
  ['SCENE GRAPH', 'Spatial relations → 2.5D scene graph'],
  ['QUERY', 'Rules-based robot query layer'],
]

const SERVE_NODES = [
  ['Client', 'validated image upload'],
  ['FastAPI', 'REST API · model versioning'],
  ['PyTorch ⇄ ONNX Runtime', 'CPU inference + benchmarks'],
  ['PostgreSQL', 'persistence · structured logs'],
]

// Add real benchmark numbers here when ready, e.g. [['PyTorch', 42], ['ONNX Runtime', 18]] (ms)
const BENCH = null

function Tags({ tags }) {
  return (
    <div className="tags">
      {tags.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )
}

function Card({ p, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <a className="card" href={repo(p.repo)} target="_blank" rel="noreferrer" style={{ '--accent': p.accent }}>
        <div className="card-top">
          <h4>{p.title}</h4>
          <span className="arrow">↗</span>
        </div>
        {p.metric && <p className="metric">{p.metric}</p>}
        <p className="card-desc">{p.desc}</p>
        <Tags tags={p.tags} />
        <span className="repo-name">github.com/BabarKhanD/{p.repo}</span>
      </a>
    </Reveal>
  )
}

function Group({ title, sub, items, cols = 2 }) {
  return (
    <div className="group">
      <Reveal>
        <h3 className="group-title">{title}</h3>
        <p className="group-sub">{sub}</p>
      </Reveal>
      <div className={`grid cols-${cols}`}>
        {items.map((p, i) => (
          <Card key={p.repo} p={p} delay={i * 70} />
        ))}
      </div>
    </div>
  )
}

function RoboSight() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ROBO_STAGES.length), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <Reveal>
      <article className="flagship" style={{ '--accent': '#22d3ee' }}>
        <div className="flag-info">
          <span className="badge">FLAGSHIP · PERCEPTION</span>
          <h3>RoboSight</h3>
          <p className="flag-tag">Intelligent robotic visual perception</p>
          <p>
            Software-only robotic perception that converts monocular RGB images and video into
            structured 2.5D spatial scene graphs, with a rules-based query layer for robot-style scene
            understanding. Runs on CPU, no hardware needed.
          </p>
          <Tags tags={['YOLOv8-Seg', 'Depth Anything V2', 'ByteTrack', 'OpenCV', 'PyTorch', 'Scene graph']} />
          <a className="btn btn-primary" href={repo('robosight')} target="_blank" rel="noreferrer">
            View on GitHub ↗
          </a>
        </div>
        <ol className="pipeline">
          {ROBO_STAGES.map(([name, note], i) => (
            <li key={name} className={i === active ? 'on' : i < active ? 'done' : ''}>
              <span className="node" />
              <div>
                <strong>{name}</strong>
                <small>{note}</small>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </Reveal>
  )
}

function VisionServe() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SERVE_NODES.length), 1700)
    return () => clearInterval(id)
  }, [])

  return (
    <Reveal>
      <article className="flagship reverse" style={{ '--accent': '#a78bfa' }}>
        <div className="flag-info">
          <span className="badge">FLAGSHIP · AI ENGINEERING</span>
          <h3>VisionServe</h3>
          <p className="flag-tag">Production computer-vision inference platform</p>
          <p>
            Production-style CV inference service with validated image inference, model versioning,
            structured logging, database persistence, API tests, Docker Compose deployment and native
            PyTorch vs ONNX Runtime benchmarking for CPU inference.
          </p>
          <Tags tags={['FastAPI', 'PostgreSQL', 'Docker', 'PyTorch', 'ONNX Runtime']} />
          <a className="btn btn-primary" href={repo('visionserve')} target="_blank" rel="noreferrer">
            View on GitHub ↗
          </a>
        </div>
        <div className="serve-viz">
          <div className="flow">
            {SERVE_NODES.map(([name, note], i) => (
              <div key={name} className={`flow-node ${i === active ? 'on' : ''}`}>
                <strong>{name}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
          <div className="bench">
            <h5>PyTorch vs ONNX Runtime · CPU latency</h5>
            {BENCH ? (
              BENCH.map(([label, ms]) => {
                const max = Math.max(...BENCH.map((b) => b[1]))
                return (
                  <div className="bar-row" key={label}>
                    <span>{label}</span>
                    <div className="bar">
                      <i style={{ width: `${(ms / max) * 100}%` }} />
                    </div>
                    <b>{ms} ms</b>
                  </div>
                )
              })
            ) : (
              <p className="bench-note">Benchmark results are in the repository. Live chart coming soon.</p>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">FEATURED SYSTEMS</p>
          <h2 className="section-title">
            Work that <span className="grad-text">ships</span>
          </h2>
        </Reveal>

        <RoboSight />
        <VisionServe />

        <Group title="AI / Computer Vision / GenAI" sub="Applied systems across medical imaging, inspection, sports analytics and local LLMs." items={FEATURED} />
        <Group title="Research Projects" sub="Experimental work behind my conference submissions." items={RESEARCH} />
        <Group title="Business AI Demos" sub="Automation demos built for real-estate and property operations." items={BUSINESS} />
        <Group title="ML Foundations" sub="Core machine learning projects." items={FOUNDATIONS} />

        <Reveal>
          <p className="all-repos">
            Everything is public:{' '}
            <a href="https://github.com/BabarKhanD?tab=repositories" target="_blank" rel="noreferrer">
              github.com/BabarKhanD ↗
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}