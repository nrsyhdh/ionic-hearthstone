import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardPage } from './card.page';

const routes: Routes = [
  {
    path: '',
    component: CardPage
  },
  {
    path: 'card-listing',
    loadChildren: () => import('./card-listing/card-listing.module').then( m => m.CardListingPageModule)
  },
  {
    path: 'card-detail',
    loadChildren: () => import('./card-detail/card-detail.module').then( m => m.CardDetailPageModule)
  },
  {
    path: 'card-favorite',
    loadChildren: () => import('./card-favorite/card-favorite.module').then( m => m.CardFavoritePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardPageRoutingModule {}
