export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number; // in seconds
  year?: number;
  track?: number;
  albumArt?: string;
  filePath: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  createdAt: Date;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode: 'off' | 'one' | 'all';
  shuffleMode: boolean;
}

export interface MusicLibrary {
  songs: Song[];
  artists: string[];
  albums: string[];
  genres: string[];
}