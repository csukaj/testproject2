import React, { useState } from 'react';
import { Song, MusicLibrary } from '../types/music';
import './LibraryView.css';

interface LibraryViewProps {
  library: MusicLibrary;
  onSongSelect: (song: Song) => void;
  onCategorySelect: (category: 'artists' | 'albums' | 'genres', value: string) => void;
  currentSong: Song | null;
}

type ViewMode = 'songs' | 'artists' | 'albums' | 'genres';

const LibraryView: React.FC<LibraryViewProps> = ({
  library,
  onSongSelect,
  onCategorySelect,
  currentSong
}) => {
  const [activeView, setActiveView] = useState<ViewMode>('songs');

  const renderCategoryList = (items: string[], type: 'artists' | 'albums' | 'genres') => (
    <div className="category-list">
      {items.map((item) => (
        <div
          key={item}
          className="category-item"
          onClick={() => onCategorySelect(type, item)}
        >
          <div className="category-name">{item}</div>
          <div className="category-count">
            {library.songs.filter(song => 
              type === 'artists' ? song.artist === item :
              type === 'albums' ? song.album === item :
              song.genre === item
            ).length} songs
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'artists':
        return renderCategoryList(library.artists, 'artists');
      case 'albums':
        return renderCategoryList(library.albums, 'albums');
      case 'genres':
        return renderCategoryList(library.genres, 'genres');
      default:
        return (
          <div className="songs-grid">
            {library.songs.map((song) => (
              <div
                key={song.id}
                className={`song-grid-item ${currentSong?.id === song.id ? 'current' : ''}`}
                onClick={() => onSongSelect(song)}
              >
                <img 
                  src={song.albumArt} 
                  alt={song.album}
                  className="grid-album-art"
                />
                <h4 className="grid-song-title">{song.title}</h4>
                <p className="grid-song-artist">{song.artist}</p>
                <p className="grid-song-album">{song.album}</p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="library-view">
      <div className="library-tabs">
        <button
          className={`tab ${activeView === 'songs' ? 'active' : ''}`}
          onClick={() => setActiveView('songs')}
        >
          Songs ({library.songs.length})
        </button>
        <button
          className={`tab ${activeView === 'artists' ? 'active' : ''}`}
          onClick={() => setActiveView('artists')}
        >
          Artists ({library.artists.length})
        </button>
        <button
          className={`tab ${activeView === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveView('albums')}
        >
          Albums ({library.albums.length})
        </button>
        <button
          className={`tab ${activeView === 'genres' ? 'active' : ''}`}
          onClick={() => setActiveView('genres')}
        >
          Genres ({library.genres.length})
        </button>
      </div>

      <div className="library-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default LibraryView;