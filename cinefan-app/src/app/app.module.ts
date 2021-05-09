import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment} from './../environments/environment';
import { Routes, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomeComponent} from './home/home.component';
import {MovieComponent} from './movie/movie.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {MovieInfoComponent} from './movieInfo/movieInfo.component';
import {HttpClientModule} from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchDataService } from './globals/services/search-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes=[];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    PlaylistComponent,
    MovieInfoComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.client_id
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    SearchDataService
  ],
  bootstrap: [AppComponent, HomeComponent]
})
export class AppModule { }
