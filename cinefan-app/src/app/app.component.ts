import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import {SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';
import { SocketIOService } from './globals/services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'cinefan-app';
  user!:any;
  constructor(private authService:SocialAuthService, private socketIOService:SocketIOService){
  
  }

  ngOnInit():void{
    this.authService.authState.subscribe(user=>{
      if(user)
        console.log(user);
        this.user=user;
    })

    this.socketIOService.connect(()=>{
      console.log('Socket Client Connected!');
    });
  }

  googleLogin(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
