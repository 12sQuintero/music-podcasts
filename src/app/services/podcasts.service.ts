import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { environment } from '../../environments/environment.development';
import { Observable, map, of, shareReplay } from 'rxjs';
import {
  EpisodeDetailInterface,
  PodcastInterface,
} from '../interfaces/podcast';

@Injectable({
  providedIn: 'root',
})
export class PodcastsService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  /**
   * get podcasts list
   */
  get podcasts() {
    const podcastCache = this.cacheService.podcastsCache;

    //not cacheded
    if (!podcastCache) return this.requestPodcasts();

    //cached
    return of(podcastCache);
  }

  /**
   * Return podcast info by Id or undefinded if not found
   * @param podcastId podcast id
   * @returns Observable podcast or undefined
   */
  getPodcast(podcastId: number | string): Observable<PodcastInterface[]> {
    const podcastCache = this.cacheService.podcastsCache;

    //not cacheded
    if (!podcastCache) return this.requestPodcasts(podcastId.toString());

    //cached
    return of(this.filterPodcastsListById(podcastCache, podcastId.toString()));
  }

  /**
   * Get podcast info and episodes
   * @param podcastId podcast id
   * @returns Observable of podcast info and episodes
   */
  getPodcastsDetails(podcastId: string): Observable<{
    podcast: PodcastInterface;
    episodes: EpisodeDetailInterface[];
  }> {
    const detailsCache = this.cacheService.getDetailsCache(podcastId);

    //not cacheded-details
    if (!detailsCache) return this.requestHttPodcastsDetails(podcastId);

    //cached
    return of(detailsCache);
  }

  /**
   * Get episode details by id
   * @param podcastId podcast id
   * @param episodeId episode id
   * @returns Episode info
   */
  getEpisodeDetails(
    podcastId: string,
    episodeId: number
  ): Observable<EpisodeDetailInterface> {
    return this.getPodcastsDetails(podcastId).pipe(
      map(({ episodes }: any) => {
        return episodes.find(
          (ep: EpisodeDetailInterface) => ep.trackId == episodeId
        );
      })
    );
  }

  /**
   * Get podcasts list , filtered by id if it's declared
   * @param podcastId podcast id
   * @returns podcasts list
   */
  private requestPodcasts(podcastId?: string): Observable<PodcastInterface[]> {
    return this.http.get<any>(environment.URL_PODCAST).pipe(
      shareReplay(1),
      //parse info to better usage
      map((response) => {
        const podcasts = this.parsePodcasts(response.feed.entry, podcastId);
        if (podcasts) {
          //cache data
          this.cacheService.setPodcatsCache(podcasts);
          return podcasts;
        }
        return [];
      })
    );
  }

  /**
   * request podcast and episodes from podcast
   * @param id podcast id
   * @returns Observable
   */
  private requestHttPodcastsDetails(podcastId: string): Observable<{
    podcast: PodcastInterface;
    episodes: EpisodeDetailInterface[];
  }> {
    return this.http
      .get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          environment.URL_DETAILS(podcastId)
        )}`
      )
      .pipe(
        shareReplay(1),

        map((data: any) => {
          const podcastDetails = JSON.parse(data.contents).results;

          const [podcast, ...episodes] = podcastDetails;

          //cache data episodes
          this.cacheService.setPodcatsDetailsCache({
            podcast,
            episodes,
          });

          return { podcast, episodes };
        })
      );
  }

  /**
   * Get podcasts list , filtered by id if its declared
   * @param list podcasts list
   * @param podcastId podcast id
   * @returns podcast params parsed for better usage
   */
  private parsePodcasts(
    list: any,
    podcastId?: string
  ): PodcastInterface[] | null {
    if (!list) return null;

    const podcasts: PodcastInterface[] = list.map((podcasts: any) => {
      const {
        ['id']: {
          attributes: { ['im:id']: id },
        },
        ['im:image']: images,
        ['im:name']: { label: name },
        ['im:artist']: { label: artist },
        ['summary']: { label: summary },
      } = podcasts;

      const { label: image } = images[2];

      return {
        id,
        name,
        artist,
        image,
        summary,
      };
    });
    console.log('parse', podcasts);

    if (podcastId) return this.filterPodcastsListById(podcasts, podcastId);
    return podcasts;
  }

  /**
   * filter a podcasts array by id
   * @param podcasts podcast list
   * @param podcastId podcast id
   * @returns podcast filtered
   */
  filterPodcastsListById(
    podcasts: PodcastInterface[],
    podcastId: number | string
  ): PodcastInterface[] {
    return podcasts.filter(
      (podcast: PodcastInterface) => podcast.id == podcastId.toString()
    );
  }
}
