import { socials } from '../data/personal';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-copy">
        &copy; {year} Abhishek Kumar Pramanik. Built with precision.
      </div>

      <div className="footer-socials">
        {socials
          .filter((s) => s.url.startsWith('http'))
          .map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor={item.cursorText}
            >
              {item.name}
            </a>
          ))}
      </div>
    </footer>
  );
}
