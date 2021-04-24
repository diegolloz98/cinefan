import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment} from './../environments/environment';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes=[];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
