import { ApiService } from '@realworld/core/http-client';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService, ApiService],
    });
  });

  it('should be created', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));
});
