import { Playlist } from '../types/spotifyTypes';

const API_URL = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

let accessToken: string = '';

export function setAccessToken(token: string) {
  accessToken = token;
}

export function getAccessToken(): string {
  return accessToken;
}

export async function fetchAccessToken(): Promise<string> {
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
  setAccessToken(data.access_token || '');
  return getAccessToken();
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
//api 연결 되었는지 토큰 출력으로 확인
// fetchAccessToken()
//   .then((token) => {
//     console.log('🎵 테스트용 토큰:', token);
//   })
//   .catch((err) => {
//     console.error('토큰 가져오기 실패:', err);
//   });

export { accessToken }; // accessToken 직접 내보내기 가능
