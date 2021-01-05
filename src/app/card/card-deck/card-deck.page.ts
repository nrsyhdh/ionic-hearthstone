import { Component } from "@angular/core";
import { CardService } from "../../shared/card.service";
import { CardDeck } from "../../shared/card.model";
import { LoaderService } from "../../shared/service/loader.service";

@Component({
	selector: "app-card-deck",
	templateUrl: "./card-deck.page.html",
	styleUrls: ["./card-deck.page.scss"],
})
export class CardDeckPage {
	public theCardDecks: CardDeck[] = [];
	private readonly ALLOWED_DECKS = [
		"classes",
		"factions",
		"qualities",
		"types",
		"races",
	];

	constructor(
		private cardService: CardService,
		private loaderService: LoaderService
	) {
		this.getCardDecks();
	}

	private getCardDecks() {
		this.loaderService.presentLoading();
		this.cardService.getAllCardDecks().subscribe((cardDecks: CardDeck[]) => {
			console.log(cardDecks);
			// this.theCardDecks = cardDecks;
			this.extractAllowedDecks(cardDecks);
			this.loaderService.dismissLoading();
		});
	}

	extractAllowedDecks(cardDecks: CardDeck[]) {
		this.ALLOWED_DECKS.forEach((deckName) => {
			this.theCardDecks.push({
				name: deckName,
				types: cardDecks[deckName],
			});

			// console.log("cardDecks", cardDecks);
			// console.log("deckName", deckName);
		});
	}

	generateUrl(cardDeckGroup: string, cardDeck: string): string {
		return `/tabs/card/${cardDeckGroup}/${cardDeck}`;
	}
}
