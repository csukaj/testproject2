import React from 'react';
import './PlayerControls.css';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onRepeatToggle: () => void;
  onShuffleToggle: () => void;
  repeatMode: 'off' | 'one' | 'all';
  shuffleMode: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlay,
  onNext,
  onPrevious,
  onRepeatToggle,
  onShuffleToggle,
  repeatMode,
  shuffleMode,
  hasNext,
  hasPrevious
}) => {
  return (
    <div className="player-controls">
      <button 
        className={`control-btn shuffle-btn ${shuffleMode ? 'active' : ''}`}
        onClick={onShuffleToggle}
        title="Shuffle"
      >
        🔀
      </button>

      <button 
        className="control-btn prev-btn"
        onClick={onPrevious}
        disabled={!hasPrevious}
        title="Previous"
      >
        ⏮️
      </button>

      <button 
        className="control-btn play-btn"
        onClick={onPlay}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      <button 
        className="control-btn next-btn"
        onClick={onNext}
        disabled={!hasNext}
        title="Next"
      >
        ⏭️
      </button>

      <button 
        className={`control-btn repeat-btn ${repeatMode !== 'off' ? 'active' : ''}`}
        onClick={onRepeatToggle}
        title={`Repeat: ${repeatMode}`}
      >
        {repeatMode === 'one' ? '🔂' : '🔁'}
      </button>
    </div>
  );
};

export default PlayerControls;