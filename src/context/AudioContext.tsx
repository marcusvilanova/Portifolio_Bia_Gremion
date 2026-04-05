import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isAvailable: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  startAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioSrc = '/audio/background-music.mp3';
    
    // Check if file exists via HEAD request
    fetch(audioSrc, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          audioRef.current = new Audio(audioSrc);
          audioRef.current.loop = true;
          audioRef.current.volume = 0.4;
          setIsAvailable(true);
        }
      })
      .catch(() => setIsAvailable(false));

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const startAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsAvailable(false));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, isAvailable, togglePlay, toggleMute, startAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
