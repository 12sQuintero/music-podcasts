const CACHE_HOURS = 24;

export const environment = {
  CACHE_PODCAST_KEY: 'podcastsCacheKEY',
  CACHE_TIME: 3600000 * CACHE_HOURS,
  URL_PODCAST:
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
  URL_DETAILS: (id: string) =>
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
};
