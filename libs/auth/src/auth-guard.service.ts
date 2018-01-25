import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from './+state/auth.reducer';
import { AuthState } from './+state/auth.interfaces';
import { take } from 'rxjs/operators/take';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select('auth').pipe(map(auth => !!auth), take(1));
  }
}
