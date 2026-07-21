import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'proj-1',
    num: '01',
    title: 'Hardware Shop Inventory System',
    desc: 'Full-stack, offline-first Electron desktop application for managing hardware shop inventory, billing, and stock tracking.',
    stack: ['React', 'Electron', 'Node.js', 'SQLite'],
    url: 'github.com/Meetlodariya254/hardware-shop-ims',
    accentColor: '#3B82F6',
    gradientFrom: '#0f172a',
    gradientTo: '#1e1b4b',
    image: '/src/assets/hardware-shop.png',
    liveUrl: 'https://github.com/Meetlodariya254/hardware-shop-ims',
    githubUrl: 'https://github.com/Meetlodariya254/hardware-shop-ims',
  },
  {
    id: 'proj-2',
    num: '02',
    title: 'EventFlow — AI Event Scheduler',
    desc: 'Intelligent event scheduling platform featuring automated WhatsApp reminders and AI-driven voice call fallbacks via Twilio.',
    stack: ['React', 'Vite', 'Node.js', 'Twilio API'],
    url: 'eventflow-agent.vercel.app',
    accentColor: '#10b981',
    gradientFrom: '#0f1a0f',
    gradientTo: '#1a2e1a',
    image: '/src/assets/eventflow.png',
    liveUrl: 'https://eventflow-agent.vercel.app',
    githubUrl: 'https://github.com/Meetlodariya254/EventFlow',
  },
  {
    id: 'proj-3',
    num: '03',
    title: 'Robuzta Techlabs Website',
    desc: 'A modern, responsive website built for Robuzta Techlabs to showcase their IT services and solutions.',
    stack: ['HTML5', 'Vanilla CSS', 'Vanilla JS', 'Three.js'],
    url: 'robuzta-techlabs-website.vercel.app',
    accentColor: '#a855f7',
    gradientFrom: '#1a0f1a',
    gradientTo: '#2e1a2e',
    image: '/src/assets/robuzta-techlabs.png',
    liveUrl: 'https://robuzta-techlabs-website.vercel.app',
    githubUrl: 'https://github.com/Meetlodariya254/robuzta-techlabs-website',
  },
  {
    id: 'proj-4',
    num: '04',
    title: 'Luxury Photography Studio Showcase',
    desc: 'Ultra-premium interactive 3D portfolio and creative showcase designed for high-end photography studios with custom WebGL elements.',
    stack: ['Three.js', 'GSAP', 'Vite', 'Vanilla JS'],
    url: 'luxury-studio-showcase.vercel.app',
    accentColor: '#f59e0b',
    gradientFrom: '#1a140f',
    gradientTo: '#2e2318',
    image: '/src/assets/luxury-studio.png',
    liveUrl: 'https://luxury-studio-showcase.vercel.app',
    githubUrl: 'https://github.com/Meetlodariya254/luxury-studio-showcase',
  },
];



function ProjectCard({ project, delay }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add(styles.cardVisible), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -7;
    const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  7;
    setTilt({ x: rx, y: ry });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <article
      ref={ref}
      className={styles.card}
      style={{
        transform: hovered
          ? `translateY(-6px) perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)',
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      aria-labelledby={`${project.id}-title`}
    >
      {/* Browser mockup */}
      <div className={styles.browser}>
        <div className={styles.browserBar} aria-hidden="true">
          <span className={`${styles.bDot} ${styles.bRed}`} />
          <span className={`${styles.bDot} ${styles.bYellow}`} />
          <span className={`${styles.bDot} ${styles.bGreen}`} />
          <span className={styles.bUrl}>{project.url}</span>
        </div>
        <div className={styles.browserBody}>
          <img src={project.image} alt={project.title} className={styles.projectImage} />
        </div>
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <p className={styles.num}>Project {project.num}</p>
        <h3 className={styles.title} id={`${project.id}-title`}>{project.title}</h3>
        <p className={styles.desc}>{project.desc}</p>
        <div className={styles.badges}>
          {project.stack.map(s => (
            <span key={s} className={styles.badge}>{s}</span>
          ))}
        </div>
        <div className={styles.actions}>
          <a
            href={project.liveUrl}
            className={`${styles.btn} ${styles.btnPrimary}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${project.title}`}
          >
            Live Demo ↗
          </a>
          <a
            href={project.githubUrl}
            className={`${styles.btn} ${styles.btnSecondary}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repo of ${project.title}`}
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const labelRef   = useScrollReveal({ threshold: 0.4 });
  const lineRef    = useScrollReveal({ threshold: 0.4 });
  const headingRef = useScrollReveal({ threshold: 0.12 });

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <span className={`watermark ${styles.watermark}`} aria-hidden="true">04</span>
      <div className="section-inner">

        <p ref={labelRef} className="section-label">04 / PROJECTS</p>
        <div ref={lineRef} className="line-reveal" aria-hidden="true" />

        <div ref={headingRef} className={`reveal ${styles.headingRow}`}>
          <h2 className="section-heading" id="projects-heading">Featured Projects.</h2>
        </div>

        <div className={styles.grid} role="list" aria-label="Featured projects">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 120} />
          ))}
        </div>

      </div>
    </section>
  );
}
