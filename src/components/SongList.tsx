import React from 'react';
import { Song } from '../types/music';
import SongCard from './SongCard';
import './SongList.css';

interface SongListProps {
  songs: Song[];
  currentSong: Song | null;
  onSongSelect: (song: Song) => void;
  isLoading?: boolean;
}

const SongList: React.FC<SongListProps> = ({ 
  songs, 
  currentSong, 
  onSongSelect, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="song-list loading">
        <div className="loading-spinner">Loading songs...</div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="song-list empty">
        <div className="empty-state">
          <h3>No songs found</h3>
          <p>Try adjusting your search or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="song-list">
      <div className="song-list-header">
        <span className="track-number">#</span>
        <span className="title">Title</span>
        <span className="artist">Artist</span>
        <span className="album">Album</span>
        <span className="duration">Duration</span>
      </div>
      
      <div className="song-list-content">
        {songs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            trackNumber={index + 1}
            isCurrentSong={currentSong?.id === song.id}
            onSelect={() => onSongSelect(song)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;