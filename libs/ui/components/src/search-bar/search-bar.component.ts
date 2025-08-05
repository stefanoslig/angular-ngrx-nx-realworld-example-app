import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'cdt-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly fb = inject(FormBuilder);

  @Output() searchChange = new EventEmitter<string>();

  searchForm = this.fb.group({
    search: [''],
  });

  constructor() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.searchChange.emit(value || '');
      });
  }

  clearSearch() {
    this.searchForm.patchValue({ search: '' });
  }
} 