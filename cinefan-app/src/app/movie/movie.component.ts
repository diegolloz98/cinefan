import { HttpClient } from "@angular/common/http";
import {Component, OnInit} from "@angular/core";

export class Movie{
    constructor(
      public title: string,
      public year: number,
      public image: string
    ){
    }
}

@Component({

    selector : 'app-movie',
    templateUrl : 'movie.component.html'

})
export class MovieComponent implements OnInit{
    top!: string[]
    movies!: Movie[]

    constructor(private httpClient: HttpClient){

    }

    ngOnInit():void{
        this.getTopMovies();
    }

    getTopMovies(){
        this.movies = [];
        this.httpClient.get<any>('/api/movies',{
            headers:{"Access-Control-Allow-Origin": "*"}
        }).subscribe(res=>{
            console.log(res)
            this.top = res;
            this.top.forEach(element => {
                this.httpClient.get<any>('/api/movies/'+element,{
                    headers:{"Access-Control-Allow-Origin": "*"}
                }).subscribe(res=>{
                    let data = res.title;
                    let mov = new Movie(data.title,data.year,data.image.url);
                    this.movies.push(mov);
                    console.log(data);
                })
            }); 
        });
    }
}