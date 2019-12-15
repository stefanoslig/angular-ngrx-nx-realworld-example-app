import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromArticle from './+state/article.reducer';
import { filter, take, switchMap, tap } from 'rxjs/operators';
import * as fromActions from './+state/article.actions';
import { ArticleFacade } from './+state/article.facade';

@Injectable()
export class ArticleGuardService implements CanActivate {
  constructor(private facade: ArticleFacade) {}

  waitForArticleToLoad(): Observable<boolean> {
    return this.facade.articleLoaded$.pipe(
      filter(loaded => loaded),
      take(1),
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    this.facade.loadArticle(slug);

    return this.waitForArticleToLoad().pipe(tap(() => this.facade.loadComments(slug)));
  }
}
