import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
  setCacheData(data: any, key: string = environment.CACHE_PODCAST_KEY): void {
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
  getCacheDataKey(key: string): undefined | null {
    const cache = JSON.parse(localStorage.getItem(key) ?? '{}');

    if (cache && cache[key] && cache[key].expiry > Date.now()) {
      return cache[key].data;
    }
    return null;
  }

  get podcastsCache(): any {
    return this.getCacheDataKey(environment.CACHE_PODCAST_KEY);
  }
}
