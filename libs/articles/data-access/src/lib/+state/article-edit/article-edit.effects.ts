import { formsActions, ngrxFormsQuery } from '@realworld/core/forms';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { articleEditActions } from './article-edit.actions';
import { ArticlesService } from '../../services/articles.service';
import { Store } from '@ngrx/store';

@Injectable()
export class ArticleEditEffects {
  publishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleEditActions.publishArticle),
      concatLatestFrom(() => this.store.select(ngrxFormsQuery.selectData)),
      concatMap(([_, data]) =>
        this.articlesService.publishArticle(data).pipe(
          tap((result) => this.router.navigate(['article', result.article.slug])),
          map(() => articleEditActions.publishArticleSuccess()),
          catchError((result) => of(formsActions.setErrors({ errors: result.error.errors }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private articlesService: ArticlesService,
    private router: Router,
  ) {}
}
