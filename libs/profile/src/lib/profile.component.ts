import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileFacade } from './+state/profile.facade';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  profile$ = this.facade.profile$;
  currentUser$ = this.authFacade.user$;
  isUser$: Subject<boolean> = new Subject();
  following!: boolean;
  username!: string;

  constructor(private facade: ProfileFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    combineLatest([this.profile$, this.currentUser$])
      .pipe(
        tap(([p, u]) => {
          this.username = p.username;
          this.following = p.following;
        }),
        map(([p, u]) => p.username === u.username),
        untilDestroyed(this),
      )
      .subscribe((isUser) => this.isUser$.next(isUser));
  }

  toggleFollowing() {
    if (this.following) {
      this.facade.unfollow(this.username);
    } else {
      this.facade.follow(this.username);
    }
  }
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class ProfileComponentModule {}

