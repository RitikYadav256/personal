import { motion } from 'framer-motion';

const hearts = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  duration: `${6 + Math.random() * 6}s`,
  size: `${16 + Math.random() * 16}px`,
  rotate: `${Math.random() * 360}deg`,
}));

export default function FloatingHearts({ className = '' }) {
  return (
    <div className={`floating-hearts ${className}`.trim()} aria-hidden="true">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            rotate: heart.rotate,
          }}
          animate={{ y: ['-10%', '110vh'], x: [0, Math.random() * 40 - 20], opacity: [0, 1, 1, 0] }}
          transition={{ duration: Number.parseFloat(heart.duration), repeat: Number.POSITIVE_INFINITY, delay: Number.parseFloat(heart.delay), ease: 'easeInOut' }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
