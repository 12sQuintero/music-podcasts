import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PodcastsComponent } from './components/podcasts/podcasts.component';

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
