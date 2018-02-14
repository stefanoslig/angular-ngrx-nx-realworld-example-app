import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LocalStorageJwtService {
  getItem(): Observable<string | null> {
    const data = localStorage.getItem('jwtToken');
    if (data) {
      return of(data);
    }
    return of(null);
  }

  setItem(data: string) {
    localStorage.setItem('jwtToken', data);
  }

  removeItem(): Observable<boolean> {
    localStorage.removeItem('jwtToken');
    return of(true);
  }
}
