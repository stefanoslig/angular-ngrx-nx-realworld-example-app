import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { AuthFacade } from '@realworld/auth/data-access';
import { NgrxFormsFacade } from '@realworld/core/forms';
import { pipe } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsStoreService extends ComponentStore<Record<string, unknown>> {
  constructor(
    private readonly ngrxFormsFacade: NgrxFormsFacade,
    private readonly settingsService: SettingsService,
    private readonly router: Router,
    private readonly authFacade: AuthFacade,
  ) {
    super({});
  }

  // EFFECTS
  readonly updateSettings = this.effect<void>(
    pipe(
      concatLatestFrom(() => [this.ngrxFormsFacade.data$]),
      concatMap(([, data]) =>
        this.settingsService.update(data).pipe(
          tap((result) => this.router.navigate(['profile', result.user.username])),
          map(() => this.authFacade.getUser()),
        ),
      ),
    ),
  );
}
