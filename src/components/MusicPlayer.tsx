import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Song, PlayerState } from '../types/music';
import { musicService } from '../services/musicService';
import { 
  formatTime, 
  getStoredVolume, 
  getStoredMuted, 
  getStoredRepeatMode, 
  getStoredShuffleMode,
  setStoredVolume,
  setStoredMuted,
  setStoredRepeatMode,
  setStoredShuffleMode,
  shuffleArray
} from '../utils/musicUtils';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import './MusicPlayer.css';

interface MusicPlayerProps {
  currentSong: Song | null;
  playlist: Song[];
  onSongChange: (song: Song) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  currentSong, 
  playlist, 
  onSongChange 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: getStoredVolume(),
    isMuted: getStoredMuted(),
    repeatMode: getStoredRepeatMode(),
    shuffleMode: getStoredShuffleMode()
  });

  const [shuffledPlaylist, setShuffledPlaylist] = useState<Song[]>([]);

  // Update current song when prop changes
  useEffect(() => {
    if (currentSong && currentSong.id !== playerState.currentSong?.id) {
      setPlayerState(prev => ({
        ...prev,
        currentSong: currentSong,
        currentTime: 0,
        duration: currentSong.duration
      }));
    }
  }, [currentSong, playerState.currentSong?.id]);

  // Update shuffled playlist when playlist or shuffle mode changes
  useEffect(() => {
    if (playerState.shuffleMode) {
      setShuffledPlaylist(shuffleArray(playlist));
    } else {
      setShuffledPlaylist(playlist);
    }
  }, [playlist, playerState.shuffleMode]);

  const handleNext = useCallback(() => {
    const currentIndex = shuffledPlaylist.findIndex(song => 
      song.id === playerState.currentSong?.id
    );
    
    if (currentIndex === -1) return;

    let nextIndex;
    if (playerState.repeatMode === 'one') {
      nextIndex = currentIndex;
    } else if (playerState.repeatMode === 'all' && currentIndex === shuffledPlaylist.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex < shuffledPlaylist.length) {
      onSongChange(shuffledPlaylist[nextIndex]);
    }
  }, [shuffledPlaylist, playerState.currentSong?.id, playerState.repeatMode, onSongChange]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setPlayerState(prev => ({
        ...prev,
        duration: audio.duration || prev.currentSong?.duration || 0
      }));
    };

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime
      }));
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleCanPlay = () => {
      if (playerState.isPlaying) {
        audio.play();
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [playerState.isPlaying, handleNext]);

  // Update audio properties when player state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = playerState.isMuted ? 0 : playerState.volume;
  }, [playerState.volume, playerState.isMuted]);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !playerState.currentSong) return;

    try {
      if (playerState.isPlaying) {
        audio.pause();
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      } else {
        await audio.play();
        setPlayerState(prev => ({ ...prev, isPlaying: true }));
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handlePrevious = () => {
    const currentIndex = shuffledPlaylist.findIndex(song => 
      song.id === playerState.currentSong?.id
    );
    
    if (currentIndex === -1) return;

    let prevIndex;
    if (playerState.repeatMode === 'all' && currentIndex === 0) {
      prevIndex = shuffledPlaylist.length - 1;
    } else {
      prevIndex = currentIndex - 1;
    }

    if (prevIndex >= 0) {
      onSongChange(shuffledPlaylist[prevIndex]);
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  };

  const handleVolumeChange = (volume: number) => {
    setPlayerState(prev => ({ ...prev, volume }));
    setStoredVolume(volume);
  };

  const handleMuteToggle = () => {
    setPlayerState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    setStoredMuted(!playerState.isMuted);
  };

  const handleRepeatToggle = () => {
    const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
    const currentIndex = modes.indexOf(playerState.repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    
    setPlayerState(prev => ({ ...prev, repeatMode: nextMode }));
    setStoredRepeatMode(nextMode);
  };

  const handleShuffleToggle = () => {
    const newShuffleMode = !playerState.shuffleMode;
    setPlayerState(prev => ({ ...prev, shuffleMode: newShuffleMode }));
    setStoredShuffleMode(newShuffleMode);
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={playerState.currentSong ? musicService.getSongAudioUrl(playerState.currentSong) : undefined}
        preload="metadata"
      />
      
      {playerState.currentSong && (
        <div className="now-playing">
          <div className="song-info">
            <img 
              src={playerState.currentSong.albumArt} 
              alt={playerState.currentSong.album}
              className="album-art"
            />
            <div className="track-info">
              <h3 className="track-title">{playerState.currentSong.title}</h3>
              <p className="track-artist">{playerState.currentSong.artist}</p>
              <p className="track-album">{playerState.currentSong.album}</p>
            </div>
          </div>
        </div>
      )}

      <div className="player-controls-section">
        <PlayerControls
          isPlaying={playerState.isPlaying}
          onPlay={handlePlay}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onRepeatToggle={handleRepeatToggle}
          onShuffleToggle={handleShuffleToggle}
          repeatMode={playerState.repeatMode}
          shuffleMode={playerState.shuffleMode}
          hasNext={shuffledPlaylist.findIndex(s => s.id === playerState.currentSong?.id) < shuffledPlaylist.length - 1}
          hasPrevious={shuffledPlaylist.findIndex(s => s.id === playerState.currentSong?.id) > 0}
        />

        <ProgressBar
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          onSeek={handleSeek}
        />

        <div className="time-display">
          <span className="current-time">{formatTime(playerState.currentTime)}</span>
          <span className="duration">{formatTime(playerState.duration)}</span>
        </div>
      </div>

      <VolumeControl
        volume={playerState.volume}
        isMuted={playerState.isMuted}
        onVolumeChange={handleVolumeChange}
        onMuteToggle={handleMuteToggle}
      />
    </div>
  );
};

export default MusicPlayer;