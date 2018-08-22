import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError as _throw } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromActions from './+state/ngrx-error.actions';

@Injectable()
export class NgrxErrorInterceptorService implements HttpInterceptor {
  constructor(private store: Store<any>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.store.dispatch(new fromActions.Throw401Error(error));
              break;
            case 404:
              this.store.dispatch(new fromActions.Throw404Error(error));
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
