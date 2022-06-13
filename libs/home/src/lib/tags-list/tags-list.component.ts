import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cdt-tags-list',
  standalone: true,
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
  @Input() tags: string[] = [];
  @Output() setListTag: EventEmitter<string> = new EventEmitter();
}
