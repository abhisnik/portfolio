import { useRef, useEffect, useCallback, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  // Detect touch device
  const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const animate = useCallback(() => {
    pos.current.x += (target.current.x - pos.current.x) * 0.12;
    pos.current.y += (target.current.y - pos.current.y) * 0.12;

    if (cursorRef.current) {
      cursorRef.current.style.transform =
        `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        setHovering(true);
        setCursorText(el.dataset.cursor || '');
      } else {
        setHovering(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, isTouch, visible]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovering ? 'hovering' : ''}`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      {cursorText && <div className="cursor-text">{cursorText}</div>}
    </div>
  );
}
