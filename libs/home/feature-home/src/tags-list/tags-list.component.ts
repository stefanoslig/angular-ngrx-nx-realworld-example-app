import { Component, ChangeDetectionStrategy, output, input } from '@angular/core';
import { TagChipComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-tags-list',
  templateUrl: './tags-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagChipComponent],
})
export class TagsListComponent {
  tags = input<string[]>([]);
  setListTag = output<string>();
}
