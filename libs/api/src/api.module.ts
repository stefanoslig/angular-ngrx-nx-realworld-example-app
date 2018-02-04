import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '@angular-ngrx-nx/api/src/token-interceptor.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class ApiModule {}
