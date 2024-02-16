import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { AuthStore, LocalStorageJwtService } from '@realworld/auth/data-access';
import { ngrxFormsQuery } from '@realworld/core/forms';
import { pipe } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsStoreService extends ComponentStore<Record<string, unknown>> {
  private readonly settingsService = inject(SettingsService);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);

  // EFFECTS
  readonly updateSettings = this.effect<void>(
    pipe(
      concatLatestFrom(() => [this.store.select(ngrxFormsQuery.selectData)]),
      concatMap(([, data]) =>
        this.settingsService.update(data).pipe(
          tap((result) => this.router.navigate(['profile', result.user.username])),
          tap((result) => this.localStorageJwtService.setItem(result.user.token)),
          map(() => this.authStore.getUser()),
        ),
      ),
    ),
  );
}
