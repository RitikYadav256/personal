import { motion } from 'framer-motion';
import { FiRefreshCw, FiSun, FiMoon } from 'react-icons/fi';
import TypewriterText from './TypewriterText';

export default function Hero({
  shayari,
  isLoading,
  isSpeaking,
  theme,
  onNewShayari,
  onToggleTheme,
  onTypewriterComplete,
}) {
  return (
    <motion.header
      className="hero"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="hero__topbar">
        <div className="hero__pill">Romantic moment</div>
        <div className="hero__actions">
          <button onClick={onNewShayari} className="icon-btn" title="New shayari">
            <FiRefreshCw />
          </button>
          <button onClick={onToggleTheme} className="icon-btn" title="Theme toggle">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>

      <div className="hero__content">
        <div className="hero__title-wrap">
          <p className="hero__subtitle">A dreamy confession</p>
          <h1>For the one who makes my world glow</h1>
        </div>

        <div className="hero__card">
          {isLoading ? (
            <div className="hero__loading">Crafting a beautiful line...</div>
          ) : (
            <TypewriterText text={shayari} onComplete={onTypewriterComplete} />
          )}
          <p className="hero__status">A soft message just for you</p>
        </div>
      </div>
    </motion.header>
  );
}
