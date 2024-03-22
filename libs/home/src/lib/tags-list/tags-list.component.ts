import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, output, input } from '@angular/core';

@Component({
  selector: 'cdt-tags-list',
  standalone: true,
  templateUrl: './tags-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
  tags = input([]);
  setListTag = output<string>();
}
