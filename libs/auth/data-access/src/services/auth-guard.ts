import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthStore } from '../auth.store';

export const authGuard = (): boolean | UrlTree => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (!authStore.loggedIn()) {
    return router.parseUrl('/login');
  }

  return true;
};
