import { useState, useEffect, useCallback } from 'react';
import { certifications } from '../data/certifications';

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleClose = useCallback(() => {
    setSelectedCert(null);
    if (window.location.hash === '#view-certificate') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    if (!selectedCert) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    // Handle browser back button and hash changes
    const handlePopState = () => {
      setSelectedCert(null);
    };

    // Close modal if user clicks any navigation link
    const handleNavClick = (e) => {
      if (e.target.closest('a[href^="#"], .nav-logo, .nav-links a, .nav-mobile-overlay a')) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    document.addEventListener('click', handleNavClick);

    // Push state so browser Back button closes modal rather than leaving it stuck
    window.history.pushState({ modal: 'cert' }, '', window.location.pathname + '#view-certificate');

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      document.removeEventListener('click', handleNavClick);
    };
  }, [selectedCert, handleClose]);

  return (
    <>
      <section className="certifications" id="certifications" aria-label="Certifications">
        <div className="section-label">
          <span className="section-number">05</span> Verification
        </div>

        <h2 className="cert-header">Certifications</h2>

        <div className="cert-grid">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`cert-card ${cert.type === 'placeholder' ? 'cert-card-placeholder' : ''}`}
              onClick={() => cert.image && setSelectedCert(cert)}
              data-cursor={cert.image ? 'VIEW CERT' : 'UPCOMING'}
              role={cert.image ? 'button' : undefined}
              tabIndex={cert.image ? 0 : undefined}
              onKeyDown={(e) => {
                if (cert.image && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
              aria-label={cert.image ? `Open certificate: ${cert.name}` : undefined}
            >
              {cert.type !== 'placeholder' ? (
                <>
                  <div className="cert-card-num">0{cert.id}</div>
                  <h3 className="cert-card-name">{cert.name}</h3>
                  <div className="cert-card-issuer">{cert.issuer}</div>
                  {cert.date && <div className="cert-card-date">{cert.date}</div>}
                  <div className="cert-card-action">
                    <span>View Document ↗</span>
                  </div>
                </>
              ) : (
                <span>Slot 04 — Certificate Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="cert-modal-overlay open"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.name}
        >
          <div
            className="cert-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="cert-modal-header">
              <div className="cert-modal-header-info">
                <span className="cert-modal-tag">0{selectedCert.id} · Verification</span>
                <h3 className="cert-modal-title">{selectedCert.name}</h3>
                <div className="cert-modal-meta">
                  <span className="cert-modal-issuer">{selectedCert.issuer}</span>
                  {selectedCert.date && (
                    <>
                      <span className="cert-modal-dot">·</span>
                      <span className="cert-modal-date">{selectedCert.date}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="cert-modal-actions">
                {selectedCert.image && (
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-modal-btn cert-modal-btn-ext"
                    data-cursor="OPEN"
                    title="Open full document in new browser tab"
                  >
                    Open in New Tab ↗
                  </a>
                )}
                <button
                  className="cert-modal-btn cert-modal-btn-close"
                  onClick={handleClose}
                  data-cursor="CLOSE"
                  aria-label="Close certificate modal"
                >
                  ✕ Close [ESC]
                </button>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="cert-modal-body">
              {selectedCert.type === 'pdf' ? (
                <div className="cert-iframe-container">
                  <iframe
                    src={`${selectedCert.image}#toolbar=1&navpanes=0`}
                    title={selectedCert.name}
                    className="cert-pdf-iframe"
                  />
                  <div className="cert-fallback-bar">
                    <span>Viewing PDF Document</span>
                    <a
                      href={selectedCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download / Open Fullscreen ↗
                    </a>
                  </div>
                </div>
              ) : (
                <div className="cert-image-container">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    className="cert-modal-img"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
