import { skills } from '../data/personal';

export default function SkillsSection() {
  return (
    <section className="skills" id="skills" aria-label="Skills & Expertise">
      <div className="section-label">
        <span className="section-number">02</span> Technical Foundation
      </div>

      <h2 className="skills-header">Skills &amp; Capabilities</h2>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-group" data-cursor="STACK">
            <h3 className="skill-group-title">{category}</h3>
            <div className="skill-items">
              {items.map((skill) => (
                <span key={skill} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
