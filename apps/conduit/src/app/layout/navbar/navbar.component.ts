import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@angular-ngrx-nx-realworld-example-app/api';

@Component({
  selector: 'conduit-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user: User;
  @Input() isLoggedIn: boolean;
}
