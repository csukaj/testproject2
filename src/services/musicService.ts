import { Song, MusicLibrary } from '../types/music';

// Mock data representing songs that would be served from a server
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Budapest',
    artist: 'George Ezra',
    album: 'Wanted on Voyage',
    genre: 'Folk Pop',
    duration: 200,
    year: 2014,
    track: 3,
    albumArt: 'https://via.placeholder.com/300x300/1e40af/ffffff?text=Budapest',
    filePath: '/music/george-ezra/budapest.mp3'
  },
  {
    id: '2',
    title: 'Counting Stars',
    artist: 'OneRepublic',
    album: 'Native',
    genre: 'Pop Rock',
    duration: 257,
    year: 2013,
    track: 5,
    albumArt: 'https://via.placeholder.com/300x300/dc2626/ffffff?text=Native',
    filePath: '/music/onerepublic/counting-stars.mp3'
  },
  {
    id: '3',
    title: 'Radioactive',
    artist: 'Imagine Dragons',
    album: 'Night Visions',
    genre: 'Alternative Rock',
    duration: 187,
    year: 2012,
    track: 1,
    albumArt: 'https://via.placeholder.com/300x300/7c3aed/ffffff?text=Night+Visions',
    filePath: '/music/imagine-dragons/radioactive.mp3'
  },
  {
    id: '4',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    genre: 'Pop',
    duration: 233,
    year: 2017,
    track: 4,
    albumArt: 'https://via.placeholder.com/300x300/059669/ffffff?text=Divide',
    filePath: '/music/ed-sheeran/shape-of-you.mp3'
  },
  {
    id: '5',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    genre: 'Funk',
    duration: 270,
    year: 2014,
    track: 7,
    albumArt: 'https://via.placeholder.com/300x300/ea580c/ffffff?text=Uptown+Special',
    filePath: '/music/mark-ronson/uptown-funk.mp3'
  },
  {
    id: '6',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Synthpop',
    duration: 200,
    year: 2019,
    track: 2,
    albumArt: 'https://via.placeholder.com/300x300/991b1b/ffffff?text=After+Hours',
    filePath: '/music/the-weeknd/blinding-lights.mp3'
  },
  {
    id: '7',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    genre: 'Pop',
    duration: 263,
    year: 2017,
    track: 9,
    albumArt: 'https://via.placeholder.com/300x300/059669/ffffff?text=Divide',
    filePath: '/music/ed-sheeran/perfect.mp3'
  },
  {
    id: '8',
    title: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    genre: 'Soul',
    duration: 285,
    year: 2011,
    track: 2,
    albumArt: 'https://via.placeholder.com/300x300/1f2937/ffffff?text=21',
    filePath: '/music/adele/someone-like-you.mp3'
  },
  {
    id: '9',
    title: 'Thunder',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    genre: 'Alternative Rock',
    duration: 187,
    year: 2017,
    track: 3,
    albumArt: 'https://via.placeholder.com/300x300/7c3aed/ffffff?text=Evolve',
    filePath: '/music/imagine-dragons/thunder.mp3'
  },
  {
    id: '10',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    album: '21',
    genre: 'Soul',
    duration: 228,
    year: 2011,
    track: 1,
    albumArt: 'https://via.placeholder.com/300x300/1f2937/ffffff?text=21',
    filePath: '/music/adele/rolling-in-the-deep.mp3'
  }
];

class MusicService {
  private songs: Song[] = mockSongs;

  // Get all songs
  getAllSongs(): Promise<Song[]> {
    return Promise.resolve([...this.songs]);
  }

  // Get song by ID
  getSongById(id: string): Promise<Song | null> {
    const song = this.songs.find(s => s.id === id) || null;
    return Promise.resolve(song);
  }

  // Search songs by query
  searchSongs(query: string): Promise<Song[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.songs.filter(song =>
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.album.toLowerCase().includes(lowerQuery) ||
      song.genre.toLowerCase().includes(lowerQuery)
    );
    return Promise.resolve(filtered);
  }

  // Get songs by artist
  getSongsByArtist(artist: string): Promise<Song[]> {
    const filtered = this.songs.filter(song => 
      song.artist.toLowerCase() === artist.toLowerCase()
    );
    return Promise.resolve(filtered);
  }

  // Get songs by album
  getSongsByAlbum(album: string): Promise<Song[]> {
    const filtered = this.songs.filter(song => 
      song.album.toLowerCase() === album.toLowerCase()
    );
    return Promise.resolve(filtered);
  }

  // Get songs by genre
  getSongsByGenre(genre: string): Promise<Song[]> {
    const filtered = this.songs.filter(song => 
      song.genre.toLowerCase() === genre.toLowerCase()
    );
    return Promise.resolve(filtered);
  }

  // Get music library structure
  getMusicLibrary(): Promise<MusicLibrary> {
    const artists = Array.from(new Set(this.songs.map(s => s.artist))).sort();
    const albums = Array.from(new Set(this.songs.map(s => s.album))).sort();
    const genres = Array.from(new Set(this.songs.map(s => s.genre))).sort();

    return Promise.resolve({
      songs: [...this.songs],
      artists,
      albums,
      genres
    });
  }

  // Format duration from seconds to MM:SS
  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // In a real implementation, this would return the actual audio file URL
  getSongAudioUrl(song: Song): string {
    // For demo purposes, return a placeholder or use Web Audio API to generate tones
    // In production, this would return: `${API_BASE_URL}${song.filePath}`
    return `https://www.soundjay.com/misc/sounds/bell-ringing-05.wav`; // Placeholder
  }
}

export const musicService = new MusicService();