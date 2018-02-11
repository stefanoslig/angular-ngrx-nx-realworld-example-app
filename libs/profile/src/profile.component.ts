import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState, User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Profile, ProfileState } from '@angular-ngrx-nx/profile/src/+state/profile.interfaces';
import * as fromProfile from './+state/profile.reducer';
import * as fromAuth from '@angular-ngrx-nx/auth/src/+state/auth.reducer';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { map } from 'rxjs/operators/map';
import { takeUntil } from 'rxjs/operators/takeUntil';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile$: Observable<Profile>;
  currentUser$: Observable<User>;
  isUser$: Subject<boolean> = new Subject();
  unsubscribe$: Subject<void> = new Subject();

  constructor(private store: Store<ProfileState | AuthState>) {}

  ngOnInit() {
    this.profile$ = this.store.select(fromProfile.getProfile);
    this.currentUser$ = this.store.select(fromAuth.getUser);

    this.profile$
      .pipe(combineLatest(this.currentUser$), map(([p, u]) => p.username === u.username), takeUntil(this.unsubscribe$))
      .subscribe(isUser => this.isUser$.next(isUser));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
