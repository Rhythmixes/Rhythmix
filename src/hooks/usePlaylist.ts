import { useEffect, useState } from 'react';
import { getPlaylist } from '../lib/spotify';
import { Playlist } from '../types/spotifyTypes'; // Playlist 타입 가져오기

export default function usePlaylist(playlistId: string) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const data = await getPlaylist(playlistId);
        setPlaylist(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylist();
  }, [playlistId]);

  return { playlist, loading, error };
}
