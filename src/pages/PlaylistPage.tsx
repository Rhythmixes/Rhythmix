import { Playlist } from '../types/spotifyTypes'; // Playlist 타입 불러오기

const API_URL = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

let accessToken: string = '';

async function fetchAccessToken(): Promise<string> {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify API credentials');
  }

  const encoded = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Error getting access token: ${await response.text()}`);
  }

  const data = await response.json();
  accessToken = data.access_token || '';
  return accessToken;
}

export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  if (!accessToken) {
    accessToken = await fetchAccessToken();
  }

  const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // 토큰 만료 시 갱신 후 재시도
    accessToken = await fetchAccessToken();
    return getPlaylist(playlistId);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch playlist: ${await response.text()}`);
  }

  return await response.json();
};
