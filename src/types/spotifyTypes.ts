export interface Artist {
  id: string;
  name: string;
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
}

export interface PlaylistItem {
  track: Track;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: {
    items: PlaylistItem[];
  };
}
