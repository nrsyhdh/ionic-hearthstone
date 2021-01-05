import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CardService } from "../../shared/card.service";
import { Card } from "../../shared/card.model";
import { LoaderService } from "../../shared/service/loader.service";
import { ToasterService } from "src/app/shared/service/toaster.service";
// import { Storage } from "@ionic/storage";
import { FavoriteCardStore } from "../../shared/card-favorite.store";
import { Subscription } from "rxjs";

@Component({
	selector: "app-card-listing",
	templateUrl: "./card-listing.page.html",
	styleUrls: ["./card-listing.page.scss"],
})
export class CardListingPage {
	cardDeckGroup: string;
	cardDeck: string;

	cards: Card[] = [];
	copyOfCards: Card[] = [];

	isLoading: boolean = false;

	favoriteCards: any = {};

	favoriteCardSub: Subscription;

	limit: number = 10;

	constructor(
		private route: ActivatedRoute,
		private cardService: CardService,
		private loaderService: LoaderService,
		private toaster: ToasterService,
		/* private storage: Storage, */
		private favoriteCardStore: FavoriteCardStore
	) {
		// debugger;
		/**
		 * [this].[...............].[function].[subscribe()]
		 * this.favoriteCardStore.favoriteCards.subscribe()
		 *
		 * the [function] above is called from 'card-favorite.store.ts'
		 */
		this.favoriteCardSub = this.favoriteCardStore.favoriteCards.subscribe(
			(favoriteCards: any) => {
				this.favoriteCards = favoriteCards;
			}
		);

		// this.storage.get("favoriteCards").then((favoriteCards) => {
		// 	this.favoriteCards = favoriteCards || {};
		// });
	}

	ionViewDidLeave() {
		/**
		 * #Note: .closed means already unsubscribed
		 *
		 * check if this.favoriteCardSub exists AND
		 * this.favoriteCardSub is not yet unsubscribed
		 *
		 */
		if (this.favoriteCardSub && !this.favoriteCardSub.closed) {
			// unsubscribe only if the subscription is active
			this.favoriteCardSub.unsubscribe();
		}
	}

	private async getCards() {
		await this.loaderService.presentLoading();
		this.cardService
			.getCardsByDeck(this.cardDeckGroup, this.cardDeck)
			.subscribe(
				(cards: Card[]) => {
					// this.cards = cards;
					this.cards = cards.map((card: Card) => {
						card.text = this.cardService.replaceCardTextLine(card.text);
						card.favorite = this.isCardFavorite(card.cardId);
						return card;
					});

					this.copyOfCards = Array.from(this.cards);
					this.loaderService.dismissLoading();
				},
				() => {
					this.loaderService.dismissLoading();
					this.toaster.presentErrorToast(
						"Oops! Cards could not be loaded. How about refreshing the page?"
					);
				}
			);
	}

	private isCardFavorite(cardId: string): boolean {
		let card = this.favoriteCards[cardId];
		return card ? true : false;
	}

	ionViewWillEnter() {
		this.cardDeckGroup = this.route.snapshot.paramMap.get("cardDeckGroup");
		// this.cardDeckGroup = this.cardDeckGroup.toUpperCase();

		this.cardDeck = this.route.snapshot.paramMap.get("cardDeck");

		if (this.cards && this.cards.length === 0) this.getCards();
	}

	doRefresh(event) {
		setTimeout(() => {
			this.getCards();
			event.target.complete();
		}, 2000);
	}

	hydrateCards(cards: Card[]) {
		this.cards = cards;
		this.isLoading = false;
		// console.log(this.cards);
	}

	handleSearch() {
		this.isLoading = true;
	}

	favoriteCard(card: Card) {
		this.favoriteCardStore.toggleCards(card);
		// if (card.favorite) {
		// 	card.favorite = false;
		// 	delete this.favoriteCards[card.cardId];
		// } else {
		// 	card.favorite = true;
		// 	this.favoriteCards[card.cardId] = card;
		// }
		// console.log(this.favoriteCards);
		// this.storage.set("favoriteCards", this.favoriteCards);
		/**
		 * The above is moved to 'card-favorite.store.ts' into the 'toggleCards()
		 */
	}

	loadData(infiniteScroll) {
		setTimeout(() => {
			this.limit += 10;
			infiniteScroll.target.complete();
		}, 500);
	}
}
