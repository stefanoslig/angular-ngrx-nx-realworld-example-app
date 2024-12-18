import { ApiService } from '@realworld/core/http-client';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { AuthStore } from './auth.store';

describe('AuthStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthStore, ApiService],
    });
  });

  it('should be created', inject([AuthStore], (service: typeof AuthStore) => {
    expect(service).toBeTruthy();
  }));
});
