import { Subject } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ArticleListComponentModule, ArticlesFeatureArticlesListModule } from '@realworld/articles/articles-list';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { HomeFacade } from './+state/home.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { TagsListComponentModule } from './tags-list/tags-list.component';
import { ArticlesFacade, articleListInitialState, ArticleListConfig } from '@realworld/articles/data-access';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  listConfig$ = this.articlesfacade.listConfig$;
  tags$ = this.facade.tags$;
  isAuthenticated = false;
  unsubscribe$: Subject<void> = new Subject();

  constructor(private facade: HomeFacade, private articlesfacade: ArticlesFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    this.authFacade.isLoggedIn$.pipe(untilDestroyed(this)).subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      this.getArticles();
    });
  }

  setListTo(type: string = 'ALL') {
    this.articlesfacade.setListConfig(<ArticleListConfig>{
      ...articleListInitialState.listConfig,
      type,
    });
  }

  getArticles() {
    if (this.isAuthenticated) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.articlesfacade.setListConfig(<ArticleListConfig>{
      ...articleListInitialState.listConfig,
      filters: {
        ...articleListInitialState.listConfig.filters,
        tag,
      },
    });
  }
}

@NgModule({
  imports: [CommonModule, TagsListComponentModule, ArticlesFeatureArticlesListModule, ArticleListComponentModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
