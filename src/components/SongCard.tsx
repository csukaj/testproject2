import React from 'react';
import { Song } from '../types/music';
import { formatTime } from '../utils/musicUtils';
import './SongCard.css';

interface SongCardProps {
  song: Song;
  trackNumber: number;
  isCurrentSong: boolean;
  onSelect: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  trackNumber, 
  isCurrentSong, 
  onSelect 
}) => {
  return (
    <div 
      className={`song-card ${isCurrentSong ? 'current' : ''}`}
      onClick={onSelect}
    >
      <div className="track-number">
        {isCurrentSong ? '▶️' : trackNumber}
      </div>
      
      <div className="song-info">
        <div className="title">{song.title}</div>
        <div className="artist">{song.artist}</div>
      </div>
      
      <div className="artist-desktop">{song.artist}</div>
      <div className="album">{song.album}</div>
      <div className="duration">{formatTime(song.duration)}</div>
      
      <div className="song-actions">
        <button 
          className="play-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          title="Play"
        >
          {isCurrentSong ? '⏸️' : '▶️'}
        </button>
      </div>
    </div>
  );
};

export default SongCard;