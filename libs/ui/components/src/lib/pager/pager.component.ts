import { NgClass } from '@angular/common';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'cdt-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class PagerComponent {
  currentPage = input.required<number | null>();
  totalPages = input.required<number[] | null>();
  @Output() setPage: EventEmitter<number> = new EventEmitter();
}
