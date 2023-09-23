import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    public route: ActivatedRoute,
    private podcastService: PodcastsService
  ) {}

  podcast?: any;
  episodes?: EpisodeDetailInterface[];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { podcastId } = params;
      this.setPodcastInfo(podcastId);
      this.setEpisodesInfo(podcastId);
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
