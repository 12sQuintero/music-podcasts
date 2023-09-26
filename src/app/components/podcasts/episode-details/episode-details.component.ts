import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeDetailInterface } from 'src/app/interfaces/podcast';
import { PodcastsService } from 'src/app/services/podcasts.service';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss'],
})
export class EpisodeDetailsComponent {
  episode?: EpisodeDetailInterface;

  constructor(
    public route: ActivatedRoute,
    private podcastService: PodcastsService
  ) {}

  ngOnInit() {
    const podcastId: string = this.route.parent?.snapshot.params['podcastId'];
    const episodeId: number = this.route.snapshot.params['episodeId'];

    // setEpisodeDetails;
    this.setEpisodeDetails(podcastId, episodeId);
  }

  setEpisodeDetails(podcastId: string, episodeId: number): void {
    this.podcastService.getEpisodeDetails(podcastId, episodeId).subscribe({
      next: (resp: any) => {
        this.episode = resp;
      },
    });
  }
}
