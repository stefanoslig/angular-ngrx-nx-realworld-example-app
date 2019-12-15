import { User, Profile } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { ProfileFacade } from './+state/profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile$: Observable<Profile>;
  currentUser$: Observable<User>;
  isUser$: Subject<boolean> = new Subject();
  unsubscribe$: Subject<void> = new Subject();
  following: boolean;
  username: string;

  constructor(private facade: ProfileFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    this.profile$ = this.facade.profile$;
    this.currentUser$ = this.authFacade.user$;
    combineLatest([this.profile$, this.currentUser$])
      .pipe(
        tap(([p, u]) => {
          this.username = p.username;
          this.following = p.following;
        }),
        map(([p, u]) => p.username === u.username),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(isUser => this.isUser$.next(isUser));
  }

  toggleFollowing() {
    if (this.following) {
      this.facade.unfollow(this.username);
    } else {
      this.facade.follow(this.username);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
