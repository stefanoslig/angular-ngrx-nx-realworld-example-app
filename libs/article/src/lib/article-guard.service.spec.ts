import { TestBed, inject } from '@angular/core/testing';

import { ArticleGuardService } from './article-guard.service';

describe('ArticleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleGuardService]
    });
  });

  it(
    'should be created',
    inject([ArticleGuardService], (service: ArticleGuardService) => {
      expect(service).toBeTruthy();
    })
  );
});
