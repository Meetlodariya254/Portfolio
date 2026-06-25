import { useEffect, useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './About.module.css';

function CountUp({ target, suffix = '', duration = 1200 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      function frame(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      observer.unobserve(el);
    }, { threshold: 0.6 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
  { count: 2,   suffix: '+', label: 'Years Learning' },
  { count: 5,   suffix: '+', label: 'Projects Built' },
  { count: 100, suffix: '%', label: 'Satisfaction' },
];

export default function About() {
  const labelRef    = useScrollReveal({ threshold: 0.4 });
  const lineRef     = useScrollReveal({ threshold: 0.4 });
  const leftRef     = useScrollReveal({ threshold: 0.12 });
  const rightRef    = useScrollReveal({ threshold: 0.12 });

  /* Staggered stat cards */
  const statRefs = STATS.map(() => useRef(null)); // eslint-disable-line react-hooks/rules-of-hooks

  useEffect(() => {
    statRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('revealed'), i * 120);
          obs.unobserve(el);
        }
      }, { threshold: 0.15 });
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <span className={`watermark ${styles.watermark}`} aria-hidden="true">02</span>
      <div className="section-inner">

        <p ref={labelRef} className="section-label">02 / ABOUT</p>
        <div ref={lineRef} className="line-reveal" aria-hidden="true" />

        <div className={styles.grid}>
          <div ref={leftRef} className={`reveal-left ${styles.left}`}>
            <h2 className={styles.heading} id="about-heading">
              I love turning ideas into{' '}
              <span className={styles.highlight}>real world</span> products.
            </h2>
          </div>

          <div ref={rightRef} className={`reveal-right ${styles.right}`}>
            <p>
              I'm a passionate <strong>Full Stack Developer</strong> who enjoys building
              clean, scalable and user-focused web applications. I specialize in modern
              JavaScript ecosystems and love creating smooth experiences.
            </p>
            <p>
              From idea to deployment, I focus on writing <strong>clean code</strong>,
              optimizing performance, and delivering products that look great and work
              even better. I'm always learning and pushing the boundaries of what's
              possible on the web.
            </p>
            <a
              href="#"
              className={`btn btn-outline ${styles.resumeBtn}`}
              id="btn-resume-about"
              onClick={e => e.preventDefault()}
              aria-label="Download resume"
            >
              DOWNLOAD RESUME →
            </a>
          </div>
        </div>

        <div className={styles.statGrid} role="list" aria-label="Experience statistics">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              ref={statRefs[i]}
              className={`stat-card ${styles.statCard}`}
              role="listitem"
            >
              <div className={styles.statNumber}>
                <CountUp target={s.count} suffix={s.suffix} />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
