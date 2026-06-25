import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <p>
        &copy; 2026{' '}
        <span className={styles.accent}>Meet Lodariya</span>
        {' '}&middot;{' '}Built with <span className={styles.accent}>passion</span>.
      </p>
    </footer>
  );
}
