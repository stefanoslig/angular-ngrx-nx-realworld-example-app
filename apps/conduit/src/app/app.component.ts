import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  authActions,
  AuthStore,
  LocalStorageJwtService,
  selectLoggedIn,
  selectUser,
} from '@realworld/auth/data-access';
import { filter, take } from 'rxjs/operators';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'cdt-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FooterComponent, NavbarComponent, RouterModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly storeV2 = inject(AuthStore);

  $user = this.storeV2.user;
  $isLoggedIn = this.storeV2.loggedIn;

  ngOnInit() {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token),
      )
      .subscribe(() => this.storeV2.getUser());
  }
}
