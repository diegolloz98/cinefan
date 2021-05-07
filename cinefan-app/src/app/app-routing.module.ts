import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieComponent} from './movie/movie.component';
import {HomeComponent} from './home/home.component';
import {PlaylistComponent} from './playlist/playlist.component'
import {MovieInfoComponent} from './movieInfo/movieInfo.component'

const routes: Routes = [
  {path : 'movie', component: MovieComponent},
  {path : 'movie/:query', component: MovieComponent},
  {path : 'home', component: HomeComponent},
  {path : 'playlist', component: PlaylistComponent},
  {path : 'movieInfo/:id', component: MovieInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
