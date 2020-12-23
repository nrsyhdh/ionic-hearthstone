import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CardDeckPageRoutingModule } from "./card-deck-routing.module";

import { CardDeckPage } from "./card-deck.page";
import { CardService } from "./../shared/card.service";
import { HttpClientModule } from "@angular/common/http";
import { CardListComponent } from "./../components/card-list.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CardDeckPageRoutingModule,
		HttpClientModule,
	],
	providers: [CardService],
	declarations: [CardDeckPage, CardListComponent],
})
export class CardDeckPageModule {}
