import { pipe, switchMap } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ArticlesFacade, articleListInitialState, ArticleListConfig } from '@realworld/articles/data-access';
import { AuthFacade } from '@realworld/auth/data-access';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { HomeService } from './home.service';

export interface HomeState {
  tags: string[];
}

@UntilDestroy()
@Component({
  selector: 'cdt-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, TagsListComponent, ArticleListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends ComponentStore<HomeState> implements OnInit {
  listConfig$ = this.articlesfacade.listConfig$;
  tags$ = this.select((store) => store.tags);
  isAuthenticated = false;

  constructor(
    private readonly articlesfacade: ArticlesFacade,
    private readonly authFacade: AuthFacade,
    private readonly homeService: HomeService,
  ) {
    super({ tags: [] });
  }

  ngOnInit() {
    this.authFacade.isLoggedIn$.pipe(untilDestroyed(this)).subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      this.getArticles();
      this.getTags();
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

  readonly getTags = this.effect<void>(
    pipe(
      switchMap(() =>
        this.homeService.getTags().pipe(
          tapResponse(
            (response) => {
              this.patchState({ tags: response.tags });
            },
            (error) => {
              console.error('error getting tags: ', error);
            },
          ),
        ),
      ),
    ),
  );
}
