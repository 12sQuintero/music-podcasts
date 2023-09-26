import { Component, booleanAttribute, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  podcast?: PodcastInterface;
  episodes?: EpisodeDetailInterface[];
  episodeSelected: boolean = false;

  loading: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private podcastService: PodcastsService,
    private router: Router
  ) {}

  ngOnInit() {
    //getting ids from url
    this.route.params.subscribe((params) => {
      const { podcastId } = params;
      this.setPodcastInfo(podcastId);
      this.setEpisodesInfo(podcastId);
    });
    //checking if there are some episode include to show list or details
    this.router.events.subscribe(() => {
      this.episodeSelected = this.router.url.includes('episode');
    });
  }
  /**
   * set podcast data
   * @param id podcast id
   */
  setEpisodesInfo(id: string): void {
    this.podcastService.getPodcastsDetails(id).subscribe({
      next: (resp: any) => {
        console.log('episodes', resp);

        const { episodes } = resp;
        this.episodes = episodes;
        this.isLoading();
      },
    });
  }
  /**
   * setting podcast info
   * @param podcastId podcast id
   */
  setPodcastInfo(podcastId: string): void {
    this.podcastService.getPodcast(podcastId).subscribe({
      next: (resp: PodcastInterface[]) => {
        console.log('podcast info', resp);
        const [podcast] = resp;
        this.podcast = podcast;
        this.isLoading();
      },
    });
  }

  /**
   * check loading
   */
  isLoading(): void {
    this.loading = !booleanAttribute(this.episodes && this.podcast);
  }
}
