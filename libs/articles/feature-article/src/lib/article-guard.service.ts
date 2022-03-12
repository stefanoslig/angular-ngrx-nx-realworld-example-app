import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import * as fromActions from '@realworld/articles/data-access';
import { ArticleFacade } from '@realworld/articles/data-access';

@Injectable()
export class ArticleGuardService implements CanActivate {
  constructor(private facade: ArticleFacade) {}

  waitForArticleToLoad(): Observable<boolean> {
    return this.facade.articleLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    this.facade.loadArticle(slug);

    return this.waitForArticleToLoad().pipe(tap(() => this.facade.loadComments(slug)));
  }
}
