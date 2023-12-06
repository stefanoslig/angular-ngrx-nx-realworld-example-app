import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Subject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileState } from '@realworld/profile/data-access';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthStore } from '@realworld/auth/data-access';

@Component({
  standalone: true,
  selector: 'cdt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [RouterModule, NgClass, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  profile$ = this.store.select(selectProfileState);
  isUser$: Subject<boolean> = new Subject();
  following!: boolean;
  username!: string;

  $currentUser = this.authStore.user;

  ngOnInit() {
    combineLatest([this.profile$, toObservable(this.$currentUser, { injector: this.injector })])
      .pipe(
        tap(([p]) => {
          this.username = p.username;
          this.following = p.following;
        }),
        map(([p, u]) => p.username === u.username),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((isUser) => this.isUser$.next(isUser));
  }

  toggleFollowing() {
    if (this.following) {
      this.store.dispatch(profileActions.unfollow({ id: this.username }));
    } else {
      this.store.dispatch(profileActions.follow({ id: this.username }));
    }
  }
}
