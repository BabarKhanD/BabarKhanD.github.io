import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import './Sections.css'

const PRO = [
  {
    role: 'AI & ML Intern',
    org: 'Embotics (Pvt.) Ltd.',
    period: 'Jul 2026 – Sep 2026',
    place: 'Islamabad · On-site',
    accent: '#34d399',
    points: [
      'Contributed to an AI Teacher Robot giving interactive educational help from Grades 2–9 textbooks.',
      'Extracted, cleaned, chunked and indexed textbooks into a vector database for semantic retrieval.',
      'Built a RAG pipeline with locally hosted LLMs through Ollama for curriculum-grounded answers.',
      'Deployed and tested the system on Raspberry Pi, evaluating local inference and hardware limits.',
      'Integrated audio-based interaction for spoken responses and natural human-robot interaction.',
    ],
  },
  {
    role: 'AI/ML Engineering Intern',
    org: 'DevelopersHub Corporation',
    period: 'Jul 2025 – Sep 2025',
    place: 'Remote',
    accent: '#22d3ee',
    points: [
      'Six-week virtual internship applying ML to real-world projects: data preprocessing, model training and evaluation in Python.',
      'Received a Certificate of Achievement (Best Award) for exceptional performance.',
    ],
  },
  {
    role: 'Appointment Setter',
    org: 'EDM Solutions',
    period: 'Sep 2023 – Nov 2023',
    place: 'Punjab · On-site · Part-time',
    accent: '#fbbf24',
    points: [
      'B2B outreach to US construction and remodeling companies for Facebook advertising consultations.',
      'Cold calling, lead qualification and booking appointments for senior sales executives; met daily targets.',
    ],
  },
  {
    role: 'Customer Service Representative',
    org: 'Bridgeway Telecom Pvt. Ltd.',
    period: 'Jan 2023 – Sep 2023',
    place: 'Punjab · On-site · Full-time',
    accent: '#f472b6',
    points: [
      'Handled UK B2B customers: electricity and gas contract options and the switching process.',
      'Met sales targets; trained and mentored new team members on handling, communication and sales.',
    ],
  },
]

const LEAD = [
  {
    role: 'Deputy Director – Technical',
    org: 'IEEE, Bahria University',
    period: 'Sep 2025 – Jan 2026',
    place: 'Islamabad · On-site',
    accent: '#60a5fa',
    points: [
      'Planned and managed technical events including the IEEE E-Hunt competition.',
      'Coordinated volunteers, promotion, registrations and communication with students and faculty.',
    ],
  },
  {
    role: 'Deputy Director – Sports',
    org: 'IEEE Robotics and Automation Society, Bahria University',
    period: 'Apr 2024 – Sep 2025',
    place: 'Islamabad · On-site',
    accent: '#a78bfa',
    points: [
      'Organized sports trials, formed teams and led them in inter-departmental competitions.',
      'Kept members engaged through regular activities and a strong sports culture.',
    ],
  },
]

const EDU = [
  {
    role: 'BS Robotics and Intelligent Systems',
    org: 'Bahria University, Islamabad',
    period: 'Sep 2023 – Sep 2027',
    place: 'CGPA 3.11 / 4.00',
    accent: '#22d3ee',
    points: [
      'Focus: embedded systems, automation, AI and networking.',
      'Coursework: AI, Machine Learning, Computer Vision, Embedded Systems, Robotics, Automation, Control Systems.',
      'Projects: Unity game development, digital logic design, campus-wide network in Cisco Packet Tracer.',
    ],
  },
  {
    role: 'FSc, Intermediate in Computer Science',
    org: 'Cadet College Rawalpindi',
    period: 'Sep 2020 – Sep 2022',
    place: 'Grade A',
    accent: '#34d399',
    points: [
      'Served as Parade Commander, leading official parades and representing the college at key events.',
      'Built leadership, discipline and teamwork through sports, drills and co-curricular activities.',
    ],
  },
  {
    role: 'Matriculation, Computer Science',
    org: 'The Educators',
    period: 'Jul 2018 – Jul 2020',
    place: 'Grade B+',
    accent: '#fbbf24',
    points: ['Built a foundation in mathematics, physics and chemistry.'],
  },
]

const CERTS = [
  {
    title: 'Internship Certificate',
    issuer: 'Embotics Pvt. Ltd.',
    date: '22 Jul – 1 Sep 2026',
    img: '/certificates/embotics.jpg',
    accent: '#34d399',
  },
  {
    title: 'AI/ML Engineering: Certificate of Achievement',
    issuer: 'DevelopersHub Corporation',
    date: '12 Jul – 31 Aug 2025',
    img: '/certificates/developershub.jpg',
    accent: '#22d3ee',
  },
  {
    title: 'Student Organizer: Certificate of Appreciation',
    issuer: 'E-Hunt 2025 · IEEE · Bahria University',
    date: '15–17 Dec 2025',
    img: '/certificates/ehunt-2025.jpg',
    accent: '#60a5fa',
  },
]

