import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerFacade } from './+state/error-handler.facade';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private facade: ErrorHandlerFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.facade.throw401Error(error);
              break;
            case 404:
              this.facade.throw404Error(error);
              break;
            default:
              throwError(error);
              break;
          }
        }
        return throwError(error);
      }),
    );
  }
}
