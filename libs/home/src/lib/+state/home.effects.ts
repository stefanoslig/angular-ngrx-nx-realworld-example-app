import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { HomeService } from '../home.service';
import { homeActions } from './home.actions';

@Injectable()
export class HomeEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.loadTags),
      switchMap(() =>
        this.homeService.getTags().pipe(
          map((results) => homeActions.loadTagsSuccess({ tags: results.tags })),
          catchError((error) => of(homeActions.loadTagsFailure(error))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private homeService: HomeService) {}
}
