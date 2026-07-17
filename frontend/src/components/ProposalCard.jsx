import { motion } from 'framer-motion';
import { FiHeart, FiXCircle } from 'react-icons/fi';
import TypewriterText from './TypewriterText';

export default function ProposalCard({
  shayari,
  isLoading,
  showProposal,
  onYes,
  onNo,
  noMessage,
  noButtonStyle,
  buttonLabel,
  onTypewriterComplete,
}) {
  return (
    <motion.div
      className="proposal-card"
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 15, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {!showProposal ? (
        <div className="proposal-card__intro">
          {isLoading ? (
            <p className="proposal-card__loading">Preparing a lovely message...</p>
          ) : (
            <TypewriterText text={shayari} onComplete={onTypewriterComplete} />
          )}
        </div>
      ) : (
        <motion.div
          className="proposal-card__content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="proposal-card__eyebrow">A little truth, softly spoken</p>
          <h2>Will you stay in my heart forever?</h2>
          <p className="proposal-card__message">
            Every love story is beautiful, but the one I want with you feels warm, honest, and wonderfully real. ❤️
          </p>

          <div className="proposal-card__actions">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn--yes"
              onClick={onYes}
            >
              <FiHeart /> YES SIR
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn--no"
              onClick={onNo}
              style={noButtonStyle}
              onMouseEnter={onNo}
              onMouseOver={onNo}
              onTouchStart={onNo}
              onFocus={onNo}
            >
              <FiXCircle /> {buttonLabel}
            </motion.button>
          </div>

          <p className="tease-message">{noMessage}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
