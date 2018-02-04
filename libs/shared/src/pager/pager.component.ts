import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'pager',
	templateUrl: './pager.component.html',
	styleUrls: ['./pager.component.css']
})
export class PagerComponent {
	@Input() currentPage: number;
	@Input() totalPages: number;
	@Output() setPage: EventEmitter<number> = new EventEmitter();
}
