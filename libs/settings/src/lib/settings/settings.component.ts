import { AuthFacade } from '@angular-ngrx-nx-realworld-example-app/auth';
import {
  DynamicFormComponentModule,
  Field,
  ListErrorsComponentModule,
  NgrxFormsFacade,
} from '@angular-ngrx-nx-realworld-example-app/ngrx-forms';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { editSettings } from '../+state/settings.actions';

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

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  structure$ = this.ngrxFormsFacade.structure$;
  data$ = this.ngrxFormsFacade.data$;

  constructor(private store: Store<any>, private authFacade: AuthFacade, private ngrxFormsFacade: NgrxFormsFacade) {}

  ngOnInit() {
    this.ngrxFormsFacade.setStructure(structure);
    this.authFacade.user$.pipe(untilDestroyed(this)).subscribe((user) => this.ngrxFormsFacade.setData(user));
  }

  updateForm(changes: any) {
    this.ngrxFormsFacade.updateData(changes);
  }

  submit() {
    this.store.dispatch(editSettings());
  }

  logout() {
    this.authFacade.logout();
  }
}

@NgModule({
  imports: [DynamicFormComponentModule, ListErrorsComponentModule],
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
})
export class SettingsComponentModule {}
