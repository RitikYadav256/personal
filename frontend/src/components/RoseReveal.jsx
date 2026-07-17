import { motion } from 'framer-motion';

export default function RoseReveal() {
  return (
    <motion.div
      className="rose-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.div
        className="rose-reveal__glow"
        animate={{ scale: [0.92, 1.06, 0.92], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="rose-reveal__halo"
        animate={{ scale: [0.95, 1.04, 0.95], opacity: [0.55, 0.82, 0.55] }}
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="rose-reveal__rose"
        animate={{ y: [0, -8, 0], scale: [0.98, 1.01, 0.98], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.p
        className="rose-reveal__caption"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        A quiet moment before forever
      </motion.p>
    </motion.div>
  );
}
