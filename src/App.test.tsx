import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders music player application', async () => {
  render(<App />);
  
  // Check for the app title in header
  const titleElement = screen.getByRole('heading', { name: /🎵 Music Player/i });
  expect(titleElement).toBeInTheDocument();
  
  // Check for the subtitle
  const subtitleElement = screen.getByText(/Your personal music streaming experience/i);
  expect(subtitleElement).toBeInTheDocument();
  
  // Check for navigation buttons
  const songListButton = screen.getByRole('button', { name: /📝 Song List/i });
  const libraryButton = screen.getByRole('button', { name: /📚 Library/i });
  expect(songListButton).toBeInTheDocument();
  expect(libraryButton).toBeInTheDocument();
  
  // Check for search input
  const searchInput = screen.getByPlaceholderText(/Search songs, artists, albums, genres.../i);
  expect(searchInput).toBeInTheDocument();
  
  // Wait for the loading to complete and songs to load
  await waitFor(() => {
    const loadingElement = screen.queryByText(/Loading songs.../i);
    expect(loadingElement).not.toBeInTheDocument();
  }, { timeout: 3000 });
});
