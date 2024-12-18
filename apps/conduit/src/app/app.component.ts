import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'cdt-root',
  templateUrl: './app.component.html',
  imports: [FooterComponent, NavbarComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly authStore = inject(AuthStore);

  constructor() {
    this.authStore.getUser();
  }
}
