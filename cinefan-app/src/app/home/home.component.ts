import { HttpClient } from "@angular/common/http";
import {Component, Input, OnInit} from "@angular/core";

@Component({

    selector : 'app-home',
    templateUrl : 'home.component.html'

})
export class HomeComponent implements OnInit{
    title = 'Home';
    constructor(private httpClient:HttpClient){

    }

    ngOnInit():void
    {

    }
}