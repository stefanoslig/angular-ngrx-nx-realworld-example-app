import { inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

import { LocalStorageJwtService } from './local-storage-jwt.service';

export const authGuard = (): Observable<boolean | UrlTree> => {
  const storage = inject(LocalStorageJwtService);
  const router = inject(Router);

  return storage.getItem().pipe(
    map((token) => {
      if (!token) {
        return router.parseUrl('/login');
      }
      return true;
    }),
    take(1),
  );
};
