import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiHeart, FiXCircle, FiArrowLeft } from 'react-icons/fi';

const baseGifts = [
  {
    title: 'Gift 1',
    message: 'Some people make the world brighter just by being in it. You are one of them. ❤️',
    theme: 'rose',
  },
  {
    title: 'Gift 2',
    message: 'Every conversation with you feels like a little piece of magic I never want to lose.',
    theme: 'peach',
  },
  {
    title: 'Gift 3',
    message: 'You have a beautiful way of turning ordinary moments into memories I will treasure forever.',
    theme: 'lilac',
  },
  {
    title: 'Gift 4',
    message: 'Whenever life feels heavy, thinking of you makes the world feel softer and kinder.',
    theme: 'cream',
  },
  {
    title: 'Gift 5',
    message: 'If happiness had a face, I think it would look a lot like your smile. 😊',
    theme: 'gold',
  },
  {
    title: 'Gift 6',
    message: 'After all these little gifts, there is still one thing I want to know... will you stay close to my heart forever?',
    theme: 'golden',
  },
];

const hindiMessages = [
  'कुछ लोग ज़िंदगी में आते हैं और बिना कोशिश किए उसे खूबसूरत बना देते हैं। ❤️',
  'तुम्हारी मुस्कान किसी भी दिन को बेहतर बना सकती है। 😊',
  'कभी-कभी किसी का ख्याल ही पूरे दिन को खास बना देता है।',
  'दुनिया में बहुत लोग हैं, लेकिन कुछ लोग दिल में बस जाते हैं। ❤️',
  'तुम्हारे होने से साधारण पल भी यादगार लगते हैं।',
  'हर मुस्कान में तुमसे जुड़ी एक प्यारी याद होती है।',
  'तुम्हारी मौजूदगी से हर शाम और भी खूबसूरत लगती है।',
  'किसी की यादें भी कितनी प्यारी हो सकती हैं, तुमने दिखा दिया।',
  'तुम्हारा नाम जितना ही सोचूँ, मन उतना ही मुस्कुराने लगता है।',
  'कोई किसी का हिस्सा बन जाए तो ऐसा लगता है जैसे रिश्ता ही जादू हो।',
  'तुम्हारे साथ बिताए पल मेरे लिए खास और पावन हैं।',
  'कुछ रिश्ते सिर्फ़ दिल में नहीं, हर धड़कन में बस जाते हैं।',
  'तुम्हारी हँसी मेरे अंदर की सबसे प्यारी रोशनी है।',
  'हर छोटी-सी बात में तुम्हारी याद छिपी हुई लगती है।',
  'सिर्फ़ तुम्हारा ख्याल ही मुझे सुकून दे जाता है।',
  'तुम्हारे होने से मेरी दुनिया थोड़ा और उजियारा हो जाती है।',
  'कभी-कभी दिल किसी एक चेहरे पर ही रुक जाता है।',
  'तुम्हारे साथ हर पल मुझे थोड़ा-सा घर जैसा लगता है।',
  'तुम्हारी यादें जैसे कोई खूबसूरत कहानी हों।',
  'तुम्हारे विचारों से ही मेरे मन का मौसम बदल जाता है।',
  'एक प्यारी सी मुस्कान भी उतनी ही खूबसूरत होती है जितना तुम हो।',
  'तुम्हारी मौजूदगी मेरे मन में शांति की तरह बसी रहती है।',
  'तुम्हारे लिए सोचना मेरे लिए एक अनकहा संदेश है।',
  'साधारण दिनों में भी तुम एक खास खुशबू बनकर आते हो।',
  'तुम्हारे होने से मेरे अंदर की हर थरथराहट भी शांत लगती है।',
  'तुम्हें याद करके ही मेरी दुनिया रंगीन लगने लगती है।',
  'कभी-कभी दिल किसी की आवाज़ सुनकर ही खुशी से भर उठता है।',
  'तुम्हारी हँसी मेरे लिए सबसे प्यारी धुन है।',
  'तुम्हारे ख्याल से किसी भी दिन की थकान हल्की पड़ जाती है।',
  'तुम्हारे साथ बिताए पल मेरे लिए रौशनी से भरे हुए हैं।',
  'तुम्हारे करीब होने से हर बात खूबसूरत लगती है।',
  'तुम्हें सोचकर ही मन में एक गर्माहट महसूस होती है।',
  'तुमसे जुड़ जाना किसी खूबसूरत सपने जैसा लगता है।',
  'तुम्हारी यादों में ही मेरी सबसे अच्छी बातें छुपी हैं।',
];

