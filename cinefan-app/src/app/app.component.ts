import { Component } from '@angular/core';
import { ViewChild,ElementRef } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cinefan-app';
  User = 'user';
}
