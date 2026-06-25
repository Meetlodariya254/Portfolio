import useActiveSection from '../hooks/useActiveSection';
import styles from './DotNav.module.css';

const DOTS = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'stack',    label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
];

export default function DotNav() {
  const active = useActiveSection(DOTS.map(d => d.id));

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.dotNav} aria-label="Section dot navigation">
      {DOTS.map(dot => (
        <button
          key={dot.id}
          className={`${styles.dotItem} ${active === dot.id ? styles.dotActive : ''}`}
          onClick={() => scrollTo(dot.id)}
          aria-label={`Navigate to ${dot.label}`}
          title={dot.label}
        >
          <span className={styles.dotLabel}>{dot.label}</span>
          <span className={styles.dot} />
        </button>
      ))}
    </nav>
  );
}
