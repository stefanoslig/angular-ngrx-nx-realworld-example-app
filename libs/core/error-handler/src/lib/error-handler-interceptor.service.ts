import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerFacade } from './+state/error-handler.facade';

export const errorHandlingInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const errorHandlerFacade = inject(ErrorHandlerFacade);

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            errorHandlerFacade.throw401Error(error);
            break;
          case 404:
            errorHandlerFacade.throw404Error(error);
            break;
          default:
            throwError(error);
            break;
        }
      }
      return throwError(error);
    }),
  );
};
