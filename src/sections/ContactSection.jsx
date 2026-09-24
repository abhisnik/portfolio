import { socials } from '../data/personal';

export default function ContactSection() {
  return (
    <section className="contact" id="contact" aria-label="Contact Information">
      <div className="section-label">
        <span className="section-number">06</span> Connection
      </div>

      <h2 className="contact-heading">
        Let&apos;s build<br />
        <em>something</em><br />
        functional.
      </h2>

      <div className="contact-links">
        {socials.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target={item.url.startsWith('http') ? '_blank' : undefined}
            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="contact-link"
            data-cursor={item.cursorText}
          >
            <span className="contact-link-label">{item.name}</span>
            <span className="contact-link-value">{item.label || item.url.replace('https://', '')}</span>
          </a>
        ))}
      </div>

      <a
        href={`${import.meta.env.BASE_URL}assets/resume/resume.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-resume"
        data-cursor="RESUME"
        onClick={(e) => {
          // Graceful fallback if resume.pdf is not present yet
          fetch(`${import.meta.env.BASE_URL}assets/resume/resume.pdf`, { method: 'HEAD' })
            .then((res) => {
              if (!res.ok) {
                e.preventDefault();
                alert('Resume is currently being updated. Please check back soon or reach out directly!');
              }
            })
            .catch(() => {
              e.preventDefault();
              alert('Resume is currently being updated. Please check back soon or reach out directly!');
            });
        }}
      >
        Download Resume [PDF] ↓
      </a>
    </section>
  );
}
