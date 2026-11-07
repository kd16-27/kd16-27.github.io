import { useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"
import { animate } from "animejs"
import { ArrowDownRight, ArrowUpRight, Braces, Command, Cpu, Github, Layers3, Network, Radio, Shield, Sparkles, TerminalSquare, X } from "lucide-react"

type Category = "all" | "infrastructure" | "av" | "software"
type Project = {
  number: string
  label: string
  category: Exclude<Category, "all">
  description: string
  stack: string[]
  url: string
  glyph: string
  note: string
}

const projects: Project[] = [
  {
    number: "01", label: "Homelab / Systems Operations", category: "infrastructure",
    description: "Recovered and rebuilt a Dell Precision workstation as a Proxmox hypervisor; configured host networking, Linux LVM-thin virtual-disk storage and disk-health validation alongside a separate Ubuntu/Docker/Ansible service node.",
    stack: ["Proxmox VE", "Linux / LVM", "Docker", "Ansible"],
    url: "https://github.com/kd16-27", glyph: "▣",
    note: "Private source — public overview only",
  },
  {
    number: "02", label: "AV Portfolio Suite", category: "av",
    description: "Hands-on engineering utilities spanning AV commissioning, signal flows, networking, and design-oriented workflows.",
    stack: ["AV Systems", "Python", "Networking"],
    url: "https://github.com/kd16-27/av-portfolio-suite", glyph: "◎",
    note: "Explore the source",
  },
  {
    number: "03", label: "Vector Learning", category: "software",
    description: "A personal learning platform built to organize technical training and support structured professional development.",
    stack: ["Learning Platform", "Development", "Architecture"],
    url: "https://github.com/kd16-27", glyph: "⌘",
    note: "Private source — overview only",
  },
  {
    number: "04", label: "AV Integrity Lab", category: "av",
    description: "A repository of testing and engineering experiments focused on AV reliability and practical validation.",
    stack: ["Testing", "AV", "Python"],
    url: "https://github.com/kd16-27/AV-Integrity-Lab-20260926-175340", glyph: "◈",
    note: "Explore the source",
  },
  {
    number: "05", label: "Cloud Task Suite", category: "software",
    description: "A software project exploring structured automation, cloud-oriented concepts, and maintainable workflows.",
    stack: ["Cloud", "Automation", "Software"],
    url: "https://github.com/kd16-27/cloud-task-suite", glyph: "↗",
    note: "Explore the source",
  },
]

const filters: { value: Category; label: string }[] = [
  { value: "all", label: "All work" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "av", label: "AV engineering" },
  { value: "software", label: "Software" },
]

function Orbit() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const anim = animate(".orbit-scanner", {
      rotate: ["0deg", "360deg"], duration: 24000, loop: true, ease: "linear",
    })
    return () => { anim.pause() }
  }, [reduce])
  return (
    <div className="orbit" aria-label="Decorative engineering orbit visualization" role="img">
      <div className="orbit-grid" />
      <div className="orbit-scale orbit-scale-one" />
      <div className="orbit-scale orbit-scale-two" />
      <div className="orbit-scale orbit-scale-three" />
      <div className="orbit-scanner" />
      <span className="orbit-arrow orbit-arrow-a">01 — SYSTEMS</span>
      <span className="orbit-arrow orbit-arrow-b">02 — SOFTWARE</span>
      <span className="orbit-arrow orbit-arrow-c">03 — DESIGN</span>
      <div className="orbit-core">
        <div className="orbit-core-content"><span className="orbit-core-symbol">KD</span><span>BUILD / TEST<br/>ITERATE</span></div>
      </div>
      <span className="orbit-location">NOVA / 38° N</span>
      <span className="orbit-measure">INTELLIGENCE<br/>IN MOTION</span>
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState<Category>("all")
  const [commandOpen, setCommandOpen] = useState(false)
  const [caseStudy, setCaseStudy] = useState<Project | null>(null)
  const [labMode, setLabMode] = useState(false)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 25, restDelta: .001 })
  const filtered = useMemo(() => projects.filter(p => filter === "all" || p.category === filter), [filter])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes((event.target as HTMLElement)?.tagName || "")) {
        event.preventDefault()
        setCommandOpen(p => !p)
      }
      if (event.key === "Escape") { setCommandOpen(false); setCaseStudy(null) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "instant" : "smooth" })
    setCommandOpen(false)
  }

  return (
    <div className={labMode ? "site lab-mode" : "site"}>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Kaden Diaz, return to top"><span className="logo-icon">K<span className="logo-slash">/</span>D</span><span className="logo-wordmark">KADEN DIAZ<span>ENGINEERING / EXPERIENCE</span></span></a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#thinking">Approach</a><a href="#about">About</a>
        </nav>
        <button className="command-trigger" type="button" onClick={() => setCommandOpen(true)}><Command size={15} /> <span>Explore</span><kbd>/</kbd></button>
      </header>
      <main id="top">
        <section className="hero section-wrap">
          <div className="eyebrow"><span className="live-dot" /> INDEPENDENT ENGINEERING JOURNAL <span className="divider-dot" /> PORTFOLIO / 2026</div>
          <div className="hero-layout">
            <div className="hero-copy">
              <div className="intro-mark">DESIGNING SYSTEMS THAT DON'T JUST WORK.</div>
              <h1><span className="heading-line">I MAKE</span><span className="heading-line highlight-line">COMPLEXITY</span><span className="heading-line heading-outline">FEEL SIMPLE.</span></h1>
              <p className="hero-description">AV systems engineer building at the intersection of <strong>physical infrastructure, intelligent software, and human experience.</strong> From signal flows to autonomous systems, I turn intricate technology into things people can actually use.</p>
              <div className="hero-ctas">
                <button className="solid-cta" type="button" onClick={() => jump("work")}>Explore selected work <ArrowUpRight size={18}/></button>
                <a className="text-cta" href="https://github.com/kd16-27" target="_blank" rel="noreferrer"><Github size={18}/> GitHub profile <ArrowUpRight size={14}/></a>
              </div>
              <div className="hero-index"><span>01 / 04</span><span>SCROLL TO EXPLORE ↓</span></div>
            </div>
            <Orbit />
          </div>
        </section>
        <div className="marquee" aria-label="Engineering focus areas"><div className="marquee-track"><span>AV SYSTEMS</span><b>✳</b><span>AUTOMATION</span><b>✳</b><span>NETWORKING</span><b>✳</b><span>AI / INTELLIGENCE</span><b>✳</b><span>INFRASTRUCTURE</span><b>✳</b><span>AV SYSTEMS</span><b>✳</b><span>AUTOMATION</span><b>✳</b><span>NETWORKING</span><b>✳</b></div></div>

        <section className="work section-wrap" id="work">
          <div className="section-kicker"><span>01 / SELECTED MISSIONS</span><span>THE WORK / THE SYSTEMS / THE DETAILS</span></div>
          <div className="section-heading"><h2>PROOF IS IN<br/><em>THE BUILD.</em></h2><p>Not just certificates and buzzwords. These are tools, experiments and engineering systems with something real behind them.</p></div>
          <div className="project-filter" role="group" aria-label="Filter projects">{filters.map(item => <button key={item.value} type="button" className={filter === item.value ? "active" : ""} onClick={() => setFilter(item.value)}>{item.label}</button>)}</div>
          <div className="project-grid">
            {filtered.map((p, i) =>
              <motion.article key={p.number} className="project-card" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={reduce ? undefined : {opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:i*.08,duration:.45}}>
                <div className="card-top"><span>MISSION {p.number} / {p.category.toUpperCase()}</span><button type="button" onClick={() => setCaseStudy(p)} aria-label={"Read more about "+p.label}><ArrowUpRight size={23}/></button></div>
                <div className="card-glyph" aria-hidden="true"><span>{p.glyph}</span><i/><i/></div>
                <h3>{p.label}</h3><p>{p.description}</p>
                <div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
                <button className="card-foot" type="button" onClick={() => setCaseStudy(p)}>PROJECT DETAILS <ArrowDownRight size={16}/></button>
              </motion.article>
            )}
          </div>
        </section>

        <section className="manifesto" id="thinking">
          <div className="section-wrap manifesto-content">
            <div className="section-kicker"><span>02 / MY APPROACH</span><span>ENGINEERING WITH INTENT</span></div>
            <div className="manifesto-top"><div><span className="tiny-label">TECHNOLOGY IS ONLY AS GOOD AS THE EXPERIENCE IT CREATES.</span><h2>BUILD<br/>THE <i>WHOLE</i><br/>SYSTEM.</h2></div><p>Architecture, interfaces, networking, automation, reliability. I don't see these as separate disciplines. They're all parts of one continuous experience—from a physical connection to a polished user interaction.</p></div>
            <div className="principles">
              <div><Network size={24}/><span>01 / CONNECT</span><h3>Make everything communicate.</h3><p>Protocols, systems, endpoints and the people relying on them.</p></div>
              <div><Shield size={24}/><span>02 / VERIFY</span><h3>Make it measurable.</h3><p>Clear tests, resilient design, monitoring and defensible outcomes.</p></div>
              <div><Sparkles size={24}/><span>03 / ELEVATE</span><h3>Make it worth experiencing.</h3><p>Purposeful motion, intuitive interfaces and thoughtful interaction.</p></div>
            </div>
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="section-kicker"><span>03 / THE OPERATOR</span><span>BACKGROUND / TRAJECTORY</span></div>
          <div className="about-layout">
            <div><h2>ENGINEER.<br/>BUILDER.<br/><span>EVER-CURIOUS.</span></h2><p>I'm Kaden—a systems engineer with experience across professional AV, networking and hands-on infrastructure, continuously stretching into software, cloud and AI. My favorite projects live in the overlap between hardware and code.</p><a className="inline-link" href="https://github.com/kd16-27" target="_blank" rel="noreferrer">Explore my work on GitHub <ArrowUpRight size={17}/></a></div>
            <div className="signal-panel"><div className="signal-title"><span>CAPABILITIES / FIELD NOTES</span><Radio size={17}/></div>
              <div className="signal-row"><Cpu size={20}/><span>Systems engineering & technical integration</span><b>01</b></div>
              <div className="signal-row"><Layers3 size={20}/><span>AV over IP, controls, and DSP workflows</span><b>02</b></div>
              <div className="signal-row"><TerminalSquare size={20}/><span>Linux, Python, DevOps & automation</span><b>03</b></div>
              <div className="signal-row"><Braces size={20}/><span>Web development & intelligent interfaces</span><b>04</b></div>
              <div className="signal-footer"><span>ALWAYS ITERATING</span><button type="button" onClick={() => setLabMode(!labMode)} aria-pressed={labMode}>{labMode ? "STANDARD MODE" : "ACTIVATE LAB MODE"} <span className="toggle-indicator"/></button></div>
            </div>
          </div>
        </section>

        <section className="final-cta section-wrap" id="contact"><div className="section-kicker"><span>04 / WHAT'S NEXT</span><span>OPEN TO BUILDING</span></div><h2>LET'S MAKE<br/><span>SOMETHING</span><br/>IMPOSSIBLE <em>FEEL</em><br/>INEVITABLE.</h2><a href="https://github.com/kd16-27" target="_blank" rel="noreferrer" className="big-link">START A CONVERSATION ON GITHUB <ArrowUpRight size={25}/></a></section>
      </main>
      <footer className="footer section-wrap"><div className="footer-logo">KD<span> / BUILT WITH INTENT.</span></div><span>© {new Date().getFullYear()} KADEN DIAZ · EXPERIMENTAL PORTFOLIO</span><div><a href="https://github.com/kd16-27" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></div></footer>

      {commandOpen && <div className="modal-backdrop" onMouseDown={(e) => {if(e.target===e.currentTarget)setCommandOpen(false)}}><section className="command-modal" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="command-top"><Command size={20}/><strong>QUICK NAVIGATION</strong><button type="button" onClick={() => setCommandOpen(false)} aria-label="Close"><X size={18}/></button></div>{[["Selected work","work"],["My approach","thinking"],["About Kaden","about"],["Contact / GitHub","contact"]].map(([label,id])=><button className="command-option" key={id} type="button" onClick={()=>jump(id)}>{label}<ArrowUpRight size={17}/></button>)}<p>PRESS ESC TO CLOSE · PRESS / TO OPEN</p></section></div>}
      {caseStudy && <div className="modal-backdrop" onMouseDown={(e) => {if(e.target===e.currentTarget)setCaseStudy(null)}}><section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title"><div className="case-top"><span>MISSION {caseStudy.number} / PROJECT OVERVIEW</span><button type="button" onClick={()=>setCaseStudy(null)} aria-label="Close case study"><X size={20}/></button></div><div className="case-symbol">{caseStudy.glyph}</div><h2 id="case-title">{caseStudy.label}</h2><p>{caseStudy.description}</p><div className="tags">{caseStudy.stack.map(s=><span key={s}>{s}</span>)}</div><div className="case-note">{caseStudy.note}</div><a className="solid-cta" href={caseStudy.url} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={18}/></a></section></div>}
    </div>
  )
}

export default App
