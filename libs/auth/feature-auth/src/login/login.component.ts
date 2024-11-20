import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';

@Component({
  selector: 'cdt-login',
  templateUrl: './login.component.html',
  imports: [ListErrorsComponent, RouterLink, ReactiveFormsModule, InputErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.authStore.login(this.form.getRawValue());
    this.form.reset();
  }
}
