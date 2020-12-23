import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardListingPage } from "../card/card-listing/card-listing.page";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
	{
		path: "tabs",
		component: TabsPage,
		children: [
			{
				path: "about",
				loadChildren: () =>
					import("../about/about.module").then((m) => m.AboutPageModule),
			},
			{
				path: "contact",
				loadChildren: () =>
					import("../contact/contact.module").then((m) => m.ContactPageModule),
			},
			{
				path: "card",
				loadChildren: () =>
					import("../card/card-deck/card-deck.module").then(
						(m) => m.CardDeckPageModule
					),
			},
			{
				path: "card/:cardDeckGroup/:cardDeck",
				loadChildren: () =>
					import("../card/card-listing/card-listing.module").then(
						(m) => m.CardListingPageModule
					),
			},
			{
				path: "",
				redirectTo: "/tabs/card",
				pathMatch: "full",
			},
		],
	},
	{
		path: "",
		redirectTo: "/tabs/card",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],

	exports: [RouterModule],
})
export class TabsPageRoutingModule {}
