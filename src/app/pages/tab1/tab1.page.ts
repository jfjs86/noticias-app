import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { ResponseTopHeadlines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  news: Article[] = [];

  constructor(private noticiasService:NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getTopHeadlines().subscribe(res=>{
      console.log('noticias',res)
      this.news.push(...res.articles)
    });
  }

}
