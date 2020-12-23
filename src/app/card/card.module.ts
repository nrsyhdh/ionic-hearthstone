import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CardPageRoutingModule } from "./card-routing.module";

import { CardService } from "./shared/card.service";
import { CardPage } from "./card.page";
import { HttpClientModule } from "@angular/common/http";
import { CardListComponent } from "./components/card-list.component";
import { CardListingPage } from "./card-listing/card-listing.page";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CardPageRoutingModule,
		HttpClientModule,
	],
	providers: [CardService],
	declarations: [CardPage, CardListComponent, CardListingPage],
})
export class CardPageModule {}
