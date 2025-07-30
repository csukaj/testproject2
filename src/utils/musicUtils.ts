// Utility functions for the music player

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (seconds: number): string => {
  return formatTime(seconds);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  let lastCall = 0;
  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  }) as T;
};

// Generate a simple color based on string (for album art placeholders)
export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

// Local storage helpers for user preferences
export const getStoredVolume = (): number => {
  const stored = localStorage.getItem('musicPlayer_volume');
  return stored ? parseFloat(stored) : 0.7;
};

export const setStoredVolume = (volume: number): void => {
  localStorage.setItem('musicPlayer_volume', volume.toString());
};

export const getStoredMuted = (): boolean => {
  const stored = localStorage.getItem('musicPlayer_muted');
  return stored === 'true';
};

export const setStoredMuted = (muted: boolean): void => {
  localStorage.setItem('musicPlayer_muted', muted.toString());
};

export const getStoredRepeatMode = (): 'off' | 'one' | 'all' => {
  const stored = localStorage.getItem('musicPlayer_repeatMode') as 'off' | 'one' | 'all';
  return ['off', 'one', 'all'].includes(stored) ? stored : 'off';
};

export const setStoredRepeatMode = (mode: 'off' | 'one' | 'all'): void => {
  localStorage.setItem('musicPlayer_repeatMode', mode);
};

export const getStoredShuffleMode = (): boolean => {
  const stored = localStorage.getItem('musicPlayer_shuffleMode');
  return stored === 'true';
};

export const setStoredShuffleMode = (shuffle: boolean): void => {
  localStorage.setItem('musicPlayer_shuffleMode', shuffle.toString());
};