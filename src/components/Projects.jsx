import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { repo, AI, BUSINESS, FOUNDATIONS } from '../data/projects'
import './Projects.css'

const ROBO_STAGES = [
  ['IMAGE', 'Monocular RGB image or video'],
  ['DETECTION', 'YOLOv8-Seg instance masks'],
  ['DEPTH', 'Depth Anything V2 + instance depth alignment'],
  ['TRACKING', 'ByteTrack + motion estimation'],
  ['SCENE GRAPH', 'Spatial relations, 2.5D scene graph'],
  ['QUERY', 'Rules-based robot query layer'],
]

const SERVE_NODES = [
  ['Client', 'validated image upload'],
  ['FastAPI', 'REST API · model versioning'],
  ['PyTorch ⇄ ONNX Runtime', 'CPU inference + benchmarks'],
  ['PostgreSQL', 'persistence · structured logs'],
]

// Measured: Windows 10, 4 logical cores, CPU only, YOLOv8n, 400 samples per backend
const BENCH = [
  ['PyTorch', 195.9],
  ['ONNX Runtime', 137.2],
]

function Shot({ src, alt, caption }) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return (
    <figure className="shot">
      <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

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
        {p.credit && <p className="credit">{p.credit}</p>}
        {p.metric && <p className="metric">{p.metric}</p>}
        <p className="card-desc">{p.desc}</p>
        {p.note && <p className="card-note">{p.note}</p>}
        {p.image && <Shot src={p.image} alt={p.title} />}
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
            structured 2.5D spatial scene graphs, with a rules-based query layer that answers
            questions like "which object is closest?" or "what is to the left of the car?". Runs on
            CPU, no hardware needed.
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
        <div className="flag-wide">
          <Shot
            src="/projects/robosight.png"
            alt="RoboSight output: detections with depth buckets and relative depth map"
            caption="Real output: instances labeled Near / Mid-Range / Far (left) and the relative depth map (right)."
          />
        </div>
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
  const max = Math.max(...BENCH.map((b) => b[1]))

  return (
    <Reveal>
      <article className="flagship reverse" style={{ '--accent': '#a78bfa' }}>
        <div className="flag-info">
          <span className="badge">FLAGSHIP · AI ENGINEERING</span>
          <h3>VisionServe</h3>
          <p className="flag-tag">Production computer-vision inference platform</p>
          <p>
            Upload an image, get detections as JSON, and every prediction is stored in PostgreSQL.
            Validated uploads, model versioning with weight checksums, structured request-ID logs,
            Docker Compose deployment, 73 passing tests and a reproducible PyTorch vs ONNX Runtime
            benchmark, switchable with one environment variable.
          </p>
          <Tags tags={['FastAPI', 'PostgreSQL', 'Docker', 'PyTorch', 'ONNX Runtime', 'Alembic']} />
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
            <h5>MEAN LATENCY · YOLOV8N · CPU (LOWER IS BETTER)</h5>
            {BENCH.map(([label, ms]) => (
              <div className="bar-row" key={label}>
                <span>{label}</span>
                <div className="bar">
                  <i style={{ width: `${(ms / max) * 100}%` }} />
                </div>
                <b>{ms} ms</b>
              </div>
            ))}
            <div className="bench-facts">
              <span><b>1.43×</b> faster</span>
              <span><b>7.31</b> vs 5.09 FPS</span>
              <span><b>142</b> vs 300 MB RAM</span>
              <span><b>0.43</b> vs 3.75 s load</span>
            </div>
            <p className="bench-note">
              Windows 10, 4 logical cores, CPU only, 400 samples per backend. Outputs matched on both
              test images. Raw data is in the repo.
            </p>
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

        <Group title="AI / Computer Vision / ML" sub="Medical imaging, inspection, sports analytics, local LLMs, motorsport telemetry and navigation." items={AI} />
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