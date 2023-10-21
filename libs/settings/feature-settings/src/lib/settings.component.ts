import { DynamicFormComponent, Field, formsActions, ListErrorsComponent, ngrxFormsQuery } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Validators } from '@angular/forms';
import { authActions, selectUser } from '@realworld/auth/data-access';
import { SettingsStoreService } from './settings.store';
import { Store } from '@ngrx/store';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'image',
    placeholder: 'URL of profile picture',
    validator: [],
  },
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Your Name',
    validator: [Validators.required],
  },
  {
    type: 'TEXTAREA',
    name: 'bio',
    placeholder: 'Short bio about you',
    validator: [],
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'New Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  standalone: true,
  selector: 'cdt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [DynamicFormComponent, ListErrorsComponent],
  providers: [SettingsStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly settingsStoreService = inject(SettingsStoreService);
  private readonly destroyRef = inject(DestroyRef);

  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);

  ngOnInit() {
    this.store.dispatch(authActions.getUser());
    this.store.dispatch(formsActions.setStructure({ structure }));
    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => this.store.dispatch(formsActions.setData({ data: user })));
  }

  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({ data: changes }));
  }

  submit() {
    this.settingsStoreService.updateSettings();
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }
}
