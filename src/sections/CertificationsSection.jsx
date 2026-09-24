import { useState } from 'react';
import { certifications } from '../data/certifications';

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState(null);

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
                </>
              ) : (
                <span>Slot 04 — Certificate Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Modal */}
      <div
        className={`cert-modal-overlay ${selectedCert ? 'open' : ''}`}
        onClick={() => setSelectedCert(null)}
        role="dialog"
        aria-modal="true"
        aria-label={selectedCert ? selectedCert.name : 'Certificate Viewer'}
      >
        {selectedCert && (
          <>
            <button
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}
              data-cursor="CLOSE"
            >
              Close [ESC]
            </button>
            <div
              className="cert-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedCert.type === 'pdf' ? (
                <iframe
                  src={selectedCert.image}
                  title={selectedCert.name}
                />
              ) : (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
