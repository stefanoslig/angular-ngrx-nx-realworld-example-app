import { effect, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthStore } from '../auth.store';
import { finalize, map, Observable, ReplaySubject, skipWhile, take } from 'rxjs';

export const authGuard = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const userLoading = new ReplaySubject<boolean>(1);
  const watcher = effect(() => userLoading.next(authStore.getUserLoading()));

  return userLoading.pipe(
    skipWhile((userLoading) => !!userLoading),
    take(1),
    map(() => (authStore.loggedIn() ? true : router.parseUrl('/login'))),
    finalize(() => watcher.destroy()),
  );
};
