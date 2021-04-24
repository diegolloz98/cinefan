import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import {SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'cinefan-app';

  constructor(private authService:SocialAuthService){
    
  }

  ngOnInit():void{
    this.authService.authState.subscribe(user=>{
      if(user)
        console.log(user);
    })
  }

  googleLogin(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
