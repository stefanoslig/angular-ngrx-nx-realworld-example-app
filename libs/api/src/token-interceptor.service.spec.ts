import { TestBed, inject } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptorService]
    });
  });

  it(
    'should be created',
    inject([TokenInterceptorService], (service: TokenInterceptorService) => {
      expect(service).toBeTruthy();
    })
  );
});
