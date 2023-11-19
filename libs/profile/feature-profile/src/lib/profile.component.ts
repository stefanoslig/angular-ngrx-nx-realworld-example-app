import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { selectUser } from '@realworld/auth/data-access';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { profileActions, selectProfileState } from '@realworld/profile/data-access';
import { AsyncPipe, NgClass } from '@angular/common';

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
  private readonly destroyRef = inject(DestroyRef);

  profile$ = this.store.select(selectProfileState);
  currentUser$ = this.store.select(selectUser);
  isUser$: Subject<boolean> = new Subject();
  following!: boolean;
  username!: string;

  ngOnInit() {
    combineLatest([this.profile$, this.currentUser$])
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
