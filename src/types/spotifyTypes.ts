export interface Track {
  id: string;
  name: string;
  artist: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}
