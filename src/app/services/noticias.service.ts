import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private httpClient:HttpClient) { }

  getTopHeadlines(){
    return this.httpClient.get<ResponseTopHeadlines>(`https://newsapi.org/v2/everything?q=tesla&from=2021-07-03&sortBy=publishedAt&apiKey=363f694cad91452ca43ede5988c7a5b9`);
  }
}
