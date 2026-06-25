import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const PHRASES = [
  'Full Stack Web Developer',
  'React & Node.js Expert',
  'UI/UX Enthusiast',
  'Problem Solver',
];

const NAME_FIRST = 'MEET';
const NAME_LAST  = 'LODARIYA';

/* Split a word string into animated char spans */
function SplitName({ chars, baseDelay }) {
  return chars.split('').map((ch, i) => (
    <span
      key={i}
      className={styles.char}
      style={{ animationDelay: `${(baseDelay + i * 0.06).toFixed(2)}s` }}
    >
      {ch}
    </span>
  ));
}

export default function Hero() {
  const glowRef = useRef(null);
  const heroRef = useRef(null);
  const [typed, setTyped] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  /* Mouse-following glow */
  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top  = (e.clientY - r.top) + 'px';
    };

    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  /* Typing animation */
  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let timeout;

    if (deleting) {
      if (charIdx === 0) {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % PHRASES.length);
        timeout = setTimeout(() => {}, 400);
      } else {
        timeout = setTimeout(() => {
          setCharIdx(i => i - 1);
          setTyped(phrase.slice(0, charIdx - 1));
        }, 40);
      }
    } else {
      if (charIdx === phrase.length) {
        timeout = setTimeout(() => setDeleting(true), 2000);
      } else {
        timeout = setTimeout(() => {
          setCharIdx(i => i + 1);
          setTyped(phrase.slice(0, charIdx + 1));
        }, 80);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} ref={heroRef} aria-labelledby="hero-name">
      {/* Grid lines */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Mouse glow */}
      <div className={styles.glow} ref={glowRef} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.label} aria-hidden="true">HELLO, I'M</p>

        <h1 className={styles.name} id="hero-name" aria-label="Meet Lodariya">
          <SplitName chars={NAME_FIRST} baseDelay={0.5} />
          <span className={styles.nameSpace}>&nbsp;</span>
          <SplitName chars={NAME_LAST} baseDelay={0.5 + NAME_FIRST.length * 0.06 + 0.06} />
        </h1>

        <div className={styles.typingRow} aria-live="polite">
          <span className={styles.typingText}>{typed}</span>
          <span className={styles.typingCursor} aria-hidden="true" />
        </div>

        <p className={styles.desc}>
          I build modern, scalable and high-performance web applications that help businesses work smarter, faster, and better.
        </p>

        <div className={styles.buttons}>
          <button
            className="btn btn-primary"
            onClick={() => scrollTo('projects')}
            id="btn-explore"
          >
            EXPLORE MY WORK <span aria-hidden="true">→</span>
          </button>
          <button
            className="btn btn-outline"
            id="btn-resume"
            onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
          >
            DOWNLOAD RESUME
          </button>
        </div>

        <div className={styles.stats} role="list" aria-label="Quick stats">
          <div className={styles.stat} role="listitem">
            <span className={styles.statValue}>2+</span>
            <span className={styles.statLabel}>Years Exp.</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.stat} role="listitem">
            <span className={styles.statValue}>5+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.statDivider} aria-hidden="true" />
          <div className={styles.stat} role="listitem">
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>Dedication</span>
          </div>
        </div>
      </div>

      {/* Scroll arrow */}
      <button
        className={styles.scrollArrow}
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollIcon} aria-hidden="true" />
      </button>
    </section>
  );
}
