import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'cinefan-app';

  constructor(private signInServices: GoogleSigninService, private ref: ChangeDetectorRef){

  }
}
