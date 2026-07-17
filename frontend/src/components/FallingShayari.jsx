import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

function createItem() {
  const texts = [
    'तू मेरे दिल की धड़कन है',
    'हर पल तुझसे प्यार',
    'सिर्फ़ तुझको चाहूँ',
    'तू मेरे सबसे खास',
    'रातों में भी तेरा नाम',
    'मोहब्बत की सबसे खूबसूरत कहानी',
    'तेरी यादें मेरे साथ',
    'सुकून की तरह तू',
  ];

  return {
    id: `${Date.now()}-${Math.random()}`,
    text: texts[Math.floor(Math.random() * texts.length)],
    left: `${Math.random() * 100}%`,
    duration: 8 + Math.random() * 6,
    delay: Math.random() * 0.6,
    rotate: -18 + Math.random() * 36,
  };
}

export default function FallingShayari() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setItems((current) => {
        const next = [...current, createItem(), createItem(), createItem()];
        return next.slice(-12);
      });
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  const visibleItems = useMemo(() => items, [items]);

  return (
    <div className="falling-shayari" aria-hidden="true">
      <AnimatePresence>
        {visibleItems.map((item) => (
          <motion.div
            key={item.id}
            className="falling-shayari__item"
            initial={{ opacity: 0, y: -40, rotate: item.rotate - 8 }}
            animate={{ opacity: [0, 1, 1, 0], y: '115vh', rotate: item.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: item.duration, delay: item.delay, ease: 'easeInOut' }}
            style={{ left: item.left }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