const SKILLS = [
  ['Programming', '#22d3ee', ['Python', 'C++']],
  ['AI & Machine Learning', '#a78bfa', ['PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn']],
  ['Computer Vision', '#34d399', ['OpenCV', 'YOLO', 'Ultralytics', 'YOLOv8-Seg', 'ByteTrack', 'Depth Anything V2']],
  ['Generative AI & NLP', '#f472b6', ['RAG', 'Ollama', 'Local LLMs', 'ChromaDB', 'Sentence Transformers', 'Embeddings', 'Semantic Search', 'n8n']],
  ['AI Engineering', '#60a5fa', ['FastAPI', 'REST APIs', 'PostgreSQL', 'SQL', 'Docker', 'Docker Compose', 'ONNX Runtime']],
  ['Robotics & Hardware', '#fbbf24', ['ESP32', 'Arduino', 'Raspberry Pi', 'Proteus', 'PCB Design']],
  ['Networking & Simulation', '#fb923c', ['Cisco Packet Tracer', 'MATLAB/Simulink']],
  ['Business', '#22d3ee', ['B2B & B2C Sales', 'Client Negotiation']],
]

const LANGS = [
  ['Pashto', 'Native'],
  ['Urdu', 'Fluent'],
  ['English', 'Fluent'],
  ['Punjabi', 'Intermediate'],
]

const CONTACTS = [
  ['Email', 'kdurranibabar@gmail.com', 'mailto:kdurranibabar@gmail.com', '#22d3ee'],
  ['LinkedIn', 'babar-khan-durrani', 'https://www.linkedin.com/in/babar-khan-durrani-542a98277', '#60a5fa'],
  ['GitHub', 'BabarKhanD', 'https://github.com/BabarKhanD', '#a78bfa'],
  ['Contra', 'Hire me on Contra', 'https://contra.com/babar_durrani_3fgf7tlz/work?r=babar_durrani_3fgf7tlz', '#34d399'],
]

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <Reveal key={it.role + it.org} delay={i * 70}>
          <div className="t-item" style={{ '--accent': it.accent }}>
            <span className="t-dot" />
            <div className="t-card">
              <div className="t-head">
                <h4>{it.role}</h4>
                <span className="t-period">{it.period}</span>
              </div>
              <p className="t-org">{it.org}</p>
              <p className="t-place">{it.place}</p>
              <ul>
                {it.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">EXPERIENCE &amp; EDUCATION</p>
          <h2 className="section-title">
            The <span className="grad-text">journey</span> so far
          </h2>
        </Reveal>

        <div className="two-col">
          <div>
            <h3 className="sub-title">Professional &amp; Internships</h3>
            <Timeline items={PRO} />
          </div>
          <div>
            <h3 className="sub-title">Leadership</h3>
            <Timeline items={LEAD} />
            <h3 className="sub-title edu-gap">Education</h3>
            <Timeline items={EDU} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Certificates() {
  const [sel, setSel] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSel(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="certificates" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">CERTIFICATES</p>
          <h2 className="section-title">
            Recognition &amp; <span className="grad-text">credentials</span>
          </h2>
        </Reveal>
        <div className="cert-grid">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <button className="cert" style={{ '--accent': c.accent }} onClick={() => setSel(c)}>
                <img src={c.img} alt={c.title} loading="lazy" />
                <div className="cert-info">
                  <strong>{c.title}</strong>
                  <span>{c.issuer}</span>
                  <small>{c.date} · click to enlarge</small>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {sel && (
        <div className="lightbox" onClick={() => setSel(null)}>
          <img src={sel.img} alt={sel.title} />
          <span className="lb-close">✕</span>
        </div>
      )}
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">TECHNICAL STACK</p>
          <h2 className="section-title">
            Tools I <span className="grad-text">build</span> with
          </h2>
        </Reveal>
        <div className="skill-grid">
          {SKILLS.map(([name, color, items], i) => (
            <Reveal key={name} delay={i * 50}>
              <div className="skill-card" style={{ '--accent': color }}>
                <h4>
                  <i /> {name}
                </h4>
                <div className="skill-chips">
                  {items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <Reveal>
          <p className="eyebrow">ABOUT</p>
          <h2 className="section-title">
            Perception, inference, <span className="grad-text">deployment</span>
          </h2>
          <p className="about-text">
            Robotics &amp; Intelligent Systems undergraduate focused on applied AI, computer vision and
            intelligent systems. I build end-to-end AI systems spanning perception, model inference,
            retrieval, deployment and robotics-oriented applications, combining intelligent perception
            with reliable software engineering.
          </p>
          <div className="langs">
            {LANGS.map(([l, lvl]) => (
              <span key={l}>
                <b>{l}</b> {lvl}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">CONTACT</p>
          <h2 className="section-title">
            Let&apos;s <span className="grad-text">build</span> something
          </h2>
        </Reveal>
        <div className="contact-grid">
          {CONTACTS.map(([label, text, href, color], i) => (
            <Reveal key={label} delay={i * 70}>
              <a className="contact-card" href={href} target="_blank" rel="noreferrer" style={{ '--accent': color }}>
                <small>{label}</small>
                <strong>{text}</strong>
                <span>↗</span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="cv-cta">
            <a className="btn btn-primary" href="/Babar_Khan_Durrani_CV.pdf" target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© 2026 Babar Khan Durrani</span>
        <span>Built with React · Hosted on GitHub Pages</span>
      </div>
    </footer>
  )
}