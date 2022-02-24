import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
  @Input() tags: string[] = [];
  @Output() setListTag: EventEmitter<string> = new EventEmitter();
}

@NgModule({
  imports: [CommonModule],
  declarations: [TagsListComponent],
  exports: [TagsListComponent],
})
export class TagsListComponentModule {}
