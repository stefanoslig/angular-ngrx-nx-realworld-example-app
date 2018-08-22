import { AuthState, User } from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromAuth from '@angular-ngrx-nx-realworld-example-app/auth';
import * as fromActions from '@angular-ngrx-nx-realworld-example-app/auth';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AuthState>, private localStorageJwtService: LocalStorageJwtService) {}

  ngOnInit() {
    this.user$ = this.store.select(fromAuth.getUser);
    this.isLoggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.localStorageJwtService
      .getItem()
      .pipe(take(1), filter(token => !!token))
      .subscribe(token => {
        this.store.dispatch(new fromActions.GetUser());
      });
  }
}
