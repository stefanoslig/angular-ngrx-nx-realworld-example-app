import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() setPage: EventEmitter<number> = new EventEmitter();
}
