import { Injectable } from '@angular/core';
import { ComponentStore, OnStateInit } from '@ngrx/component-store';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HomeService } from './home.service';
import { tapResponse } from '@ngrx/operators';

export interface HomeState {
  tags: string[];
}

@Injectable()
export class HomeStoreService extends ComponentStore<HomeState> implements OnStateInit {
  constructor(private readonly homeService: HomeService) {
    super({ tags: [] });
  }

  ngrxOnStateInit() {
    this.getTags();
  }

  // SELECTORS
  tags$ = this.select((store) => store.tags);

  // EFFECTS
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
