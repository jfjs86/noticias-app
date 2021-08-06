import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService implements OnInit{


  news:Article[] = [];

  constructor(private storage:Storage, private toastController:ToastController) {
    this.createStorage(); 
    this.loadFavoritesNews();
  }

  ngOnInit(): void {
  }

  async presentToast(messagge : string) {
    const toast = await this.toastController.create({
      message: messagge,
      duration: 1500
    });
    toast.present();
  }

  async createStorage(){
    await this.storage.create();
  }

  saveNews( news:Article){

    //this.createStorage();

    const exists = this.news.find(nw => nw.title === news.title)

    if(!exists){
      this.news.unshift(news);
      this.storage.set('favoritos',this.news);

      this.presentToast('Agregado a favoritos');
    }
    

  }

  deleteFavoriteNew(news:Article){

    this.news = this.news.filter( n => n.title !== news.title);
    this.storage.set('favoritos',this.news);

    this.presentToast('Elemento eliminado');

  }

  async loadFavoritesNews(){

    const fav = await this.storage.get('favoritos');
    
    if(fav){
      this.news = fav;
    }
  }
  
}
