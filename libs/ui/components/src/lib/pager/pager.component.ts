import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'cdt-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PagerComponent {
  @Input() currentPage: number | undefined | null;
  @Input() totalPages: number[] | undefined | null;
  @Output() setPage: EventEmitter<number> = new EventEmitter();
}
