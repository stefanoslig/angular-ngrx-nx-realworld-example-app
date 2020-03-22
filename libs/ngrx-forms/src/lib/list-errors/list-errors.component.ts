import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NgrxFormsFacade } from '../+state/ngrx-forms.facade';
import { Errors } from '../+state/ngrx-forms.interfaces';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListErrorsComponent implements OnInit, OnDestroy {
  errors$: Observable<Errors>;

  constructor(private ngrxFormsFacade: NgrxFormsFacade) {}

  ngOnInit() {
    this.errors$ = this.ngrxFormsFacade.errors$;
  }

  ngOnDestroy() {
    this.ngrxFormsFacade.initializeErrors();
  }
}
