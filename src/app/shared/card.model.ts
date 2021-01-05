export interface CardDeck {
	name: string;
	types: string[];
	// img: string;
}

export interface Card {
	cardId: string;
	cardSet: string;
	img: string;
	imgGold: string;
	name: string;
	text: string;
	favorite: boolean;

	cost: number;
	attack: number;
	health: number;
	type: string;
	rarity: string;

	dbfId: string;
	faction: string;
	playerClass: string;
	locale: string;
}
