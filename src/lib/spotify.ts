// src/lib/spotify.ts

import SpotifyWebApi from 'spotify-web-api-js';

// Spotify API 인스턴스 생성
const spotifyApi = new SpotifyWebApi();

// Access token 설정
// (로그인 후 얻은 액세스 토큰을 여기에 설정해야 합니다)
const setAccessToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};

// 플레이리스트 가져오기
export const getPlaylist = async (playlistId: string) => {
  try {
    const response = await spotifyApi.getPlaylist(playlistId);
    return response;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

// 다른 Spotify API 함수들 추가 가능
