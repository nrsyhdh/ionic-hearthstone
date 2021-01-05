import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CardDeckPageRoutingModule } from "./card-deck-routing.module";

import { CardDeckPage } from "./card-deck.page";
import { CardService } from "../../shared/card.service";
import { HttpClientModule } from "@angular/common/http";
import { CardListComponent } from "./../components/card-list.component";
import { LoaderService } from "../../shared/service/loader.service";
import { ToasterService } from "src/app/shared/service/toaster.service";
import { FavoriteCardStore } from "src/app/shared/card-favorite.store";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CardDeckPageRoutingModule,
		HttpClientModule,
	],
	providers: [CardService, LoaderService, ToasterService, FavoriteCardStore],
	declarations: [CardDeckPage, CardListComponent],
})
export class CardDeckPageModule {}
