import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardFavoritePageRoutingModule } from './card-favorite-routing.module';

import { CardFavoritePage } from './card-favorite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardFavoritePageRoutingModule
  ],
  declarations: [CardFavoritePage]
})
export class CardFavoritePageModule {}
