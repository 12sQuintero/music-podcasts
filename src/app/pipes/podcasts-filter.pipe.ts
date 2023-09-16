import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'podcastsFilter',
})
export class PodcastsFilterPipe implements PipeTransform {
  constructor() {}

  transform(podcasts: any[], inputSearch: string): any {
    if (inputSearch) {
      const search = inputSearch.toUpperCase();
      const filtered = podcasts.filter(
        (podcast: any) =>
          podcast.name.toUpperCase().includes(search) ||
          podcast.artist.toUpperCase().includes(search)
      );

      return filtered;
    }

    return podcasts;
  }
}
