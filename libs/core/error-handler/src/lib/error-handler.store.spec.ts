import { inject, TestBed } from '@angular/core/testing';

import { ErrorHandlerStore } from './error-handler.store';

describe('ErrorHandlerStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerStore],
    });
  });

  it('should be created', inject([ErrorHandlerStore], (service: typeof ErrorHandlerStore) => {
    expect(service).toBeTruthy();
  }));
});
