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

  getPodcastsDetails(id: string): Observable<{
    podcast: any;
    episodes: EpisodeDetailInterface;
  }> {
    const detailsCache = this.cacheService.getDetailsCache(id);

    //not cacheded-details
    if (!detailsCache) return this.requestHttPodcastsDetails(id);

    return of(detailsCache);
  }

  private requestPodcasts() {
    return this.http.get<any>(environment.URL_PODCAST).pipe(
      shareReplay(1),
      //parse info to better usage
      map((response) => {
        const podcasts = this.parsePodcasts(response.feed.entry);
        //cache data
        this.cacheService.setPodcatsCache(podcasts);
        return podcasts;
      })

      // map((response) => this.cacheService.setPodcatsCache(response))
    );
  }

  private requestHttPodcastsDetails(id: string): Observable<{
    podcast: any;
    episodes: any;
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

          //cache data
          console.log('cache podcasts', podcast);

          this.cacheService.setPodcatsDetailsCache({
            podcast,
            episodes,
          });

          return {
            podcast,
            episodes,
          };
        })
      );
  }

  private parsePodcasts(list: any): any {
    if (!list) return null;

    const podcasts = list.map((podcasts: any) => {
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
}
