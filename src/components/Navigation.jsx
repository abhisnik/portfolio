import { useState, useCallback } from 'react';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <a
          href="#"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          data-cursor="HOME"
        >
          A.K.P
        </a>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                data-cursor={link.label.toUpperCase()}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div
        className={`nav-mobile-overlay ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
