import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { LocalStorageJwtService } from '@angular-ngrx-nx-realworld-example-app/auth';

@Component({
  selector: 'conduit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  user$ = this.authFacade.user$;
  isLoggedIn$ = this.authFacade.isLoggedIn$;

  constructor(private authFacade: AuthFacade, private localStorageJwtService: LocalStorageJwtService) {}

  ngOnInit() {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token),
      )
      .subscribe(() => this.authFacade.user());
  }
}
