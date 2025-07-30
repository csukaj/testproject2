import React, { useState, useEffect } from 'react';
import { Song, MusicLibrary } from './types/music';
import { musicService } from './services/musicService';
import MusicPlayer from './components/MusicPlayer';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import LibraryView from './components/LibraryView';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [library, setLibrary] = useState<MusicLibrary | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'library'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data
  useEffect(() => {
    const loadMusic = async () => {
      try {
        setIsLoading(true);
        const [songs, musicLibrary] = await Promise.all([
          musicService.getAllSongs(),
          musicService.getMusicLibrary()
        ]);
        
        setPlaylist(songs);
        setFilteredSongs(songs);
        setLibrary(musicLibrary);
        
        // Set first song as current if no song is selected
        if (songs.length > 0 && !currentSong) {
          setCurrentSong(songs[0]);
        }
      } catch (error) {
        console.error('Failed to load music:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMusic();
  }, [currentSong]);

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      if (query.trim() === '') {
        setFilteredSongs(playlist);
      } else {
        const results = await musicService.searchSongs(query);
        setFilteredSongs(results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  // Handle song selection
  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
  };

  // Handle category selection in library view
  const handleCategorySelect = async (category: 'artists' | 'albums' | 'genres', value: string) => {
    try {
      let songs: Song[] = [];
      
      switch (category) {
        case 'artists':
          songs = await musicService.getSongsByArtist(value);
          break;
        case 'albums':
          songs = await musicService.getSongsByAlbum(value);
          break;
        case 'genres':
          songs = await musicService.getSongsByGenre(value);
          break;
      }
      
      setFilteredSongs(songs);
      setActiveView('list');
      
      // Set first song from filtered results as current
      if (songs.length > 0) {
        setCurrentSong(songs[0]);
      }
    } catch (error) {
      console.error('Failed to load category songs:', error);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">🎵 Music Player</h1>
        <p className="app-subtitle">Your personal music streaming experience</p>
      </header>

      <main className="app-main">
        {/* Music Player */}
        <div className="player-section">
          <MusicPlayer
            currentSong={currentSong}
            playlist={activeView === 'list' ? filteredSongs : playlist}
            onSongChange={handleSongSelect}
          />
        </div>

        {/* Navigation */}
        <div className="navigation">
          <button
            className={`nav-btn ${activeView === 'list' ? 'active' : ''}`}
            onClick={() => setActiveView('list')}
          >
            📝 Song List
          </button>
          <button
            className={`nav-btn ${activeView === 'library' ? 'active' : ''}`}
            onClick={() => setActiveView('library')}
          >
            📚 Library
          </button>
        </div>

        {/* Content Area */}
        <div className="content-section">
          {activeView === 'list' ? (
            <>
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search songs, artists, albums, genres..."
              />
              <SongList
                songs={filteredSongs}
                currentSong={currentSong}
                onSongSelect={handleSongSelect}
                isLoading={isLoading}
              />
              {searchQuery && (
                <div className="search-results-info">
                  Found {filteredSongs.length} result{filteredSongs.length !== 1 ? 's' : ''} for "{searchQuery}"
                </div>
              )}
            </>
          ) : (
            library && (
              <LibraryView
                library={library}
                currentSong={currentSong}
                onSongSelect={handleSongSelect}
                onCategorySelect={handleCategorySelect}
              />
            )
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Music Player - Built with React & TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
