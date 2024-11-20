import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { FormErrorsStore } from '../forms-errors.store';

@Component({
  selector: 'cdt-list-errors',
  templateUrl: './list-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListErrorsComponent implements OnDestroy {
  protected readonly formErrorsStore = inject(FormErrorsStore);

  ngOnDestroy() {
    this.formErrorsStore.setErrors({});
  }
}
