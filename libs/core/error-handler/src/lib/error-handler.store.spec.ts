import { inject, TestBed } from '@angular/core/testing';

import { ErrorHandlerStore } from './error-handler.store';
import { provideMockStore } from '@ngrx/store/testing';

describe('ErrorHandlerStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerStore, provideMockStore({})],
    });
  });

  it('should be created', inject([ErrorHandlerStore], (service: typeof ErrorHandlerStore) => {
    expect(service).toBeTruthy();
  }));
});
