import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ArticlesFacade } from '@realworld/articles/data-access';

@Injectable({ providedIn: 'root' })
export class ArticleGuardService implements CanActivate {
  constructor(private facade: ArticlesFacade) {}

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
