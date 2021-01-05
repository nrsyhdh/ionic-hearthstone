import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

/**
 * distinctUntilChanged() will compare the new value with the previous value,
 * if they're the same, it will not emit value
 *
 * debounceTime(millisec): result shows up after 'millisec' milliseconds of search completion
 */

@Component({
	selector: "app-search",
	templateUrl: "./search.component.html",
})
export class SearchComponent {
	@Input() items: any[] = [];
	@Input() filteredProperty: string;

	@Output() searchCompleted = new EventEmitter();
	@Output() searchStarted = new EventEmitter();

	private searchSubject = new BehaviorSubject<string>("");

	handleSearch(event: any) {
		// console.log(event.target.value);

		this.searchStarted.emit();
		this.searchSubject.next(event.target.value);

		// this.searchCompleted.emit("event emitter");
		// const searchedText = event.target.value; //Text typed into the search box
	}

	ngAfterViewInit() {
		this.searchSubject
			.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe((searchedText) => {
				// returns an empty array if there is no item
				if (!this.items) return this.searchCompleted.emit([]);

				// returns all items if empty value is provided by the user
				if (!searchedText) return this.searchCompleted.emit(this.items);

				//filters through the cards to find the card matched with the searchedText
				const filteredItems = this.items.filter((item) => {
					return item[this.filteredProperty]
						.toLowerCase()
						.includes(searchedText.toLowerCase());
				});

				// produce filteredItems after search completes
				this.searchCompleted.emit(filteredItems);
				// console.log(filteredItems);
			});
	}
}
