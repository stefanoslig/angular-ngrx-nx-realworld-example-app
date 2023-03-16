import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { LocalStorageJwtService } from './local-storage-jwt.service';

export const authGuard = () =>
  inject(LocalStorageJwtService)
    .getItem()
    .pipe(
      map((token) => {
        if (!token) {
          inject(Router).navigate(['/login']);
          return false;
        }
        return true;
      }),
      take(1),
    );
