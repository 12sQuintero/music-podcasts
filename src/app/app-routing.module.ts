import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PodcastsComponent } from './components/podcasts/podcasts.component';
import { PodcastDetailsComponent } from './components/podcasts/podcast-details/podcast-details.component';

const routes: Routes = [
  //inicial
  {
    path: '',
    component: HomeComponent,
    children: [
      //podcasts
      {
        path: '',
        component: PodcastsComponent,
      },
      //podcast details
      {
        path: 'podcast/:podcastId',
        component: PodcastDetailsComponent,
      },
    ],
  },
  //error path
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
