import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { HomeService } from '../home.service';
import {
  HomeActionsType,
  LoadTags,
  LoadTagsSuccess,
  LoadTagsFail
} from './home.actions';

@Injectable()
export class HomeEffects {
  @Effect()
  loadTags = this.actions.pipe(
    ofType<LoadTags>(HomeActionsType.LOAD_TAGS),
    switchMap(() =>
      this.homeService
        .getTags()
        .pipe(
          map(
            results => new LoadTagsSuccess(results.tags),
            catchError(error => of(new LoadTagsFail(error)))
          )
        )
    )
  );

  constructor(private actions: Actions, private homeService: HomeService) {}
}
