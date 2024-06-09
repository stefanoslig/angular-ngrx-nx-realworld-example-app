import { InputComponent, InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';

@Component({
  selector: 'cdt-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ListErrorsComponent, RouterLink, ReactiveFormsModule, InputErrorsComponent, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor() {
    this.form.controls.email.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    this.authStore.login(this.form.getRawValue());
    this.form.reset();
  }
}
