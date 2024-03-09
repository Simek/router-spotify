export type BaseListResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

export type ListResponse<T> = BaseListResponse & {
  items: T[];
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type User = ContextObject & {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  followers: {
    href: string;
    total: number;
  };
  id: string;
  images: Image[];
  product: string;
};

export type Artist = ContextObject & {
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: "artist";
};

export type TopArtists = ListResponse<Artist>;

export type Album = ContextObject & {
  id: string;
  name: string;
  artists: Artist[];
  total_tracks: string;
  images: Image[];
};

export type Track = ContextObject & {
  artists: Artist[];
  album: Album;
  explicit: boolean;
  track_number: number;
  duration_ms: number;
  popularity: number;
  id: string;
  name: string;
  preview_url?: string;
};

export type TopTracks = ListResponse<Track>;

export type Playlist = {
  href: string;
  id: string;
  name: string;
  images: Image[];
};

export type SearchPlaylist = BaseListResponse & {
  playlists: {
    items: Playlist[];
  };
};

export type SearchAlbums = BaseListResponse & {
  albums: {
    items: Album[];
  };
};

export type PlayerState = {
  timestamp: number;
  device: UserDevice;
  // actions: ActionsObject;
  progress_ms: number | null;
  is_playing: boolean;
  item: Track;
  context: ContextObject | null;
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
};

export type UserDevice = {
  id: string | null;
  is_active: boolean;
  is_restricted: boolean;
  is_private_session: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
};

export type ContextObject = {
  type: "artist" | "playlist" | "album" | "show" | "episode";
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
};