const shuffleArray = (items) => {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
};

export default function GiftBoxExperience({ onYes, onNo, noMessage, noButtonStyle, buttonLabel }) {
  const [openedCards, setOpenedCards] = useState([]);
  const [activeGift, setActiveGift] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openingGift, setOpeningGift] = useState(false);
  const [specialReveal, setSpecialReveal] = useState(false);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const revealTimerRef = useRef(null);
  const dismissTimerRef = useRef(null);
  const congratsTimerRef = useRef(null);

  useEffect(() => {
    const specialIndex = Math.floor(Math.random() * baseGifts.length);
    const shuffledMessages = shuffleArray(hindiMessages);
    const nextGifts = baseGifts.map((gift, index) => ({
      ...gift,
      special: index === specialIndex,
      messageHindi: shuffledMessages[index % shuffledMessages.length],
    }));

    setGifts(nextGifts);
    setActiveGift(nextGifts[0]);
  }, []);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) {
        window.clearTimeout(revealTimerRef.current);
      }
      if (dismissTimerRef.current) {
        window.clearTimeout(dismissTimerRef.current);
      }
      if (congratsTimerRef.current) {
        window.clearTimeout(congratsTimerRef.current);
      }
    };
  }, []);

  const handleOpen = (gift, index) => {
    if (revealTimerRef.current) {
      window.clearTimeout(revealTimerRef.current);
    }
    if (dismissTimerRef.current) {
      window.clearTimeout(dismissTimerRef.current);
    }

    setOpenedCards((current) => (current.includes(index) ? current : [...current, index].sort((a, b) => a - b)));
    setActiveGift(gift);
    setSelectedIndex(index);
    setCardOpen(false);
    setCardVisible(false);
    setSpecialReveal(false);

    if (gift.special) {
      setOpeningGift(false);
      setSpecialReveal(true);
      return;
    }

    setOpeningGift(true);
    revealTimerRef.current = window.setTimeout(() => {
      setOpeningGift(false);
      setCardVisible(true);
    }, 900);
  };

  const handleCloseCard = () => {
    setCardVisible(false);
    setCardOpen(false);
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (!cardVisible) {
      return;
    }

    if (dismissTimerRef.current) {
      window.clearTimeout(dismissTimerRef.current);
    }

    dismissTimerRef.current = window.setTimeout(() => {
      handleCloseCard();
    }, 5000);

    return () => {
      if (dismissTimerRef.current) {
        window.clearTimeout(dismissTimerRef.current);
      }
    };
  }, [cardVisible, activeGift]);

  const handleRandomPick = () => {
    const availableIndexes = gifts
      .map((_, index) => index)
      .filter((index) => !openedCards.includes(index));

    if (!availableIndexes.length) {
      return;
    }

    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    handleOpen(gifts[randomIndex], randomIndex);
  };

  const handleProposalYes = () => {
    try {
      if (onYes) onYes();
    } catch (e) {
      // swallow to avoid breaking UI
    }

    // hide special reveal and show congrats modal
    setSpecialReveal(false);
    setCardVisible(false);
    setCongratsVisible(true);

    if (congratsTimerRef.current) window.clearTimeout(congratsTimerRef.current);
    congratsTimerRef.current = window.setTimeout(() => {
      setCongratsVisible(false);
    }, 5000);
  };

  const currentProgress = openedCards.length;

  return (
    <div className="gift-experience">
      <div className="gift-experience__actions">
        <button type="button" className="gift-random-btn" onClick={handleRandomPick}>
          Pick a random card
        </button>
      </div>

      <div className="gift-grid">
        {gifts.map((gift, index) => {
          const isOpen = openedCards.includes(index);
          const isActive = activeGift?.title === gift.title;
          const isSelected = selectedIndex === index;

          return (
            <motion.button
              key={gift.title}
              type="button"
              layoutId={`gift-${index}`}
              className={`gift-box ${gift.theme} ${isOpen ? 'gift-box--open' : ''} ${gift.special ? 'gift-box--special' : ''} ${isActive ? 'gift-box--active' : ''} ${isSelected ? 'gift-box--selected' : ''}`}
              onClick={() => handleOpen(gift, index)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <motion.div className="gift-box__ribbon" animate={isOpen ? { rotate: 8, y: -4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.35 }} />
              <motion.div className="gift-box__lid" animate={isOpen ? { y: -12, rotateX: 60 } : { y: 0, rotateX: 0 }} transition={{ duration: 0.4 }} />
              <motion.span className="gift-box__label" animate={isOpen ? { y: 6, scale: 0.94 } : { y: 0, scale: 1 }} transition={{ duration: 0.35 }}>{gift.title}</motion.span>
              {isOpen ? <span className="gift-box__note">✓ Opened</span> : null}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {openingGift && activeGift ? (
          <motion.div
            className="gift-opening-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`gift-opening-scene__box ${activeGift.theme}`}
              initial={{ scale: 0.75, y: 24, rotate: -8, opacity: 0.65 }}
              animate={{ scale: 1.08, y: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.div className="gift-box__ribbon" animate={{ rotate: 8, y: -4 }} transition={{ duration: 0.4 }} />
              <motion.div className="gift-box__lid" animate={{ y: -12, rotateX: 60 }} transition={{ duration: 0.45 }} />
              <span className="gift-opening-scene__label">{activeGift.title}</span>
              <div className="gift-opening-scene__sparkles">
                <span />
                <span />
                <span />
              </div>
            </motion.div>
            <div className="gift-opening-scene__hearts">
              <span>💗</span>
              <span>💖</span>
              <span>✨</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {cardVisible && activeGift && !specialReveal ? (
          <motion.div
            key={activeGift.title}
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
              <motion.div
                className="modal opened-card"
                layoutId={`gift-${selectedIndex}`}
                initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
                transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                role="dialog"
                aria-modal="true"
              >
                <button className="modal__close" onClick={handleCloseCard} aria-label="Close">×</button>
                <div className="opened-card__decor">✨ <span className="opened-card__heart">❤️</span> ✨</div>
                <h3 className="opened-card__eyebrow">FOR SOMEONE SPECIAL</h3>
                <motion.div className="opened-card__message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.55 }}>
                  {activeGift.message.split('\n').map((line, i) => (<p key={i}>{line}</p>))}
                </motion.div>
                <motion.div className="opened-card__signature" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>— With Love</motion.div>
              </motion.div>
              <div className="overlay-effects" aria-hidden="true">
                <div className="floating-hearts">
                  <span>💗</span>
                  <span>💖</span>
                  <span>💘</span>
                  <span>✨</span>
                </div>
                <div className="soft-particles" />
                <div className="falling-petals">
                  {Array.from({ length: 10 }).map((_, i) => (<span key={i} />))}
                </div>
              </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {specialReveal && activeGift ? (
          <motion.div
            key="special"
            className="special-gift-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="special-gift-scene__backdrop" />
            <div className="special-gift-scene__glow" />
            <div className="special-gift-scene__sparkles" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <span key={index} style={{ ['--delay' + index]: `${index * 0.12}s` }} />
              ))}
            </div>
            <motion.div
              className="special-gift-scene__content"
              initial={{ opacity: 5, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="special-gift-scene__eyebrow">A secret world inside the gift</p>
              <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                One thing I wanted to ask you all along...
              </motion.h3>

              <motion.h2 initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.0 }}>
                ❤️ Do you like me? ❤️
              </motion.h2>
              <div className="gift-proposal__actions">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn btn--yes" onClick={handleProposalYes}>
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {congratsVisible ? (
          <motion.div
            key="congrats"
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35 }}
              role="dialog"
              aria-modal="true"
            >
              <button className="modal__close" onClick={() => setCongratsVisible(false)} aria-label="Close">×</button>
              <h2 style={{ marginTop: 4 }}>Congratulations!</h2>
              <p style={{ margin: '8px 0 0' }}>They said yes — celebrate this moment ❤️</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
