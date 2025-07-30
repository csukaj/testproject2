import React, { useRef } from 'react';
import './VolumeControl.css';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle
}) => {
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleVolumeSeek = (e: React.MouseEvent) => {
    if (!volumeRef.current) return;

    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));

    onVolumeChange(percentage);
  };

  const handleTouchSeek = (e: React.TouchEvent) => {
    if (!volumeRef.current) return;

    const rect = volumeRef.current.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    const touchX = touch.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, touchX / width));

    onVolumeChange(percentage);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 0.3) return '🔈';
    if (volume < 0.7) return '🔉';
    return '🔊';
  };

  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className="volume-control">
      <button 
        className="volume-btn"
        onClick={onMuteToggle}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {getVolumeIcon()}
      </button>
      
      <div 
        className="volume-slider"
        ref={volumeRef}
        onClick={handleVolumeSeek}
        onTouchStart={handleTouchSeek}
      >
        <div className="volume-track">
          <div 
            className="volume-fill"
            style={{ width: `${displayVolume * 100}%` }}
          />
          <div 
            className="volume-thumb"
            style={{ left: `${displayVolume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;