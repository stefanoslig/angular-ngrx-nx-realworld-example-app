import { User } from '@angular-ngrx-nx/auth/src/+state/auth.interfaces';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() user: User;
  @Input() isLoggedIn: boolean;
}
