import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';

@Component({
  selector: 'cdt-tags-list',
  templateUrl: './tags-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
  tags = input<string[]>([]);
  setListTag = output<string>();
}
