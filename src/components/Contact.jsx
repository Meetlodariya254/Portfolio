import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Contact.module.css';

/* ── EmailJS config from .env ─────────────────────────────────────── */
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ── SVG Icons ────────────────────────────────────────────────────── */
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
        0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
        1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
        7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782
        13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0
        1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24
        22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* Icon map */
const ICON_MAP = { email: EmailIcon, linkedin: LinkedInIcon, github: GitHubIcon };

/* ── Contact info cards ───────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    id: 'email',
    label: 'Email',
    value: 'meetlodariya60@gmail.com',
    // Opens Gmail compose window directly in browser
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=meetlodariya60@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/meet-lodariya',
    href: 'https://linkedin.com/in/meet-lodariya-12065231a',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/Meetlodariya254',
    href: 'https://github.com/Meetlodariya254',
  },
];

/* ── Headline with line-by-line reveal ───────────────────────────── */
function ContactHeadline() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lines = ["LET'S BUILD", 'SOMETHING', 'AMAZING'];

  return (
    <h2 ref={ref} className={styles.headline} id="contact-heading"
      aria-label="Let's Build Something Amazing">
      {lines.map((line, i) => (
        <span key={line} className={styles.line}>
          <span
            className={`${styles.lineInner} ${i === 2 ? styles.amazing : ''} ${revealed ? styles.lineRevealed : ''}`}
            style={{ transitionDelay: revealed ? `${i * 0.13}s` : '0s' }}
          >
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}

/* ── Contact Form ─────────────────────────────────────────────────── */
function ContactForm() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      const lower = form.email.trim().toLowerCase();
      if (lower.includes('meetlodariya60') || lower.includes('meetlodariya254')) {
        newErrors.email = 'Please use your own email address, not mine.';
      }
    }
    if (!form.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Please enter your message.';
    }
    return newErrors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors(errs => ({ ...errs, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    /* ── Validate EmailJS env vars ── */
    if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY ||
        EJS_SERVICE.includes('your_') || EJS_TEMPLATE.includes('your_') || EJS_KEY.includes('your_')) {
      /* Fallback: open Gmail compose with pre-filled body */
      const gmailUrl =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=meetlodariya60@gmail.com` +
        `&su=${encodeURIComponent(form.subject || 'Portfolio Inquiry')}` +
        `&body=${encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        )}`;
      window.open(gmailUrl, '_blank');
      setStatus('idle');
      return;
    }

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:  form.name,
          from_email: form.email,
          user_name:  form.name,
          user_email: form.email,
          name:       form.name,
          email:      form.email,
          subject:    form.subject,
          message:    form.message,
          to_name:    'Meet Lodariya',
          to_email:   'meetlodariya60@gmail.com',
          reply_to:   form.email,
        },
        EJS_KEY
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try emailing directly.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}
      noValidate aria-label="Contact form">

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
          placeholder="Project Inquiry / Job Offer / Collaboration"
          value={form.subject}
          onChange={handleChange}
          required
        />
        {errors.subject && <span className={styles.fieldError}>{errors.subject}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder="Tell me about your project, timeline, and budget..."
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
        />
        {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${styles.submitBtn}`}
        disabled={status === 'sending' || status === 'sent'}
        id="btn-send-message"
      >
        {status === 'idle'    && 'SEND MESSAGE →'}
        {status === 'sending' && (
          <><span className={styles.spinner} aria-hidden="true" /> SENDING...</>
        )}
        {status === 'sent'   && '✓ MESSAGE SENT!'}
        {status === 'error'  && 'TRY AGAIN →'}
      </button>
      {status === 'sent' && (
        <p className={styles.successMsg} role="status" aria-live="polite">
          🎉 Thanks for reaching out! I'll get back to you within 24 hours.
        </p>
      )}
      {status === 'error' && (
        <p className={styles.errorMsg} role="alert" aria-live="polite">
          ⚠️ {errorMsg}
        </p>
      )}
    </form>
  );
}

/* ── Main Contact Section ─────────────────────────────────────────── */
export default function Contact() {
  const labelRef    = useScrollReveal({ threshold: 0.4 });
  const lineRef     = useScrollReveal({ threshold: 0.4 });
  const subtitleRef = useScrollReveal({ threshold: 0.12 });
  const cardsRef    = useScrollReveal({ threshold: 0.12 });
  const formRef     = useScrollReveal({ threshold: 0.08 });

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <span className={`watermark ${styles.watermark}`} aria-hidden="true">05</span>
      <div className="section-inner">

        <p ref={labelRef} className="section-label">05 / CONTACT</p>
        <div ref={lineRef} className="line-reveal" aria-hidden="true" />

        <div className={styles.inner}>

          {/* Left: headline + info cards */}
          <div className={styles.leftCol}>
            <ContactHeadline />

            <p ref={subtitleRef} className={`reveal ${styles.subtitle}`}>
              Have a project in mind or want to hire me? I'd love to hear about it.
            </p>

            <div ref={cardsRef} className={`reveal ${styles.cards}`}>
              {CONTACT_INFO.map(info => {
                const Icon = ICON_MAP[info.id];
                return (
                  <a
                    key={info.id}
                    href={info.href}
                    id={`contact-${info.id}`}
                    className={styles.card}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.cardIcon}>
                      <Icon />
                    </span>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardLabel}>{info.label}</span>
                      <span className={styles.cardValue}>{info.value}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: contact form */}
          <div ref={formRef} className={`reveal ${styles.rightCol}`}>
            <h3 className={styles.formTitle}>Send a Message</h3>
            <p className={styles.formSubtitle}>Fill in the form and I'll respond within 24 hours.</p>
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
