import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { LocalStorageJwtService } from './local-storage-jwt.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private storage: LocalStorageJwtService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.storage.getItem().pipe(
      map(token => {
        if (!token) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }),
      take(1),
    );
  }
}
