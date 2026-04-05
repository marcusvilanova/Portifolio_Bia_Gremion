import { useAudio } from '../../context/AudioContext';
import '../../styles/components/_audio_controls.scss';

export const AudioControls = () => {
  const { isMuted, toggleMute, isPlaying } = useAudio();

  if (!isPlaying) return null;

  return (
    <div className="audio-controls-wrap reveal-on-scroll">
      <button 
        className={`audio-toggle ${isMuted ? 'muted' : ''}`} 
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
      >
        <div className="sound-waves">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className={`wave wave-${i} ${isMuted ? 'paused' : 'playing'}`}></span>
          ))}
        </div>
        <span className="audio-label">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
      </button>
    </div>
  );
};
