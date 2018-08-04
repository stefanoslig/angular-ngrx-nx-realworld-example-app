import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface RouterState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}
