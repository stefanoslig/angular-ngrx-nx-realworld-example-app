import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@realworld/core/api-types';

@Component({
  selector: 'conduit-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user!: User;
  @Input() isLoggedIn!: boolean;
}
