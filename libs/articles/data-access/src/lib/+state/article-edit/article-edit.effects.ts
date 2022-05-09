import { NgrxFormsFacade, setErrors } from '@realworld/core/forms';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { articleEditActions } from './article-edit.actions';
import { ArticlesService } from '../../services/articles.service';

@Injectable()
export class ArticleEditEffects {
  publishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleEditActions.publishArticle),
      concatLatestFrom(() => this.ngrxFormsFacade.data$),
      concatMap(([_, data]) =>
        this.articlesService.publishArticle(data).pipe(
          tap((result) => this.router.navigate(['article', result.article.slug])),
          map(() => articleEditActions.publishArticleSuccess()),
          catchError((result) => of(setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private ngrxFormsFacade: NgrxFormsFacade,
    private articlesService: ArticlesService,
    private router: Router,
  ) {}
}
