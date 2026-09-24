import { education } from '../data/personal';

export default function EducationSection() {
  return (
    <section className="education" id="education" aria-label="Education History">
      <div className="section-label">
        <span className="section-number">04</span> Academic Background
      </div>

      <h2 className="education-header">Education</h2>

      <div className="edu-list">
        {education.map((edu, idx) => (
          <div key={idx} className="edu-item" data-cursor="ACADEMIC">
            <div className="edu-period">{edu.period}</div>
            <div className="edu-content">
              <h3>{edu.institution}</h3>
              {edu.location && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                  {edu.location}
                </div>
              )}
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-score">{edu.score}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
