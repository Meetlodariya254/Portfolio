import { useState, useEffect } from 'react';
import useActiveSection from '../hooks/useActiveSection';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const SECTION_IDS = ['hero', 'about', 'stack', 'projects', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <a href="#hero" className={styles.logo} onClick={e => scrollTo(e, '#hero')} aria-label="Meet Lodariya — Home">
          M<span className={styles.logoDot}>.</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {NAV_LINKS.map(link => {
            const sectionId = link.href.replace('#', '');
            const isActive = active === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={e => scrollTo(e, link.href)}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Hire Me CTA */}
        <a
          href="#contact"
          className={`btn btn-hire ${styles.hireBtn}`}
          onClick={e => scrollTo(e, '#contact')}
          id="navbar-hire-me"
          aria-label="Hire Meet Lodariya"
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          id="hamburger-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={e => scrollTo(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className={`btn btn-primary ${styles.mobileHireBtn}`}
          onClick={e => scrollTo(e, '#contact')}
        >
          Hire Me
        </a>
      </div>
    </>
  );
}
