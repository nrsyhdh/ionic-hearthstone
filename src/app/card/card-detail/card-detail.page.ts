import { Component } from "@angular/core";
import { CardService } from "../../shared/card.service";
import { LoaderService } from "../../shared/service/loader.service";
import { AlertService } from "src/app/shared/service/alert.service";
import { ActivatedRoute } from "@angular/router";
import { Card } from "../../shared/card.model";

@Component({
	selector: "app-card-detail",
	templateUrl: "./card-detail.page.html",
})
export class CardDetailPage {
	card: Card;

	constructor(
		private route: ActivatedRoute,
		private cardService: CardService,
		private loaderService: LoaderService,
		private alertService: AlertService
	) {}

	ionViewWillEnter() {
		this.getCard();
	}

	async getCard() {
		const cardId = this.route.snapshot.paramMap.get("cardId");

		await this.loaderService.presentLoading();

		this.cardService.getCardById(cardId).subscribe((card: Card[]) => {
			// this.card = card[0];
			this.card = card.map((card: Card) => {
				// card.text = card.text
				// 	? card.text.replace(new RegExp("\\\\n", "g"), ", ")
				// 	: "No Description";
				card.text = this.cardService.replaceCardTextLine(card.text);
				return card;
			})[0];

			// this.alertService.presentAlert(
			// 	"Connection Error. Please reload the page."
			// );
			this.loaderService.dismissLoading();
		});
	}

	updateImage() {
		this.card.img = "assets/img/default.png";
	}
}
