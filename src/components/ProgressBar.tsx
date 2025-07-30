import React, { useRef, useState } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSeek(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSeek = (e: React.MouseEvent) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    const newTime = percentage * duration;

    onSeek(newTime);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleTouchSeek(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleTouchSeek(e);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchSeek = (e: React.TouchEvent) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    const touchX = touch.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, touchX / width));
    const newTime = percentage * duration;

    onSeek(newTime);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="progress-bar-container"
      ref={progressRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
        <div 
          className="progress-thumb"
          style={{ left: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;