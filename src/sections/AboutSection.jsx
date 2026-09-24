export default function AboutSection() {
  const interests = [
    'Software Development',
    'Artificial Intelligence',
    'Full-Stack Development',
    'Data Structures & Algorithms',
    'Databases',
    'Computer Networks',
    'IoT',
    'AI Integration',
  ];

  return (
    <section className="about" id="about" aria-label="About Abhishek">
      <div className="about-text-block">
        <div className="section-label">
          <span className="section-number">01</span> About
        </div>

        <h2>
          Building <em>ideas</em> into functional digital systems.
        </h2>

        <p className="about-description">
          B.Tech Computer Science &amp; Engineering student at Lovely Professional
          University with a focus on building full-stack applications, AI-powered
          tools, and interactive technology solutions. Driven by problem-solving,
          clean code, and emerging technologies.
        </p>

        <div className="about-interests">
          {interests.map((interest) => (
            <span key={interest} data-cursor="FOCUS">
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="about-image-block" data-cursor="VIEW">
        <img
          src={`${import.meta.env.BASE_URL}assets/images/profile.jpg`}
          alt="Abhishek Kumar Pramanik"
          loading="lazy"
        />
        <div className="about-image-border" />
        <div className="about-image-label">Abhishek Kumar Pramanik</div>
      </div>
    </section>
  );
}
