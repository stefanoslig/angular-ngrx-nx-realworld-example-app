import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ArticlesListStore } from './articles-list.store';

describe('ArticlesListStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesListStore],
    });
  });

  it('should be created', inject([ArticlesListStore], (service: typeof ArticlesListStore) => {
    expect(service).toBeTruthy();
  }));
});
