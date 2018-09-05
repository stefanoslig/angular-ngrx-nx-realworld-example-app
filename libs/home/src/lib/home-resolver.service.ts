import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { HomeFacade } from './+state/home.facade';
import { Home } from './+state/home.reducer';

@Injectable()
export class HomeResolverService implements Resolve<Home> {
  constructor(private facade: HomeFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.facade.loadTags();
    return of(true);
  }
}
