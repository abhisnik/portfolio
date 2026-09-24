import fs from 'fs';
import path from 'path';

const rootDir = 'C:\\Users\\Abhishek\\portfolio';

// Read and convert assets to Base64 data URIs
function getBase64DataUri(relPath, mimeType) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const fileBuffer = fs.readFileSync(fullPath);
    return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
  }
  console.warn(`File not found: ${fullPath}`);
  return '';
}

const photoB64 = getBase64DataUri('public/assets/images/profile.jpg', 'image/jpeg');
const certTechVedaB64 = getBase64DataUri('public/assets/certificates/cert-techveda-etm.png', 'image/png');
const certInfosysB64 = getBase64DataUri('public/assets/certificates/cert-infosys-cloud.pdf', 'application/pdf');
const certSailorB64 = getBase64DataUri('public/assets/certificates/cert-sailor-data.pdf', 'application/pdf');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Abhishek Kumar Pramanik — Computer Science &amp; AI Systems</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <style>
  :root {
    --bg: #0a0a0a;
    --bg-elevated: #121212;
    --bg-surface: #181818;
    --text-primary: #e8e4df;
    --text-secondary: #8e8a84;
    --text-muted: #56534f;
    --accent: #c8ff00;
    --accent-dim: rgba(200, 255, 0, 0.08);
    --border: rgba(255, 255, 255, 0.07);
    --border-hover: rgba(200, 255, 0, 0.4);
    --font-heading: 'Space Grotesk', -apple-system, sans-serif;
    --font-mono: 'Space Mono', monospace;
    color-scheme: dark;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--bg);
    color: var(--text-primary);
    font-family: var(--font-heading);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }

  /* Background Canvas */
  #webgl-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
  }

  /* Noise texture */
  .noise {
    position: fixed;
    inset: 0;
    z-index: 999;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  /* Custom Cursor */
  .cursor-dot, .cursor-ring {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s ease, width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
  }
  .cursor-dot {
    width: 6px;
    height: 6px;
    background: #ffffff;
  }
  .cursor-ring {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255,255,255,0.4);
  }
  body.hovering .cursor-ring {
    width: 70px;
    height: 70px;
    border-color: var(--accent);
  }
  body.hovering .cursor-dot {
    opacity: 0;
  }
  .cursor-text {
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #fff;
    transform: translate(-50%, 25px);
    opacity: 0;
    transition: opacity 0.2s ease;
    mix-blend-mode: difference;
  }
  body.hovering .cursor-text {
    opacity: 1;
  }

  /* Nav */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.5rem clamp(1.5rem, 5vw, 4rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    letter-spacing: 0.2em;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .nav-logo:hover {
    color: var(--accent);
  }
  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  .nav-links a {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .nav-links a:hover {
    color: var(--accent);
  }

  /* Main Content Container */
  main {
    position: relative;
    z-index: 1;
  }

  section {
    padding: clamp(5rem, 12vh, 9rem) clamp(1.5rem, 6vw, 6rem);
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .section-tag::before {
    content: '';
    width: 30px;
    height: 1px;
    background: var(--accent);
  }

  /* Hero */
  .hero-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: clamp(4rem, 10vh, 7rem);
    position: relative;
  }
  .hero-title {
    font-size: clamp(3rem, 9vw, 8rem);
    font-weight: 500;
    line-height: 0.95;
    letter-spacing: -0.04em;
    color: var(--text-primary);
    margin-bottom: 2rem;
  }
  .hero-sub {
    font-family: var(--font-mono);
    font-size: clamp(0.75rem, 1.4vw, 0.9rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .hero-sub::before {
    content: '';
    width: 40px;
    height: 1px;
    background: var(--text-muted);
  }
  .scroll-indicator {
    position: absolute;
    right: clamp(1.5rem, 6vw, 6rem);
    bottom: clamp(4rem, 10vh, 7rem);
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-muted);
    writing-mode: vertical-rl;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .scroll-indicator::after {
    content: '';
    width: 1px;
    height: 45px;
    background: var(--text-muted);
    animation: pulseLine 2s infinite ease-in-out;
  }
  @keyframes pulseLine {
    0%, 100% { transform: scaleY(0.4); opacity: 0.3; }
    50% { transform: scaleY(1); opacity: 1; }
  }

  /* About */
  .about-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(3rem, 6vw, 6rem);
    align-items: center;
  }
  .about-heading {
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.15;
    margin-bottom: 2rem;
  }
  .about-heading em {
    font-style: italic;
    color: var(--accent);
  }
  .about-text {
    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
  .interest-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  .interest-tag {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.45rem 0.9rem;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    transition: all 0.3s ease;
  }
  .interest-tag:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  .photo-frame {
    position: relative;
    aspect-ratio: 3/4;
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.2) contrast(1.05);
    transition: filter 0.5s ease;
  }
  .photo-frame:hover img {
    filter: grayscale(0) contrast(1);
  }
  .photo-caption {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #fff;
    background: rgba(0,0,0,0.6);
    padding: 0.3rem 0.6rem;
    backdrop-filter: blur(8px);
  }

  /* Skills */
  .skills-title {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 300;
    margin-bottom: 3.5rem;
  }
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  .skill-box {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    padding: 2rem;
    transition: border-color 0.3s ease;
  }
  .skill-box:hover {
    border-color: var(--accent);
  }
  .skill-box-title {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--border);
  }
  .skill-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .skill-pill {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  .skill-pill::after {
    content: '·';
    margin-left: 0.5rem;
    color: var(--text-muted);
  }
  .skill-pill:last-child::after {
    display: none;
  }

  /* Projects */
  .projects-title {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 300;
    margin-bottom: 3.5rem;
  }
  .project-row {
    border-top: 1px solid var(--border);
    padding: 3rem 0;
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: 2rem;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s ease, padding 0.3s ease;
  }
  .project-row:last-child {
    border-bottom: 1px solid var(--border);
  }
  .project-row:hover {
    background: var(--bg-elevated);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .p-num {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--accent);
  }
  .p-name {
    font-size: clamp(1.6rem, 3.5vw, 2.5rem);
    font-weight: 400;
    margin-bottom: 0.4rem;
    transition: color 0.3s ease;
  }
  .project-row:hover .p-name {
    color: var(--accent);
  }
  .p-cat {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .p-arrow {
    font-size: 1.8rem;
    color: var(--text-muted);
    transition: transform 0.3s ease, color 0.3s ease;
  }
  .project-row:hover .p-arrow {
    transform: translate(6px, -6px);
    color: var(--accent);
  }

  /* Education */
  .edu-title {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 300;
    margin-bottom: 3.5rem;
  }
  .edu-row {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2.5rem;
    padding: 2.5rem 0;
    border-top: 1px solid var(--border);
  }
  .edu-row:last-child {
    border-bottom: 1px solid var(--border);
  }
  .edu-period {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.1em;
  }
  .edu-inst {
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 0.3rem;
  }
  .edu-detail {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 0.4rem;
  }
  .edu-score {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* Certifications */
  .cert-title {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 300;
    margin-bottom: 3.5rem;
  }
  .cert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .cert-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .cert-card:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
  }
  .cert-card-num {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--accent);
    margin-bottom: 1.5rem;
  }
  .cert-card-name {
    font-size: 1.15rem;
    font-weight: 400;
    margin-bottom: 0.6rem;
  }
  .cert-card-issuer {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-bottom: 0.3rem;
  }
  .cert-card-date {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }
  .cert-card-action {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  /* Contact */
  .contact-section {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-hero {
    font-size: clamp(2.8rem, 7vw, 6.5rem);
    font-weight: 300;
    line-height: 1.05;
    margin-bottom: 4rem;
  }
  .contact-hero em {
    font-style: italic;
    color: var(--accent);
  }
  .contact-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
    margin-bottom: 3rem;
  }
  .contact-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    padding: 1.8rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition: all 0.3s ease;
  }
  .contact-card:hover {
    border-color: var(--accent);
    background: var(--bg-surface);
  }
  .contact-card-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .contact-card-val {
    font-size: 0.95rem;
    color: var(--text-secondary);
    word-break: break-all;
  }
  .contact-card:hover .contact-card-val {
    color: #fff;
  }

  /* Unified Modal Dialog Styling */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10,10,10,0.96);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 5000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.35s ease, visibility 0.35s ease;
    overflow-y: auto;
    padding: clamp(1rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .modal-backdrop.open {
    opacity: 1;
    visibility: visible;
  }
  .modal-dialog-box {
    width: 100%;
    max-width: 1050px;
    margin: auto;
    background: #111111;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(200, 255, 0, 0.04);
    position: relative;
    cursor: default;
    overflow: hidden;
  }
  .modal-header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.75rem;
    background: #161616;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    gap: 1rem;
    flex-wrap: wrap;
  }
  .modal-tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .modal-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .modal-btn {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: all 0.25s ease;
    border: 1px solid transparent;
  }
  .modal-btn-ext {
    background: transparent;
    color: var(--text-secondary);
    border-color: rgba(255, 255, 255, 0.18);
  }
  .modal-btn-ext:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
  }
  .modal-btn-close {
    background: var(--accent);
    color: #0a0a0a;
    font-weight: 700;
    border-color: var(--accent);
  }
  .modal-btn-close:hover {
    background: transparent;
    color: var(--accent);
    box-shadow: 0 0 15px rgba(200, 255, 0, 0.35);
  }
  .modal-body {
    padding: clamp(1.5rem, 4vw, 3rem);
  }
  .cert-view-container {
    width: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .cert-view-img {
    max-width: 100%;
    max-height: 75vh;
    object-fit: contain;
    border: 1px solid var(--border);
  }
  .cert-view-pdf {
    width: 100%;
    height: 72vh;
    border: 1px solid var(--border);
  }

  /* Footer */
  footer {
    padding: 2.5rem clamp(1.5rem, 6vw, 6rem);
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
  }
  footer a {
    color: var(--text-muted);
    text-decoration: none;
    margin-left: 1.5rem;
    transition: color 0.3s ease;
  }
  footer a:hover {
    color: var(--accent);
  }

  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; }
    .edu-row { grid-template-columns: 1fr; gap: 0.5rem; }
    .nav-links { display: none; }
    .scroll-indicator { display: none; }
    .cursor-dot, .cursor-ring, .cursor-text { display: none !important; }
  }
  </style>
