import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardFavoritePage } from './card-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: CardFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardFavoritePageRoutingModule {}
