import { ApiService } from '@angular-ngrx-nx-realworld-example-app/api';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ApiService, LocalStorageJwtService]
    });
  });

  it(
    'should be created',
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  );
});