</head>
<body>

  <canvas id="webgl-canvas"></canvas>
  <div class="noise"></div>

  <div class="cursor-dot" id="cursor-dot"></div>
  <div class="cursor-ring" id="cursor-ring"></div>
  <div class="cursor-text" id="cursor-text"></div>

  <nav>
    <a href="#" class="nav-logo" data-cursor="HOME">A.K.P</a>
    <div class="nav-links">
      <a href="#about" data-cursor="ABOUT">About</a>
      <a href="#skills" data-cursor="SKILLS">Skills</a>
      <a href="#projects" data-cursor="WORK">Projects</a>
      <a href="#education" data-cursor="EDUCATION">Education</a>
      <a href="#certifications" data-cursor="CERTS">Certifications</a>
      <a href="#contact" data-cursor="CONTACT">Contact</a>
    </div>
  </nav>

  <main>
    <!-- Hero -->
    <section class="hero-section" id="hero">
      <h1 class="hero-title">
        ABHISHEK<br>
        KUMAR PRAMANIK
      </h1>
      <div class="hero-sub">
        Computer Science × AI × Full-Stack Developer
      </div>
      <div class="scroll-indicator">Scroll to explore</div>
    </section>

    <!-- About -->
    <section id="about">
      <div class="section-tag">01 · About Abhishek</div>
      <div class="about-grid">
        <div>
          <h2 class="about-heading">
            Building <em>ideas</em> into functional digital systems.
          </h2>
          <p class="about-text">
            B.Tech Computer Science &amp; Engineering undergraduate at Lovely Professional University focused on building full-stack web applications, AI-powered systems, and technology-driven projects. Passionate about solving real-world challenges with robust software and modern AI workflows.
          </p>
          <div class="interest-tags">
            <span class="interest-tag" data-cursor="AI">Artificial Intelligence</span>
            <span class="interest-tag" data-cursor="FULL-STACK">Full-Stack Development</span>
            <span class="interest-tag" data-cursor="DSA">Data Structures &amp; Algorithms</span>
            <span class="interest-tag" data-cursor="IOT">IoT &amp; Automation</span>
            <span class="interest-tag" data-cursor="BACKEND">REST APIs</span>
            <span class="interest-tag" data-cursor="SYSTEMS">Computer Networks</span>
          </div>
        </div>
        <div class="photo-frame" data-cursor="ABHISHEK">
          <img src="${photoB64}" alt="Abhishek Kumar Pramanik">
          <div class="photo-caption">Abhishek Kumar Pramanik</div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section id="skills">
      <div class="section-tag">02 · Technical Foundation</div>
      <h2 class="skills-title">Skills &amp; Capabilities</h2>
      <div class="skills-grid">
        <div class="skill-box" data-cursor="LANGUAGES">
          <div class="skill-box-title">Programming</div>
          <div class="skill-pills">
            <span class="skill-pill">C</span>
            <span class="skill-pill">C++</span>
            <span class="skill-pill">Python</span>
            <span class="skill-pill">JavaScript</span>
          </div>
        </div>
        <div class="skill-box" data-cursor="WEB">
          <div class="skill-box-title">Web Development</div>
          <div class="skill-pills">
            <span class="skill-pill">HTML5</span>
            <span class="skill-pill">CSS3</span>
            <span class="skill-pill">JavaScript</span>
            <span class="skill-pill">React.js</span>
            <span class="skill-pill">Node.js</span>
            <span class="skill-pill">Express.js</span>
          </div>
        </div>
        <div class="skill-box" data-cursor="DATABASE">
          <div class="skill-box-title">Databases</div>
          <div class="skill-pills">
            <span class="skill-pill">SQL</span>
            <span class="skill-pill">SQLite</span>
            <span class="skill-pill">PostgreSQL</span>
          </div>
        </div>
        <div class="skill-box" data-cursor="CORE CS">
          <div class="skill-box-title">Core Computer Science</div>
          <div class="skill-pills">
            <span class="skill-pill">Data Structures &amp; Algorithms</span>
            <span class="skill-pill">OOP</span>
            <span class="skill-pill">DBMS</span>
            <span class="skill-pill">Computer Networks</span>
            <span class="skill-pill">Problem Solving</span>
          </div>
        </div>
        <div class="skill-box" data-cursor="AI / ML">
          <div class="skill-box-title">AI &amp; Technologies</div>
          <div class="skill-pills">
            <span class="skill-pill">Generative AI</span>
            <span class="skill-pill">Gemini API</span>
            <span class="skill-pill">OCR</span>
            <span class="skill-pill">Speech Recognition</span>
            <span class="skill-pill">AI-based Applications</span>
          </div>
        </div>
        <div class="skill-box" data-cursor="HARDWARE">
          <div class="skill-box-title">Hardware &amp; IoT</div>
          <div class="skill-pills">
            <span class="skill-pill">Arduino Uno</span>
            <span class="skill-pill">ESP8266 / NodeMCU</span>
            <span class="skill-pill">MQ-6 Gas Sensors</span>
            <span class="skill-pill">Embedded Programming</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects">
      <div class="section-tag">03 · Selected Work</div>
      <h2 class="projects-title">Featured Projects</h2>

      <div class="project-row" onclick="openProject('medikiosk')" data-cursor="VIEW MEDIKIOSK">
        <div class="p-num">01</div>
        <div>
          <div class="p-name">MediKiosk</div>
          <div class="p-cat">AI / Healthcare / Full-Stack Development</div>
        </div>
        <div class="p-arrow">↗</div>
      </div>

      <div class="project-row" onclick="openProject('codehub')" data-cursor="VIEW CODEHUB">
        <div class="p-num">02</div>
        <div>
          <div class="p-name">CodeHub</div>
          <div class="p-cat">C++ / DSA / Full-Stack Web Development</div>
        </div>
        <div class="p-arrow">↗</div>
      </div>

      <div class="project-row" onclick="openProject('iot')" data-cursor="VIEW IOT GAS">
        <div class="p-num">03</div>
        <div>
          <div class="p-name">Smart IoT Gas Leakage Detection</div>
          <div class="p-cat">IoT / Embedded Systems / Automation</div>
        </div>
        <div class="p-arrow">↗</div>
      </div>
    </section>

    <!-- Education -->
    <section id="education">
      <div class="section-tag">04 · Academic Background</div>
      <h2 class="edu-title">Education</h2>

      <div class="edu-row" data-cursor="UNIVERSITY">
        <div class="edu-period">2025 — Present</div>
        <div>
          <div class="edu-inst">Lovely Professional University</div>
          <div class="edu-detail">Bachelor of Technology — Computer Science &amp; Engineering</div>
          <div class="edu-score">CGPA: 7.45 · Punjab, India</div>
        </div>
      </div>

      <div class="edu-row" data-cursor="CLASS 12">
        <div class="edu-period">2022 — 2024</div>
        <div>
          <div class="edu-inst">Akrurmoni Corornation Institution</div>
          <div class="edu-detail">Higher Secondary Education (Class 12)</div>
          <div class="edu-score">Percentage: 80.2%</div>
        </div>
      </div>

      <div class="edu-row" data-cursor="CLASS 10">
        <div class="edu-period">2021 — 2022</div>
        <div>
          <div class="edu-inst">Akrurmoni Corornation Institution</div>
          <div class="edu-detail">Secondary Education (Class 10)</div>
          <div class="edu-score">Percentage: 86.4%</div>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section id="certifications">
      <div class="section-tag">05 · Verification</div>
      <h2 class="cert-title">Certifications</h2>
      <div class="cert-grid">
        <div class="cert-card" onclick="openCert('techveda')" data-cursor="VIEW CERT">
          <div class="cert-card-num">01</div>
          <div class="cert-card-name">Effective Time Management</div>
          <div class="cert-card-issuer">Tech Veda · TV/OCT25/ETM/A054</div>
          <div class="cert-card-date">October 24, 2025</div>
          <div class="cert-card-action">View Document ↗</div>
        </div>

        <div class="cert-card" onclick="openCert('infosys')" data-cursor="VIEW CERT">
          <div class="cert-card-num">02</div>
          <div class="cert-card-name">Introduction to Cloud Computing</div>
          <div class="cert-card-issuer">Infosys Springboard</div>
          <div class="cert-card-date">March 23, 2026</div>
          <div class="cert-card-action">View Document ↗</div>
        </div>

        <div class="cert-card" onclick="openCert('sailor')" data-cursor="VIEW CERT">
          <div class="cert-card-num">03</div>
          <div class="cert-card-name">Data Management</div>
          <div class="cert-card-issuer">Sailor Academy</div>
          <div class="cert-card-date">Verified</div>
          <div class="cert-card-action">View Document ↗</div>
        </div>

        <div class="cert-card" style="opacity: 0.5;" data-cursor="UPCOMING">
          <div class="cert-card-num">04</div>
          <div class="cert-card-name">Certificate Slot 04</div>
          <div class="cert-card-issuer">Coming Soon</div>
          <div class="cert-card-date">—</div>
          <div class="cert-card-action" style="color: var(--text-muted);">Upcoming · 2026</div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact-section" id="contact">
      <div class="section-tag">06 · Connection</div>
      <h2 class="contact-hero">
        Let&apos;s build<br>
        <em>something</em><br>
        functional.
      </h2>

      <div class="contact-cards">
        <a href="mailto:pramanikabhishek177@gmail.com" class="contact-card" data-cursor="SEND EMAIL">
          <span class="contact-card-label">Email</span>
          <span class="contact-card-val">pramanikabhishek177@gmail.com</span>
        </a>

        <a href="tel:+918900371813" class="contact-card" data-cursor="CALL">
          <span class="contact-card-label">Phone</span>
          <span class="contact-card-val">+91 8900371813</span>
        </a>

        <a href="https://www.linkedin.com/in/abhisnik/" target="_blank" rel="noopener noreferrer" class="contact-card" data-cursor="CONNECT">
          <span class="contact-card-label">LinkedIn</span>
          <span class="contact-card-val">linkedin.com/in/abhisnik</span>
        </a>

        <a href="https://github.com/abhisnik" target="_blank" rel="noopener noreferrer" class="contact-card" data-cursor="GITHUB">
          <span class="contact-card-label">GitHub</span>
          <span class="contact-card-val">github.com/abhisnik</span>
        </a>
      </div>
    </section>
  </main>

  <!-- Universal Modal Container -->
  <div class="modal-backdrop" id="modal" onclick="closeModal()">
    <div class="modal-dialog-box" id="modal-box" onclick="event.stopPropagation()">
      <div class="modal-header-bar">
        <span class="modal-tag" id="modal-tag">Details</span>
        <div class="modal-actions" id="modal-actions">
          <button class="modal-btn modal-btn-close" onclick="closeModal()" data-cursor="CLOSE">✕ Close [ESC]</button>
        </div>
      </div>
      <div class="modal-body" id="modal-body"></div>
    </div>
  </div>

  <footer>
    <div>&copy; 2026 Abhishek Kumar Pramanik. Built with precision.</div>
    <div>
      <a href="https://www.linkedin.com/in/abhisnik/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://github.com/abhisnik" target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
  </footer>

  <script>
  // WebGL Background
  const canvas = document.getElementById('webgl-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 6;
  camera.position.y = 0.5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Central Abstract Object
  const geometry = new THREE.IcosahedronGeometry(1.2, 3);
  const material = new THREE.MeshBasicMaterial({
    color: 0xc8ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Particle Field
  const particleCount = window.innerWidth < 768 ? 600 : 1800;
  const pGeom = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.2 + Math.random() * 3.5;
    pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i * 3 + 2] = r * Math.cos(phi);
  }
  pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xc8ff00,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(pGeom, pMat);
  scene.add(particles);

  // Mouse & Scroll Interaction
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    mesh.rotation.x = t * 0.12 + mouseY * 0.2;
    mesh.rotation.y = t * 0.18 + mouseX * 0.2;
    particles.rotation.y = t * 0.04 + mouseX * 0.1;
    particles.rotation.x = mouseY * 0.05;
    renderer.render(scene, camera);
  }
  animate();

  // Custom Cursor
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const curText = document.getElementById('cursor-text');
  let curX = 0, curY = 0, targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.left = targetX + 'px';
    dot.style.top = targetY + 'px';
  });

  function updateCursor() {
    curX += (targetX - curX) * 0.15;
    curY += (targetY - curY) * 0.15;
    ring.style.left = curX + 'px';
    ring.style.top = curY + 'px';
    curText.style.left = curX + 'px';
    curText.style.top = curY + 'px';
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering');
      curText.innerText = el.getAttribute('data-cursor');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
      curText.innerText = '';
    });
  });

  // Assets Reference
  const certAssets = {
    techveda: {
      title: 'Effective Time Management',
      issuer: 'Tech Veda · TV/OCT25/ETM/A054',
      date: 'October 24, 2025',
      type: 'image',
      data: '${certTechVedaB64}'
    },
    infosys: {
      title: 'Introduction to Cloud Computing',
      issuer: 'Infosys Springboard',
      date: 'March 23, 2026',
      type: 'pdf',
      data: '${certInfosysB64}'
    },
    sailor: {
      title: 'Data Management',
      issuer: 'Sailor Academy',
      date: 'Verified',
      type: 'pdf',
      data: '${certSailorB64}'
    }
  };

  const projectData = {
    medikiosk: {
      title: 'MediKiosk',
      tag: '01 / 03 · AI Healthcare Solution',
      desc: 'AI-powered patient case-taking system that collects patient symptoms and medical history through natural voice interaction, digitizes physical prescriptions via OCR, and generates structured clinical summaries for medical professionals.',
      problem: 'Traditional hospital intake creates long wait times, errors in handwritten transcripts, and fatigue for medical staff.',
      solution: 'Engineered an automated kiosk leveraging speech recognition and Google Gemini API to structure clinical intakes in seconds.',
      techs: ['React.js', 'Node.js', 'Express.js', 'Gemini API', 'REST APIs', 'OCR', 'Speech Recognition', 'Render'],
      github: 'https://github.com/abhisnik/MediKiosk',
      live: null
    },
    codehub: {
      title: 'CodeHub',
      tag: '02 / 03 · Educational Platform',
      desc: 'Full-stack C++ and DSA learning portal designed for students to access structured course modules, practice coding problems, filter reference solutions, and track coursework progress.',
      problem: 'Fragmented study resources and lack of organized reference solutions for university DSA courses.',
      solution: 'Built a lightweight, searchable portal backed by SQLite3 and Express with dynamic topic filtering and code snippets.',
      techs: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'SQLite3', 'Render'],
      github: 'https://github.com/abhisnik/CodeHub',
      live: null
    },
    iot: {
      title: 'Smart IoT Gas Leakage Detection',
      tag: '03 / 03 · Embedded Automation',
      desc: 'Real-time LPG gas leakage detection and emergency alert system utilizing MQ-6 gas sensors, Arduino Uno, and NodeMCU ESP8266 with automated instant Telegram emergency notifications.',
      problem: 'Undetected residential and commercial gas leaks pose immediate fire and asphyxiation hazards.',
      solution: 'Designed an autonomous hardware-to-cloud pipeline that detects threshold crossings and triggers real-time Telegram alerts to family members.',
      techs: ['Arduino Uno', 'ESP8266 / NodeMCU', 'MQ-6 LPG Sensor', 'Embedded C/C++', 'Telegram API'],
      github: null,
      live: null
    }
  };

  const modal = document.getElementById('modal');
  const modalTag = document.getElementById('modal-tag');
  const modalActions = document.getElementById('modal-actions');
  const modalBody = document.getElementById('modal-body');

  function openProject(key) {
    const p = projectData[key];
    modalTag.innerText = p.tag;
    modalActions.innerHTML = \`
      <button class="modal-btn modal-btn-close" onclick="closeModal()" data-cursor="CLOSE">✕ Close [ESC]</button>
    \`;
    modalBody.innerHTML = \`
      <h2 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; margin-bottom: 2rem;">\${p.title}</h2>
      <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2.5rem;">\${p.desc}</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 2.5rem;">
        <div style="background: var(--bg-surface); padding: 1.5rem; border: 1px solid var(--border);">
          <h4 style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); margin-bottom: 0.8rem; text-transform: uppercase;">Problem</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">\${p.problem}</p>
        </div>
        <div style="background: var(--bg-surface); padding: 1.5rem; border: 1px solid var(--border);">
          <h4 style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); margin-bottom: 0.8rem; text-transform: uppercase;">Solution</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">\${p.solution}</p>
        </div>
      </div>

      <h4 style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent); margin-bottom: 1rem; text-transform: uppercase;">Technologies</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 3rem;">
        \${p.techs.map(t => \`<span style="font-family: var(--font-mono); font-size: 0.68rem; padding: 0.35rem 0.7rem; border: 1px solid var(--border); color: var(--text-secondary);">\${t}</span>\`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border); padding-top: 2rem; flex-wrap: wrap;">
        \${p.github ? \`<a href="\${p.github}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-ext">View Repository ↗</a>\` : \`<span style="font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; padding: 0.6rem 1.2rem; border: 1px solid var(--border); color: var(--text-muted);">Repository Coming Soon</span>\`}
        \${p.live ? \`<a href="\${p.live}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-close">Live Demo ↗</a>\` : \`<span style="font-family: var(--font-mono); font-size: 0.72rem; text-transform: uppercase; padding: 0.6rem 1.2rem; border: 1px solid var(--border); color: var(--text-muted);">Live Demo Coming Soon</span>\`}
      </div>
    \`;
    showModal('project');
  }

  function openCert(key) {
    const c = certAssets[key];
    modalTag.innerText = 'Verification · ' + c.issuer;
    modalActions.innerHTML = \`
      <a href="\${c.data}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-ext" data-cursor="OPEN">Open Fullscreen ↗</a>
      <button class="modal-btn modal-btn-close" onclick="closeModal()" data-cursor="CLOSE">✕ Close [ESC]</button>
    \`;
    if (c.type === 'pdf') {
      modalBody.innerHTML = \`
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.3rem;">\${c.title}</h2>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">\${c.issuer} · \${c.date}</div>
        </div>
        <div class="cert-view-container">
          <iframe src="\${c.data}#toolbar=1" class="cert-view-pdf" title="\${c.title}"></iframe>
        </div>
      \`;
    } else {
      modalBody.innerHTML = \`
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.3rem;">\${c.title}</h2>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">\${c.issuer} · \${c.date}</div>
        </div>
        <div class="cert-view-container">
          <img src="\${c.data}" alt="\${c.title}" class="cert-view-img">
        </div>
      \`;
    }
    showModal('cert');
  }

  function showModal(type) {
    document.body.style.overflow = 'hidden';
    modal.classList.add('open');
    window.history.pushState({ modal: type }, '', window.location.pathname + '#modal-view');
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (window.location.hash === '#modal-view') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  window.addEventListener('popstate', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });

  window.addEventListener('hashchange', () => {
    if (!window.location.hash.includes('modal-view')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"], .nav-logo, .nav-links a')) {
      closeModal();
    }
  });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'shareable.html'), htmlContent, 'utf8');
console.log('Shareable HTML built successfully at C:\\Users\\Abhishek\\portfolio\\shareable.html');
