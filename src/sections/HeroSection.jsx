import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const taglineRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      [line1Ref.current, line2Ref.current],
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
    )
      .fromTo(
        taglineRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <h1 className="hero-name">
        <span className="line">
          <span ref={line1Ref}>ABHISHEK</span>
        </span>
        <span className="line">
          <span ref={line2Ref}>KUMAR PRAMANIK</span>
        </span>
      </h1>

      <div className="hero-tagline" ref={taglineRef}>
        Computer Science × AI × Full-Stack
      </div>

      <div className="hero-scroll" ref={scrollRef} aria-hidden="true">
        Scroll to explore
      </div>
    </section>
  );
}
