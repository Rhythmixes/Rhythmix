// src/hooks/usePlaylist.ts
import { useEffect, useState } from 'react';
import { getPlaylist } from '../lib/spotify'; // getPlaylist 가져오기
import { Playlist } from '../types/spotifyTypes'; // Playlist 타입 가져오기

const usePlaylist = (playlistId: string) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylist(playlistId); // 플레이리스트 ID로 데이터 가져오기
        setPlaylist(data); // 상태 업데이트
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // 에러 메시지 설정
        } else {
          setError('Failed to fetch playlist');
        }
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  return { playlist, loading, error };
};

export default usePlaylist;
