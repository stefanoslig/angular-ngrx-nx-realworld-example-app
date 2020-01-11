import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { HomeService } from '../home.service';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadTags),
      switchMap(() =>
        this.homeService.getTags().pipe(
          map(results => HomeActions.loadTagsSuccess({ tags: results.tags })),
          catchError(error => of(HomeActions.loadTagsFail(error))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private homeService: HomeService) {}
}
