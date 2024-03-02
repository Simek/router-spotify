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

export type User = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};

export type TopArtists = ListResponse<Artist>;

export type Album = {
  href: string;
  id: string;
  name: string;
  artists: Artist[];
  total_tracks: string;
  images: Image[];
};

export type Track = {
  artist: Artist;
  album: Album;
  explicit: boolean;
  track_number: number;
  duration_ms: number;
  popularity: number;
  href: string;
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
