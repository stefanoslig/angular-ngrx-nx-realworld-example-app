import { Injectable, effect, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthStore } from '../auth.store';
import { finalize, map, Observable, ReplaySubject, skipWhile, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private userLoading = new ReplaySubject<boolean>(1);
  private watcher = effect(() => this.userLoading.next(this.authStore.getUserLoading()));

  canActivate(): Observable<boolean | UrlTree> {
    return this.userLoading.pipe(
      skipWhile((loading) => !!loading),
      take(1),
      map(() => (this.authStore.loggedIn() ? true : this.router.parseUrl('/login'))),
      finalize(() => this.watcher.destroy()),
    );
  }
}
