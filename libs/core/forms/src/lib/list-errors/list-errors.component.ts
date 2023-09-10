import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ngrxFormsQuery } from '../+state/forms.selectors';
import { formsActions } from '../..';

@UntilDestroy()
@Component({
  selector: 'cdt-list-errors',
  standalone: true,
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  errors: string[] = [];

  ngOnInit() {
    this.store
      .select(ngrxFormsQuery.selectErrors)
      .pipe(untilDestroyed(this))
      .subscribe((e) => {
        this.errors = Object.keys(e || {}).map((key) => `${key} ${e[key]}`);
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.initializeErrors());
  }
}
