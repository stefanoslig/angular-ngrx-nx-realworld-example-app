import { Home } from './+state/home.interfaces';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Injectable()
export class HomeResolverService implements Resolve<Home> {
  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.store.dispatch({ type: '[home] LOAD_TAGS' });
    return of(true);
  }
}
