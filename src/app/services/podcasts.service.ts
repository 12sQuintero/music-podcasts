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

  get podcasts() {
    const podcastCache = this.cacheService.podcastsCache;

    //not cacheded
    if (!podcastCache) return this.requestPodcasts();

    //cached
    return of(podcastCache);
  }

  getPodcast(podcastId: number | string): Observable<PodcastInterface[]> {
    const podcastCache = this.cacheService.podcastsCache;

    //not cacheded
    if (!podcastCache) return this.requestPodcasts(podcastId.toString());

    //cached
    return of(this.filterPodcastsListById(podcastCache, podcastId.toString()));
  }

  getPodcastsDetails(
    podcastId: string
  ): Observable<{ episodes: EpisodeDetailInterface[] }> {
    const detailsCache = this.cacheService.getDetailsCache(podcastId);

    //not cacheded-details
    if (!detailsCache) return this.requestHttPodcastsDetails(podcastId);

    return of(detailsCache);
  }

  private requestPodcasts(podcastId?: string) {
    return this.http.get<any>(environment.URL_PODCAST).pipe(
      shareReplay(1),
      //parse info to better usage
      map((response) => {
        const podcasts = this.parsePodcasts(response.feed.entry, podcastId);
        //cache data
        this.cacheService.setPodcatsCache(podcasts);
        return podcasts;
      })

      // map((response) => this.cacheService.setPodcatsCache(response))
    );
  }

  private requestHttPodcastsDetails(id: string): Observable<{
    podcast: PodcastInterface;
    episodes: EpisodeDetailInterface[];
  }> {
    return this.http
      .get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          environment.URL_DETAILS(id)
        )}`
      )
      .pipe(
        shareReplay(1),

        map((data: any) => {
          const podcastDetails = JSON.parse(data.contents).results;

          const [podcast, ...episodes] = podcastDetails;

          console.log('cache podcast episodes', episodes);

          //cache data episodes
          this.cacheService.setPodcatsDetailsCache({
            podcast,
            episodes,
          });

          return { podcast, episodes };
        })
      );
  }

  getEpisodeDetails(
    podcastId: string,
    episodeId: number
  ): Observable<EpisodeDetailInterface> {
    return this.getPodcastsDetails(podcastId).pipe(
      map(({ episodes }: any) => {
        return episodes.find(
          (ep: EpisodeDetailInterface) => (ep.trackId == episodeId)
        );
      })
    );
  }

  private parsePodcasts(list: any, podcastId?: string): any {
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

    return podcasts;
  }

  filterPodcastsListById(
    podcasts: PodcastInterface[],
    podcastId: number | string
  ): PodcastInterface[] {
    return podcasts.filter(
      (podcast: PodcastInterface) => podcast.id == podcastId.toString()
    );
  }
}
