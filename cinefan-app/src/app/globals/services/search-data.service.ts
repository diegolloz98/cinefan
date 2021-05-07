import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

export class Suggestion {
  constructor(
    public title:string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  searchOptions=[]
  postUrl: string = "localhost:4200/api/movies/find/";

  constructor(private http:HttpClient) { }

  getPosts(): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>(this.postUrl);
  }
}
