import { useEffect, useState } from 'react';
import { getPlaylist } from '../lib/spotify';
import { Playlist } from '../types/spotifyTypes'; // 타입을 가져옴

const usePlaylist = (playlistId: string) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylist(playlistId);
        setPlaylist(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch playlist');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  return { playlist, loading, error };
};

export default usePlaylist;
