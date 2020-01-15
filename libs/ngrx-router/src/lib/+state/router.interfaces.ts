import { Params, NavigationExtras } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface RouterState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export interface NgrxRoute {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
