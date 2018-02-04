import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'tags-list',
	templateUrl: './tags-list.component.html',
	styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent {
	@Input() tags: string[];
	@Output() setListTag: EventEmitter<string> = new EventEmitter();
}
