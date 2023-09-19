import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  episodes?: any[];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { podcastId } = params;
      this.setPodcastInfo(podcastId);
    });
  }
  /**
   * set podcast data
   * @param id podcast id
   */
  setPodcastInfo(id: string): void {
    this.podcastService.getPodcastsDetails(id).subscribe({
      next: (resp: any) => {
        const { podcast, episodes } = resp;

        this.podcast = podcast;
        this.episodes = episodes;

        console.log('podcastInfo', this.podcast);
        console.log('episodesInfo', this.episodes);
      },
    });
  }
}
