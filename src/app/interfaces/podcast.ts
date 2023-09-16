export interface PodcastInterface {
  id: string;
  name: string;
  artist: string;
  image: string;
  summary: string;
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: Date;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface EpisodeDetailInterface {
  artworkUrl160: string;
  previewUrl: string;
  artworkUrl600: string;
  artworkUrl60: string;
  episodeUrl: string;
  contentAdvisoryRating: string;
  trackViewUrl: string;
  episodeFileExtension: string;
  episodeContentType: string;
  feedUrl: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  description: string;
  releaseDate: Date;
  trackId: number;
  trackName: string;
  artistIds: any[];
  shortDescription: string;
  country: string;
  collectionViewUrl: string;
  trackTimeMillis: number;
  genres: Genre[];
  episodeGuid: string;
  kind: string;
  wrapperType: string;
}

export interface Genre {
  name: string;
  id: string;
}
