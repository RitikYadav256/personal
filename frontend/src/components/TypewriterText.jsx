import { useEffect, useState } from 'react';

export default function TypewriterText({ text, speed = 35, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (!text) {
      return undefined;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      setDisplayedText((current) => current + text[index]);
      index += 1;

      if (index >= text.length) {
        window.clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <p className="typewriter-text">
      {displayedText}
      <span className="typing-cursor" />
    </p>
  );
}
