import { DynamicFormComponent, InputErrorsComponent, ListErrorsComponent } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AuthStore } from '@realworld/auth/data-access';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'cdt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [DynamicFormComponent, ListErrorsComponent, ReactiveFormsModule, InputErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    image: [''],
    username: ['', [Validators.required]],
    bio: [''],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    this.authStore.getUser();
  }

  onSubmit() {}

  logout() {
    this.authStore.logout();
  }
}
