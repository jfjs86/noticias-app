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

  pages : number = 0;

  actualCategory:string ='';
  categoryPage:number =0;

  constructor(private httpClient:HttpClient) { }

  executeQuery<T>(query:string){

    query = apiUrl + query;

    return this.httpClient.get<T>(query, {headers});

  }

  getTopHeadlines(){
    this.pages++;
    console.log('Pages = '+this.pages)
    return  this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=co&page=${this.pages}`);
  }

  getTopHeadlinesCategories(category:string){
    
    if(this.actualCategory===category){
      this.categoryPage++;
    }else{
      this.categoryPage = 1;
      this.actualCategory = category;
    }

    return this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=co&category=${category}&page=${this.categoryPage}`);
  }
}
