import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Injectable } from '@angular/core';
import { Observable, throwError as _throw } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromActions from './+state/ngrx-error.actions';
import { NgrxErrorFacade } from './+state/ngrx-error.facade';

@Injectable()
export class NgrxErrorInterceptorService implements HttpInterceptor {
  constructor(private facade: NgrxErrorFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.facade.throw401Error(error);
              break;
            case 404:
              this.facade.throw404Error(error);
              break;
            default:
              _throw(error);
              break;
          }
        }
        return _throw(error);
      })
    );
  }
}
