import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ArticleStore } from './article.store';
import { provideMockStore } from '@ngrx/store/testing';

describe('ArticleStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleStore, provideMockStore({})],
    });
  });

  it('should be created', inject([ArticleStore], (service: typeof ArticleStore) => {
    expect(service).toBeTruthy();
  }));
});
