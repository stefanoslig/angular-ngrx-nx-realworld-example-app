import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ProfileStore } from './profile.store';

describe('ProfileStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileStore],
    });
  });

  it('should be created', inject([ProfileStore], (service: typeof ProfileStore) => {
    expect(service).toBeTruthy();
  }));
});
