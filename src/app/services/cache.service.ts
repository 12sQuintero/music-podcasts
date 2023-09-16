import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  EpisodeDetailInterface,
  PodcastInterface,
} from '../interfaces/podcast';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  /**
   * save data localStorage
   * @param data data to store
   * @param key key of data
   */
  private setCacheData(data: any, key: string): void {
    const cache = JSON.parse(localStorage.getItem(key) ?? '{}');

    cache[key] = {
      data,
      expiry: Date.now() + environment.CACHE_TIME,
    };

    localStorage.setItem(key, JSON.stringify(cache));
  }

  /**
   * @param key cache key
   * @returns localStoraged date with the key, null when no data
   */
  private getCacheDataKey(key: string): undefined | null {
    const cache = JSON.parse(localStorage.getItem(key) ?? '{}');

    if (cache && cache[key] && cache[key].expiry > Date.now()) {
      return cache[key].data;
    }
    return null;
  }

  /**
   * get podcasts by cache
   */
  get podcastsCache(): any {
    return this.getCacheDataKey(environment.CACHE_PODCAST_KEY);
  }
  /**
   * @param id podcast id
   * @returns details of podcast by cache
   */
  getDetailsCache(id: string): any {
    return this.getCacheDataKey(id);
  }
  /**
   * set podcasts cache
   */
  setPodcatsCache(podcasts: PodcastInterface[]): void {
    this.setCacheData(podcasts, environment.CACHE_PODCAST_KEY);
  }

  /**
   * set podcasts details cache by podcasts id
   */
  setPodcatsDetailsCache(details: {
    podcast: PodcastInterface;
    episodes: EpisodeDetailInterface;
  }): void {
    const {
      podcast: { collectionId: podcastId },
    } = details;
    this.setCacheData(details, podcastId.toString());
  }
}
