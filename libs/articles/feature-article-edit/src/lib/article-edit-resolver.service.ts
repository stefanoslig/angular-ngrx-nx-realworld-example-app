import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticlesFacade } from '@realworld/articles/data-access';

@Injectable()
export class ArticleEditResolverService implements Resolve<Observable<boolean>> {
  constructor(private facade: ArticlesFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    if (slug) {
      this.facade.loadArticle(slug);
    }
    return of(true);
  }
}
