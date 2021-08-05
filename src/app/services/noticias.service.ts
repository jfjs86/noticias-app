import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders(
  {
    'X-Api-key': apiKey
  }
);

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private httpClient:HttpClient) { }

  executeQuery<T>(query:string){

    query = apiUrl + query;

    return this.httpClient.get<T>(query, {headers});

  }

  getTopHeadlines(){
    //return this.httpClient.get<ResponseTopHeadlines>(`https://newsapi.org/v2/everything?q=tesla&from=2021-07-03&sortBy=publishedAt&apiKey=363f694cad91452ca43ede5988c7a5b9`);
    return  this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=co`);
  }

  getTopHeadlinesCategories(category:string){
    //return this.httpClient.get<ResponseTopHeadlines>(`https://newsapi.org/v2/top-headlines/sources?category=businessapiKey=363f694cad91452ca43ede5988c7a5b9`);
    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=co&category=${category}`);
  }
}
