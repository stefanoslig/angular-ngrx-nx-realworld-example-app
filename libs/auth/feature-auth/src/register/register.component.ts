import { InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@realworld/auth/data-access';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'cdt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ListErrorsComponent, RouterModule, ReactiveFormsModule, InputErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.authStore.register(this.form.getRawValue());
    this.form.reset();
  }
}
