import { Component, EventEmitter, Output, input, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'cdt-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="search-container">
      <div class="form-group">
        <input
          type="text"
          class="form-control form-control-lg"
          placeholder="Search articles by content..."
          [formControl]="searchControl"
          data-testid="article-search"
        />
        @if (currentSearch()) {
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary mt-2"
            (click)="clearSearch()"
            data-testid="clear-search"
          >
            <i class="ion-close"></i> Clear search
          </button>
        }
      </div>
      @if (currentSearch()) {
        <p class="text-muted small">
          Searching for: "<strong>{{ currentSearch() }}</strong>"
        </p>
      }
    </div>
  `,
  styles: [`
    .search-container {
      margin-bottom: 1rem;
    }
    
    .form-control {
      border-radius: 0.3rem;
    }
    
    .search-container .btn {
      font-size: 0.875rem;
    }
    
    .search-container .text-muted {
      margin-top: 0.5rem;
      margin-bottom: 0;
    }
  `]
})
export class SearchComponent {
  currentSearch = input<string>();
  
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearSearchEmitter = new EventEmitter<void>();

  searchControl = new FormControl('');

  constructor() {
    // Set up search with debouncing
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        const searchTerm = value?.trim();
        if (searchTerm && searchTerm.length >= 2) {
          this.searchChange.emit(searchTerm);
        } else if (!searchTerm) {
          this.clearSearchEmitter.emit();
        }
      });

    // Sync input value with form control
    effect(() => {
      const current = this.currentSearch();
      if (current !== this.searchControl.value) {
        this.searchControl.setValue(current || '', { emitEvent: false });
      }
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.clearSearchEmitter.emit();
  }
}