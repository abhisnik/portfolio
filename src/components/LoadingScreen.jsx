import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => onComplete(), 800);
        }, 400);
      }
      setProgress(Math.min(current, 100));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`} aria-live="polite">
      <div className="loading-initials" aria-hidden="true">
        <span>A</span>
        <span>B</span>
        <span>P</span>
      </div>
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loading-percent">{Math.round(progress)}%</div>
    </div>
  );
}
