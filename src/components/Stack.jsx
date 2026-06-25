import { useEffect, useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Stack.module.css';

const TECH = {
  Frontend: [
    { icon: '⚛️', name: 'React' },
    { icon: '▲',  name: 'Next.js' },
    { icon: '🔷', name: 'TypeScript' },
    { icon: '🌊', name: 'Tailwind CSS' },
    { icon: '🎨', name: 'CSS3' },
  ],
  Backend: [
    { icon: '🟢', name: 'Node.js' },
    { icon: '🚀', name: 'Express.js' },
    { icon: '🔐', name: 'REST APIs' },
  ],
  Database: [
    { icon: '🐘', name: 'PostgreSQL' },
    { icon: '🍃', name: 'MongoDB' },
    { icon: '🔴', name: 'Redis' },
  ],
  'Tools & DevOps': [
    { icon: '🌿', name: 'Git & GitHub' },
    { icon: '🐳', name: 'Docker' },
    { icon: '☁️',  name: 'AWS' },
    { icon: '⚡', name: 'Vite' },
  ],
};

export default function Stack() {
  const labelRef   = useScrollReveal({ threshold: 0.4 });
  const lineRef    = useScrollReveal({ threshold: 0.4 });
  const headingRef = useScrollReveal({ threshold: 0.12 });
  const editorRef  = useScrollReveal({ threshold: 0.12 });
  const badgeContainerRefs = Object.keys(TECH).map(() => useRef(null)); // eslint-disable-line react-hooks/rules-of-hooks

  /* Stagger badges on scroll */
  useEffect(() => {
    badgeContainerRefs.forEach((containerRef) => {
      const container = containerRef.current;
      if (!container) return;
      const badges = container.querySelectorAll('[data-badge]');

      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          badges.forEach((b, i) => {
            setTimeout(() => b.classList.add(styles.badgeVisible), i * 60);
          });
          obs.unobserve(container);
        }
      }, { threshold: 0.2 });

      obs.observe(container);
      return () => obs.disconnect();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="stack" className="section" aria-labelledby="stack-heading">
      <span className={`watermark ${styles.watermark}`} aria-hidden="true">03</span>
      <div className="section-inner">

        <p ref={labelRef} className="section-label">03 / STACK</p>
        <div ref={lineRef} className="line-reveal" aria-hidden="true" />

        <div ref={headingRef} className="reveal" style={{ marginBottom: '52px' }}>
          <h2 className="section-heading" id="stack-heading">Technologies I Work With.</h2>
        </div>

        <div className={styles.groups} role="list" aria-label="Tech stack by category">
          {Object.entries(TECH).map(([category, items], catIdx) => (
            <div key={category} className={styles.group} role="listitem">
              <span className={styles.groupLabel}>{category}</span>
              <div
                className={styles.badgeRow}
                ref={badgeContainerRefs[catIdx]}
              >
                {items.map(item => (
                  <span
                    key={item.name}
                    className={styles.badge}
                    data-badge="true"
                    role="img"
                    aria-label={item.name}
                  >
                    <span className={styles.badgeIcon} aria-hidden="true">{item.icon}</span>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Code editor */}
        <div ref={editorRef} className={`reveal ${styles.editor}`}>
          <div className={styles.editorHeader} aria-hidden="true">
            <span className={`${styles.editorDot} ${styles.red}`} />
            <span className={`${styles.editorDot} ${styles.yellow}`} />
            <span className={`${styles.editorDot} ${styles.green}`} />
            <span className={styles.editorFilename}>developer.js</span>
          </div>
          <pre className={styles.editorBody} role="img" aria-label="Code snippet: developer profile object">
            <span className={styles.comment}>{'// Meet Lodariya — Full Stack Developer'}</span>{'\n\n'}
            <span className={styles.kw}>{'const '}</span>
            <span className={styles.varName}>{'developer'}</span>
            <span className={styles.bracket}>{' = {'}</span>{'\n'}
            {'  '}
            <span className={styles.key}>{'name'}</span>
            <span className={styles.bracket}>{': '}</span>
            <span className={styles.str}>{'"Meet Lodariya"'}</span>
            <span className={styles.bracket}>{','}</span>{'\n'}
            {'  '}
            <span className={styles.key}>{'role'}</span>
            <span className={styles.bracket}>{': '}</span>
            <span className={styles.str}>{'"Full Stack Developer"'}</span>
            <span className={styles.bracket}>{','}</span>{'\n'}
            {'  '}
            <span className={styles.key}>{'focus'}</span>
            <span className={styles.bracket}>{': ['}</span>
            <span className={styles.str}>{'"Frontend"'}</span>
            <span className={styles.bracket}>{', '}</span>
            <span className={styles.str}>{'"Backend"'}</span>
            <span className={styles.bracket}>{', '}</span>
            <span className={styles.str}>{'"Databases"'}</span>
            <span className={styles.bracket}>{'],'}</span>{'\n'}
            {'  '}
            <span className={styles.key}>{'available'}</span>
            <span className={styles.bracket}>{': '}</span>
            <span className={styles.kw}>{'true'}</span>{'\n'}
            <span className={styles.bracket}>{'}'}</span>
          </pre>
        </div>

      </div>
    </section>
  );
}
