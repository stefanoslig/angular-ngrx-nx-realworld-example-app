import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '@realworld/core/api-types';
import { AvatarComponent, Icon, IconComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, AvatarComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly user = input.required<User>();
  protected readonly isLoggedIn = input.required<boolean>();
  protected readonly Icon = Icon;
}
