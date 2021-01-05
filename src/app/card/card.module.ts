import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";

import { CardPageRoutingModule } from "./card-routing.module";

import { CardListComponent } from "./components/card-list.component";
import { SearchComponent } from "../shared/component/search/search.component";

import { CardPage } from "./card.page";
import { CardListingPage } from "./card-listing/card-listing.page";
import { CardDetailPage } from "./card-detail/card-detail.page";
import { CardDeckPage } from "./card-deck/card-deck.page";
import { CardFavoritePage } from "./card-favorite/card-favorite.page";

import { CardService } from "../shared/card.service";
import { LoaderService } from "../shared/service/loader.service";
import { ToasterService } from "../shared/service/toaster.service";
import { FavoriteCardStore } from "../shared/card-favorite.store";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CardPageRoutingModule,
		HttpClientModule,
	],
	providers: [CardService, LoaderService, ToasterService, FavoriteCardStore],
	declarations: [
		CardPage,
		CardListComponent,
		CardListingPage,
		CardDeckPage,
		CardDetailPage,
		SearchComponent,
		CardFavoritePage,
	],
})
export class CardPageModule {}
