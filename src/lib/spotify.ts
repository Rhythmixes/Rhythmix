import { Playlist } from '../types/spotifyTypes'; // 타입 가져오기

const API_URL = 'https://api.spotify.com/v1';

// Spotify Access Token 설정
let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

// 플레이리스트 가져오기
export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  if (!accessToken) {
    throw new Error('Access token is not set');
  }

  const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlist');
  }

  const data = await response.json();
  return data; // Playlist 타입에 맞는 데이터를 반환
};
