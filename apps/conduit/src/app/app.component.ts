import { User } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { ChangeDetectionStrategy, Component, OnInit, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/auth';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'conduit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authFacade: AuthFacade,
    private localStorageJwtService: LocalStorageJwtService,
    private router: Router,
    private appRef: ApplicationRef,
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        tap(e => this.appRef.tick()),
      )
      .subscribe();
  }

  ngOnInit() {
    this.user$ = this.authFacade.user$;
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter(token => !!token),
      )
      .subscribe(token => this.authFacade.user());
  }
}
