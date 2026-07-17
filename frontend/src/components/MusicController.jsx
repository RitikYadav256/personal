import { useEffect, useMemo, useRef, useState } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

export default function MusicController({ enabled, onToggle }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const icon = useMemo(() => (isMuted ? FiVolumeX : FiVolume2), [isMuted]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = 0.25;
    audioRef.current.loop = true;
  }, []);

  const handleToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    onToggle?.(nextMuted);
  };

  const Icon = icon;

  return (
    <div className="music-controller">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto" />
      <button type="button" className="icon-btn" onClick={handleToggle} aria-label="Toggle audio">
        <Icon />
      </button>
    </div>
  );
}
