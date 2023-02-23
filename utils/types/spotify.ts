interface ExternalUrlObject {
  spotify: string;
}

interface ExternalIdObject {
  isrc?: string | undefined;
  ean?: string | undefined;
  upc?: string | undefined;
}

interface RestrictionsObject {
  reason: string;
}

interface CopyrightObject {
  text: string;
  type: "C" | "P";
}

interface ImageObject {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}

interface FollowersObject {
  href: null;
  total: number;
}

interface TrackLinkObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  type: "track";
  uri: string;
}

interface ContextObject {
  type: "artist" | "playlist" | "album" | "show" | "episode";
  href: string;
  external_urls: ExternalUrlObject;
  uri: string;
}

interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface AlbumObjectSimplified extends ContextObject {
  album_group?: "album" | "single" | "compilation" | "appears_on" | undefined;
  album_type: "album" | "single" | "compilation";
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: RestrictionsObject | undefined;
  type: "album";
  total_tracks: number;
}

interface AlbumObjectFull extends AlbumObjectSimplified {
  copyrights: CopyrightObject[];
  external_ids: ExternalIdObject;
  genres: string[];
  label: string;
  popularity: number;
  tracks: PagingObject<TrackObjectSimplified>;
}

interface ArtistObjectSimplified extends ContextObject {
  name: string;
  id: string;
  type: "artist";
}

export interface ArtistObjectFull extends ArtistObjectSimplified {
  followers: FollowersObject;
  genres: string[];
  images: ImageObject[];
  popularity: number;
}

interface TrackObjectSimplified {
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean | undefined;
  linked_from?: TrackLinkObject | undefined;
  restrictions?: RestrictionsObject | undefined;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
}

export interface TrackObjectFull extends TrackObjectSimplified {
  album: AlbumObjectSimplified;
  external_ids: ExternalIdObject;
  popularity: number;
  is_local?: boolean | undefined;
}

interface AlbumSearchResponse {
  albums: PagingObject<AlbumObjectSimplified>;
}

interface ArtistSearchResponse {
  artists: PagingObject<ArtistObjectFull>;
}

interface TrackSearchResponse {
  tracks: PagingObject<TrackObjectFull>;
}

export interface SearchResponse
  extends Partial<ArtistSearchResponse>,
    Partial<AlbumSearchResponse>,
    Partial<TrackSearchResponse> {}
