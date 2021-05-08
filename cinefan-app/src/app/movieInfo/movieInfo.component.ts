import { HttpClient } from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { SocketIOService} from '../globals/services/socket-io.service';
import { AppComponent } from '../app.component';

export class Article{
    constructor(
        public title: string,
        public image: string,
        public price: string,
        public link: string
    ){}
}


export class MovieDetails{
    constructor(
        public title:string,
        public image:string,
        public runTime:string,
        public year: number,
        public genere:string,
        public outline:string
    ){}
}

@Component({
    selector : 'app-movieInfo',
    templateUrl : 'movieInfo.component.html',
    styles:[
        `.container .star-widget input{
            display: none;
          }
          .star-widget label{
            font-size: 40px;
            color: #444;
            padding: 10px;
            float: right;
            transition: all 0.2s ease;
          }
          input:not(:checked) ~ label:hover,
          input:not(:checked) ~ label:hover ~ label{
            color: #fd4;
          }
          input:checked ~ label{
            color: #fd4;
          }
          input#rate-5:checked ~ label{
            color: #fe7;
            text-shadow: 0 0 20px #952;
          }`
    ]

})
export class MovieInfoComponent implements OnInit{
    title = 'MovieInfo';
    movieId!:any;
    movieDetails!:MovieDetails;
    review!:any;
    score!:any;
    articles!:Article[];
    constructor(private activeParams: ActivatedRoute, private httpClient:HttpClient,private socket:SocketIOService, private app:AppComponent){}
    
    ngOnInit():void{
        this.articles = [];
        this.movieId = this.activeParams.snapshot.paramMap.get("id");
        this.httpClient.get<any>('/api/movies/details/'+this.movieId,{
            headers:{"Access-Control-Allow-Origin": "*"}
        }).subscribe(res => {
            this.movieDetails = new MovieDetails(
                res.Title,
                res.Poster,
                res.RunTime,
                res.Year,
                res.Genre,
                res.Plot
            )
            console.log(res);
            this.httpClient.get<any>('/api/articles/'+this.movieDetails.title,{
                headers:{"Access-Control-Allow-Origin": "*"}
            }).subscribe(resp =>{
                resp.forEach((element: { price: { symbol: any; value: any; }; title: string; image: string; link: string; }) => {
                    let price = element.price.symbol + element.price.value;

                    let temp = new Article(
                        element.title,
                        element.image,
                        price,
                        element.link
                    );

                    this.articles.push(temp);
                });
            })
        });
    }

    rate(){
        this.socket.emit('ratedFilm',{
            id: this.movieId,
            score: this.score,
            review: this.review,
            user: this.app.user
        })
    }
}