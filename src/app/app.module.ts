import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimengModule } from './shared/modules/primeng/primeng.module';
import { PodcastsComponent } from './components/podcasts/podcasts.component';
import { PodcastsFilterPipe } from './pipes/podcasts-filter.pipe';
import { PodcastDetailsComponent } from './components/podcasts/podcast-details/podcast-details.component';
import { EpisodeDetailsComponent } from './components/podcasts/episode-details/episode-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PodcastsComponent,
    PodcastsFilterPipe,
    PodcastDetailsComponent,
    EpisodeDetailsComponent,
  ],
  imports: [PrimengModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
