import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const proxyUrl = environment.proxyUrl;
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(apiKey, { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });


const reqOptions = { 'mode': 'cors', 
                      headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',                                 
                                'X-Api-key': apiKey,
                                //'access-control-allow-headers' : 'x-api-key, authorization',
                                //'access-control-allow-methods' : 'DELETE, POST, GET, OPTIONS',
                                //'access-control-allow-origin' : '*',
                                //'cache-control' : 'no-cache'
                                //'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
                                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                                
                              } 
                    };


const headers = new HttpHeaders(
  {
    'X-Api-key': apiKey,
    //'Access-Control-Allow-Origin': '*',
    //'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
    //'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
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

    //query = proxyUrl + apiUrl + query;
    query = '/api' + query;
    return this.httpClient.get<T>(query, reqOptions);
    //return this.httpClient.get<T>(query, {headers});

  }

  getTopHeadlines(){
    this.pages++;
    console.log('Pages = '+this.pages)
    //console.log('Response',this.executeQuery<ResponseTopHeadlines>(`/top-headlines?country=co&page=${this.pages}`));
    //this.getTopHeadlinesApi();
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

  getTopHeadlinesApi(){

    //this.pages++;
    
    newsapi.v2.topHeadlines({      
      country: 'co',
      page: this.pages
      
    }).then((response) => {
      console.log('API'+response);

      return response.articles;
      /*
        {
          status: "ok",
          articles: [...]
        }
      */
    });

  }


}
