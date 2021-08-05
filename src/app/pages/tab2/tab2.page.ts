import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment) segment : IonSegment;
  categories = ['business','entertainment','general','health','science','sports','technology'];
  news : Article[] = [];  

  constructor(private noticiasService:NoticiasService) {}
  
  ngOnInit(): void {   
   
  }

  ngAfterViewInit() {
    this.segment.value = this.categories[0];
    this.loadNews(this.segment.value)
    
    
  }

  loadNews(category:string){

    this.noticiasService.getTopHeadlinesCategories(category)
    .subscribe(res =>{
        console.log(res);
        this.news.push(... res.articles);
        
    });

  }

  categoryChanged(event){
    this.news = [];
    this.loadNews(event.detail.value);

  }

}
