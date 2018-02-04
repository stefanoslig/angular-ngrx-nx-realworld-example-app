import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class NgrxFormsEffects {
  constructor(private actions: Actions) {}
}
