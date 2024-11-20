import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@realworld/core/api-types';

@Component({
  selector: 'cdt-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly user = input.required<User>();
  protected readonly isLoggedIn = input.required<boolean>();
}
