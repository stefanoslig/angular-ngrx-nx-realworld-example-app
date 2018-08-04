import { TestBed, inject } from '@angular/core/testing';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleService]
    });
  });

  it(
    'should be created',
    inject([ArticleService], (service: ArticleService) => {
      expect(service).toBeTruthy();
    })
  );
});
