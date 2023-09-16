import { Component, OnInit } from '@angular/core';
import { PodcastsService } from 'src/app/services/podcasts.service';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {
  constructor(private podcastService: PodcastsService) {}

  ngOnInit(): void {
    this.podcastService.podcasts.subscribe((value: any) => {
      console.log('values', value);
      // this.cacheService.setCacheData(value);
    });
  }
}
