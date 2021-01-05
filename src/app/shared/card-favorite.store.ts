import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, Observable } from "rxjs";
import { Card } from "../shared/card.model";

@Injectable()
export class FavoriteCardStore {
	private _favoriteCardsSubject = new BehaviorSubject({});

	constructor(private storage: Storage) {
		// debugger;
		this.loadInitialData();
	}

	get favoriteCards(): Observable<any> {
		return this._favoriteCardsSubject.asObservable();
	}

	/**
	 * The get function above can be written as getFavoriteCards().
	 *
	 * However, if it's written as getFavoriteCards(),
	 *      it has to be called as it is(with the parentheses).
	 *
	 * Using the special 'getter' function [eg: get favoriteCards()]
	 *     allows parentheses to be omitted when calling it within 'card-listing.page.ts'
	 */

	private loadInitialData() {
		this.storage.get("favoriteCards").then((favoriteCards) => {
			this._favoriteCardsSubject.next(favoriteCards || {});
			const a = this._favoriteCardsSubject.getValue();
		});
	}

	public toggleCards(card: Card) {
		let favoriteCards = this._favoriteCardsSubject.getValue();
		if (card.favorite) {
			card.favorite = false;
			delete favoriteCards[card.cardId];
		} else {
			card.favorite = true;
			favoriteCards[card.cardId] = card;
		}
		// console.log(this.favoriteCards);

		this.storage.set("favoriteCards", favoriteCards).then(() => {
			this._favoriteCardsSubject.next(favoriteCards);
		});
	}
}
