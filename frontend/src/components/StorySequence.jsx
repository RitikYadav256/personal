import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const lines = [
  'Some people enter our lives unexpectedly...',
  'And somehow become our favorite part of every day...',
  'I never planned this...',
  'But here I am...',
  'Thinking about you.',
];

export default function StorySequence({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= lines.length) {
      const timer = window.setTimeout(() => onComplete?.(), 900);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => setIndex((value) => value + 1), 1400);
    return () => window.clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div
      className="story-sequence"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.7 }}
    >
      <p className="story-sequence__eyebrow">A little memory, softly unfolding</p>
      <div className="story-sequence__lines" aria-live="polite">
        {lines.slice(0, index + 1).map((line, lineIndex) => (
          <motion.p
            key={line}
            className="story-sequence__line"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: lineIndex * 0.1, duration: 0.55 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
