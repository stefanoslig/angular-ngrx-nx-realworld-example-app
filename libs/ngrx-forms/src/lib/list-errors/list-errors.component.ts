import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { NgrxFormsFacade } from '../+state/ngrx-forms.facade';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors: string[];
  unsubscribe$: Subject<void> = new Subject();

  constructor(private ngrxFormsFacade: NgrxFormsFacade, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.ngrxFormsFacade.errors$.subscribe(e => {
      this.errors = Object.keys(e || {}).map(key => `${key} ${e[key]}`);
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.ngrxFormsFacade.initializeErrors();
  }
}
