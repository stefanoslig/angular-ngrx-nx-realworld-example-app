import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'cdt-tags-list',
  standalone: true,
  templateUrl: './tags-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
  tags = input<string[]>([]);
  @Output() setListTag: EventEmitter<string> = new EventEmitter();
}
