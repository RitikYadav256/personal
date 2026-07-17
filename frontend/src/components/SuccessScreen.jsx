import { motion } from 'framer-motion';
import { FiHeart, FiStar } from 'react-icons/fi';

export default function SuccessScreen() {
  return (
    <motion.div
      className="success-screen"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="success-screen__glow" />
      <FiHeart className="success-screen__heart" />
      <h2>You made my heart feel safe and full of light 💗</h2>
      <p>My favorite dream just became real and healthy, and it feels like coming home.</p>
      <div className="success-screen__badges">
        <span><FiStar /> Pure joy</span>
        <span><FiStar /> Endless love</span>
        <span><FiStar /> Forever smile</span>
      </div>
    </motion.div>
  );
}
