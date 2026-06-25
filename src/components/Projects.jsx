import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'proj-1',
    num: '01',
    title: 'Inventory Management System',
    desc: 'Track products, manage stock and generate real-time reports.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    url: 'inventory-app.vercel.app',
    accentColor: '#3B82F6',
    gradientFrom: '#0f172a',
    gradientTo: '#1e1b4b',
    preview: 'blue',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-2',
    num: '02',
    title: 'Event Management Platform',
    desc: 'Create events, sell tickets and track attendance in real time.',
    stack: ['React', 'Express', 'MongoDB'],
    url: 'eventpro.vercel.app',
    accentColor: '#10b981',
    gradientFrom: '#0f1a0f',
    gradientTo: '#1a2e1a',
    preview: 'green',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-3',
    num: '03',
    title: 'Coaching Class Management System',
    desc: 'Student tracking, fee management and performance reports.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    url: 'coachpro.vercel.app',
    accentColor: '#a855f7',
    gradientFrom: '#1a0f1a',
    gradientTo: '#2e1a2e',
    preview: 'purple',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-4',
    num: '04',
    title: 'Task Management App',
    desc: 'Kanban boards, team collaboration and deadline tracking.',
    stack: ['React', 'TypeScript', 'MongoDB'],
    url: 'taskflow.vercel.app',
    accentColor: '#f59e0b',
    gradientFrom: '#0f1a2e',
    gradientTo: '#1a2e3a',
    preview: 'kanban',
    liveUrl: '#',
    githubUrl: '#',
  },
];

/* Dashboard wireframe preview by type */
function DashboardPreview({ type, accentColor }) {
  if (type === 'kanban') {
    return (
      <div className={styles.kanban}>
        {[
          { col: accentColor, cards: 2 },
          { col: '#3B82F6',   cards: 3 },
          { col: '#10b981',   cards: 1 },
        ].map((col, ci) => (
          <div key={ci} className={styles.kanbanCol}>
            <div className={styles.kanbanHeader} style={{ background: `${col.col}33` }} />
            {Array.from({ length: col.cards }).map((_, i) => (
              <div key={i} className={styles.kanbanCard} style={{ background: `${col.col}14` }} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.dashPreview}>
      <div className={styles.dashTopbar}>
        <div className={styles.dashDot} style={{ background: accentColor }} />
        <div className={styles.dashBar} />
      </div>
      <div className={styles.dashRow}>
        <div className={styles.dashSidebar} style={{ background: `${accentColor}0d` }} />
        <div className={styles.dashMain}>
          <div className={styles.dashCards}>
            {[0.18, 0.12, 0.09].map((op, i) => (
              <div key={i} className={styles.dashCard} style={{ background: `${accentColor}${Math.round(op * 255).toString(16).padStart(2, '0')}` }} />
            ))}
          </div>
          {[90, 72, 84, 60].map((w, i) => (
            <div key={i} className={styles.dashRow2} style={{ width: `${w}%`, background: `${accentColor}14` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

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
        <div
          className={styles.browserBody}
          style={{ background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)` }}
        >
          <DashboardPreview type={project.preview} accentColor={project.accentColor} />
          <div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ''}`}>
            <span className={styles.overlayText}>VIEW PROJECT →</span>
          </div>
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
