import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieComponent} from './movie/movie.component';
import {HomeComponent} from './home/home.component';
import {PlaylistComponent} from './playlist/playlist.component'
const routes: Routes = [
  {path : 'movie', component: MovieComponent},
  {path : 'home', component: HomeComponent},
  {path : 'playlist', component: PlaylistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
