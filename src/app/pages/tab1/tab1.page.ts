import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { ResponseTopHeadlines, Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  news: Article[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll;

  constructor(private noticiasService:NoticiasService) {}

  ngOnInit(): void {

    this.loadNews();
    
  }

  loadNews( event? ){

    
    this.noticiasService.getTopHeadlines().subscribe(res=>{

      console.log('noticias',res);
      this.news.push(...res.articles);
      console.log('Numero de articulos = '+res.articles.length);
      
      if(res.articles.length === 0){
        event.target.complete();
        event.target.disabled = true;
        return;
      }

      if(event){
        event.target.complete();      
      }


    });

    
  }

  loadData( event ){

    console.log(event);
    this.loadNews(event);

  }

}