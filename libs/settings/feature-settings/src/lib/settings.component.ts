import { DynamicFormComponent, Field, ListErrorsComponent, NgrxFormsFacade } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { editSettingsActions } from '@realworld/settings/data-access';
import { authActions, AuthFacade } from '@realworld/auth/data-access';
import { ComponentStore } from '@ngrx/component-store';
import { SettingsService } from './settings.service';
import { catchError, concatMap, map, pipe, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/effects';
import { Router } from '@angular/router';

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
  standalone: true,
  selector: 'cdt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [DynamicFormComponent, ListErrorsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent extends ComponentStore<Record<string, unknown>> implements OnInit {
  structure$ = this.ngrxFormsFacade.structure$;
  data$ = this.ngrxFormsFacade.data$;

  constructor(
    private readonly store: Store,
    private readonly authFacade: AuthFacade,
    private readonly ngrxFormsFacade: NgrxFormsFacade,
    private readonly settingsService: SettingsService,
    private readonly router: Router,
  ) {
    super({});
  }

  readonly updateSettings = this.effect<void>(
    pipe(
      concatLatestFrom(() => [this.ngrxFormsFacade.data$, this.authFacade.user$]),
      map(([_, data, user]) => ({
        ...user,
        image: data.image,
        username: data.username,
        bio: data.bio,
        pass: data.pass,
        email: data.email,
      })),
      concatMap((data) =>
        this.settingsService.update(data).pipe(
          tap((result) => this.router.navigate(['profile', result.user.username])),
          map(() => authActions.getUser()),
        ),
      ),
    ),
  );

  ngOnInit() {
    this.ngrxFormsFacade.setStructure(structure);
    this.authFacade.user$.pipe(untilDestroyed(this)).subscribe((user) => this.ngrxFormsFacade.setData(user));
  }

  updateForm(changes: any) {
    this.ngrxFormsFacade.updateData(changes);
  }

  submit() {
    this.store.dispatch(editSettingsActions.editSettings());
  }

  logout() {
    this.authFacade.logout();
  }
}
