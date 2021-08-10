import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() new:Article;
  @Input() index:number;
  @Input() favScreen;

  constructor(  private iab:InAppBrowser, 
                private actionSheetController:ActionSheetController,
                 private socialSharing:SocialSharing,
                 private dataLocalService:DataLocalService,
                 private platform:Platform ) { }

  ngOnInit() {}

  show(){
    const browser = this.iab.create(this.new.url,'_system');
  }

  async launchMenu(){

    let deleteFavorite;

    if(this.favScreen){

      deleteFavorite = {
        text: 'Eliminar favorito',
        icon: 'trash-outline',
        cssClass: 'action-dark',
        //role: 'cancel',
        handler: () => {
          this.dataLocalService.deleteFavoriteNew(this.new);
        }
      }

    }else{

      deleteFavorite = {
        text: 'Cancelar',
        icon: 'close-outline',
        cssClass: 'action-dark',
        //role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }

    }


    const actionSheet = await this.actionSheetController.create({
       
      buttons: [
        {
        text: 'Compartir',
        icon: 'share-social-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.shareNews();
        }
      },
      {
        text: 'Favoritos',
        icon: 'star-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveNews(this.new);
        }
      
      },
      deleteFavorite
      ]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

  shareNews(){

    if(this.platform.is('cordova')){
      this.socialSharing.share(
        this.new.title,this.new.source.name,'',this.new.url
      )
    }else{
      if (navigator.share) {
        navigator.share({
          title: this.new.title,
          text: this.new.description,
          url: this.new.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
    }    

  }

}
