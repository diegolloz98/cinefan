import { HttpClient } from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute } from '@angular/router';

export class MovieDetails{
    constructor(
        public title:string,
        public image:string,
        public runTime:number,
        public year: number,
        public genere:string,
        public outline:string
    ){}
}

@Component({
    selector : 'app-movieInfo',
    templateUrl : 'movieInfo.component.html'

})
export class MovieInfoComponent implements OnInit{
    title = 'MovieInfo';
    movieId!:any;
    movieDetails!:MovieDetails;

    constructor(private activeParams: ActivatedRoute, private httpClient:HttpClient){}
    
    ngOnInit():void{
        this.movieId = this.activeParams.snapshot.paramMap.get("id");
        this.httpClient.get<any>('/api/movies/details/'+this.movieId,{
            headers:{"Access-Control-Allow-Origin": "*"}
        }).subscribe(res => {
            this.movieDetails = new MovieDetails(
                res.title.title,
                res.title.image.url,
                res.title.runningTimeInMinutes,
                res.title.year,
                res.genres[0],
                res.plotOutline.text
            )
            console.log(res);
        });
    }
}