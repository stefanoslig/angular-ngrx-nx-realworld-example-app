import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFacade, LocalStorageJwtService } from '@realworld/auth/data-access';
import { filter, take } from 'rxjs/operators';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'conduit-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FooterComponent, NavbarComponent, RouterModule, CommonModule],
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
