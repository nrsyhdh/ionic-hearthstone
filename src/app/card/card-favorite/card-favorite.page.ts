import { Component } from "@angular/core";
import { FavoriteCardStore } from "../../shared/card-favorite.store";
import { Card } from "src/app/shared/card.model";
import { Subscription } from "rxjs";

@Component({
	selector: "app-card-favorite",
	templateUrl: "./card-favorite.page.html",
	styleUrls: ["./card-favorite.page.scss"],
})
export class CardFavoritePage {
	favoriteCardList: Card[] = [];
	favoriteCardSub: Subscription;

	constructor(private favoriteCardStore: FavoriteCardStore) {
		this.favoriteCardSub = this.favoriteCardStore.favoriteCards.subscribe(
			(favoriteCards: any) => {
				this.favoriteCardList = this.getFavoriteCardList(favoriteCards);
				console.log(this.favoriteCardList);
			}
		);
	}

	ionViewDidLeave() {
		if (this.favoriteCardSub && !this.favoriteCardSub.closed) {
			this.favoriteCardSub.unsubscribe();
		}
	}

	private getFavoriteCardList(favoriteCards: any): Card[] {
		if (favoriteCards) {
			return Object.keys(favoriteCards)
				.filter((key) => favoriteCards[key])
				.map((key) => favoriteCards[key]);
		}

		return [];
	}
}
