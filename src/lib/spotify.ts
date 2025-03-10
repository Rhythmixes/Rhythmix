// src/lib/spotify.ts

const API_URL = 'https://api.spotify.com/v1';

// Spotify Access Token 설정
let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

// 플레이리스트 가져오기
export const getPlaylist = async (playlistId: string) => {
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

  return await response.json();
};

// 다른 Spotify API 함수들 추가 가능
