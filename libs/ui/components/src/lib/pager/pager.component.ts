import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() setPage: EventEmitter<number> = new EventEmitter();
}

@NgModule({
  imports: [CommonModule],
  declarations: [PagerComponent],
  exports: [PagerComponent],
})
export class PagerComponentModule {}
