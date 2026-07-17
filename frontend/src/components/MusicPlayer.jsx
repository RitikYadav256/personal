import { useEffect, useRef, useState } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.2;
    audio.loop = true;
  }, []);

  const toggle = () => {
    if (!audioRef.current) {
      return;
    }

    if (enabled) {
      audioRef.current.pause();
      setEnabled(false);
      return;
    }

    audioRef.current.play().catch(() => {
      setEnabled(false);
    });
    setEnabled(true);
  };

  return (
    <div className="music-player">
      <button className="icon-btn" onClick={toggle} title="Background music">
        {enabled ? <FiVolume2 /> : <FiVolumeX />}
      </button>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </div>
  );
}
