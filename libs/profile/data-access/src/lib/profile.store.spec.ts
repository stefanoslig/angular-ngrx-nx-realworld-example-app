import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ArticleStore } from './article.store';

describe('ArticleStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleStore],
    });
  });

  it('should be created', inject([ArticleStore], (service: typeof ArticleStore) => {
    expect(service).toBeTruthy();
  }));
});
