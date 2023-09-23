import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';
import {
  EpisodeDetailInterface,
  PodcastInterface,
} from 'src/app/interfaces/podcast';
import { PodcastsService } from 'src/app/services/podcasts.service';

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss'],
})
export class PodcastDetailsComponent {
  podcast?: any;
  episodes?: EpisodeDetailInterface[];
  episodeSelected: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private podcastService: PodcastsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { podcastId } = params;
      this.setPodcastInfo(podcastId);
      this.setEpisodesInfo(podcastId);
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const { type } = event;
        if (type == 1) {
          this.episodeSelected = this.router.url.includes('episode');
        }

        // Aquí puedes realizar acciones adicionales si lo deseas.
      });
  }
  /**
   * set podcast data
   * @param id podcast id
   */
  setEpisodesInfo(id: string): void {
    this.podcastService.getPodcastsDetails(id).subscribe({
      next: (resp: any) => {
        const { episodes } = resp;

        // this.podcast = podcast;
        this.episodes = episodes;

        // console.log('podcastInfo', this.podcast);
        console.log('episodesInfo', this.episodes);
      },
    });
  }

  setPodcastInfo(podcastId: string): void {
    this.podcastService.getPodcast(podcastId).subscribe({
      next: (resp: PodcastInterface[]) => {
        const [podcast] = resp;
        this.podcast = podcast;
        console.log('podcastInfo', resp);
      },
    });
  }
}
