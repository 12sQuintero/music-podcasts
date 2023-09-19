import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { environment } from '../../environments/environment.development';
import { map, of, shareReplay } from 'rxjs';

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

  requestPodcasts() {
    return this.http.get<any>(environment.URL_PODCAST).pipe(
      shareReplay(1),
      //parse info to better usage
      map((response) => this.parsePodcasts(response.feed.entry))
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
