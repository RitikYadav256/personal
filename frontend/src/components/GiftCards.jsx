import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FiHeart, FiXCircle } from 'react-icons/fi';

const cards = [
  'Your kindness makes ordinary days feel softer.',
  'The way you care is a quiet kind of magic.',
  'You bring calm to every storm I have ever known.',
  'Your smile has a way of making the world feel gentler.',
  'I keep choosing you in the small, beautiful ways.',
  'Do you like me? Yes or no?',
];

export default function GiftCards({ onYes, onNo, noMessage, noButtonStyle, buttonLabel }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (activeIndex >= cards.length - 1) {
      setRevealed(true);
      return;
    }

    const timer = window.setTimeout(() => setActiveIndex((value) => value + 1), 1000);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const currentCard = cards[activeIndex];
  const isProposal = activeIndex === cards.length - 1;

  const cardClassName = useMemo(() => (isProposal ? 'gift-card gift-card--proposal' : 'gift-card'), [isProposal]);

  return (
    <div className="gift-cards" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard}
          className={cardClassName}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.55 }}
        >
          {isProposal ? (
            <div className="gift-card__proposal">
              <p className="gift-card__eyebrow">One last card</p>
              <h2>Do you like me?</h2>
              <p className="gift-card__message">If your answer is yes, let this moment stay with you forever.</p>
              <div className="gift-card__actions">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn btn--yes" onClick={onYes}>
                  <FiHeart /> YES
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
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
            </div>
          ) : (
            <p className="gift-card__text">{currentCard}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="gift-cards__dots" aria-hidden="true">
        {cards.map((_, index) => (
          <span key={index} className={index <= activeIndex ? 'active' : ''} />
        ))}
      </div>

      {!revealed ? <p className="gift-cards__hint">Open the next card...</p> : null}
    </div>
  );
}
