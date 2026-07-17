import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RoseReveal from './components/RoseReveal';
import GiftBoxExperience from './components/GiftBoxExperience';
import SuccessScreen from './components/SuccessScreen';
import './styles/romance.css';

const teasingMessages = [
  'Think Again ❤️',
  'Are You Sure? 😜',
  'Give Me One Chance 💕',
  "I Won't Let You 😆",
];

function App() {
  const [proposed, setProposed] = useState(true);
  const [showRose, setShowRose] = useState(true);
  const [celebrating, setCelebrating] = useState(false);
  const [noMessage, setNoMessage] = useState('Think Again ❤️');
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [buttonLabel, setButtonLabel] = useState('NO');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowRose(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMove = (event) => {
      if (!proposed || celebrating) {
        return;
      }

      const { clientX, clientY } = event;
      const distance = Math.min(window.innerWidth, window.innerHeight) * 0.16;
      const rect = document.querySelector('.btn--no')?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const nearX = clientX > rect.left - distance && clientX < rect.right + distance;
      const nearY = clientY > rect.top - distance && clientY < rect.bottom + distance;
      if (nearX && nearY) {
        moveNoButton();
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [proposed, celebrating]);

  const moveNoButton = () => {
    const viewportWidth = window.innerWidth - 180;
    const viewportHeight = window.innerHeight - 180;
    const randomLeft = Math.random() * viewportWidth;
    const randomTop = Math.random() * viewportHeight;

    setNoButtonStyle({
      position: 'absolute',
      left: `${randomLeft}px`,
      top: `${randomTop}px`,
      transform: 'translate(0, 0)',
    });
    setNoMessage(teasingMessages[Math.floor(Math.random() * teasingMessages.length)]);
    setButtonLabel('NO');
  };

  const handleYes = () => {
    setCelebrating(true);
    setProposed(false);
    setTimeout(() => setCelebrating(false), 2200);
  };

  const handleNo = () => {
    if (celebrating) {
      return;
    }
    moveNoButton();
  };

  return (
    <div className="app app--dark">
      <div className="aurora" />

      <main className="app-shell app-shell--centered">
        {showRose ? (
          <RoseReveal />
        ) : proposed ? (
          <GiftBoxExperience
            onYes={handleYes}
            onNo={handleNo}
            noMessage={noMessage}
            noButtonStyle={noButtonStyle}
            buttonLabel={buttonLabel}
          />
        ) : (
          <SuccessScreen />
        )}
      </main>

      {celebrating ? <div className="confetti-layer" aria-hidden="true" /> : null}
      <motion.div
        className="page-glow"
        animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  );
}

export default App;
