import { useState } from 'react';
import reactLogo from './assets/react.svg';
import appLogo from '/favicon.svg';
import PWABadge from './PWABadge.tsx';
import './App.css';
import { Button } from './components/ui/button.tsx';
import { getPlaylist, setAccessToken } from './lib/spotify';
import { Playlist } from './types/spotifyTypes';
import { fetchAccessToken } from './lib/spotify';

function App() {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const handleFetchPlaylist = async () => {
    try {
      const token = await fetchAccessToken(); // 🔥 실제 액세스 토큰 가져오기
      setAccessToken(token);
      console.log('✅ 설정된 액세스 토큰:', token); // 🚀 콘솔에서 확인

      const data = await getPlaylist('3cEYpjA9oz9GiPac4AsH4n'); // 테스트 플레이리스트 ID
      setPlaylist(data);
    } catch (error) {
      console.error('❌ 플레이리스트 가져오기 실패:', error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={appLogo} className="logo" alt="Rhythmix logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rhythmix</h1>
      <div className="card">
        <Button onClick={handleFetchPlaylist}>플레이리스트 가져오기</Button>
      </div>
      {playlist && (
        <div>
          <h2>{playlist.name}</h2>
          <ul>
            {playlist.tracks.items.map(({ track }) => (
              <li key={track.id}>
                {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
      <PWABadge />
    </>
  );
}

export default App;
