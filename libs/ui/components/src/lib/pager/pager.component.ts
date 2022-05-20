import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PagerComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() setPage: EventEmitter<number> = new EventEmitter();
}
