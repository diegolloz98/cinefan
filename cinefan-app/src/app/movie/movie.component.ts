import { HttpClient } from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute } from '@angular/router';

export class Movie{
    constructor(
      public movieId: string,
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
    search!:any;

    constructor(private httpClient: HttpClient, private activeParams: ActivatedRoute){

    }

    ngOnInit():void{
        this.search = this.activeParams.snapshot.paramMap.get("query");
        if(this.search == undefined)
            this.getTopMovies();
        else
            this.getMoviesLike(this.search);
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
                    let id = element.slice(0,element.length);
                    let mov = new Movie(id,res.Title,res.Year,res.Poster);
                    this.movies.push(mov);
                    console.log(res);
                    setTimeout(function () {
                        console.log("next!");
                    },500);
                })
            }); 
        });
    }

    getMoviesLike(title:string):any{
        this.httpClient.get<any>('/api/movies/find/'+title,{
            headers:{"Access-Control-Allow-Origin": "*"}
        }).subscribe(res=>{
            console.log(res)
            this.top = res;
            this.top.forEach(element => {
                this.httpClient.get<any>('/api/movies/'+element,{
                    headers:{"Access-Control-Allow-Origin": "*"}
                }).subscribe(res=>{
                    let data = res.title;
                    let id = element.slice(0,element.length-1);
                    let mov = new Movie(id,data.title,data.year,data.image.url);
                    this.movies.push(mov);
                    console.log(data);
                    setTimeout(function () {
                        console.log("next!");
                    },500);
                })
            }); 
        })
    }

    
}