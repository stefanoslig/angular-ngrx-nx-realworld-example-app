import { ErrorHandler, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgrxErrorEffects } from './+state/ngrx-error.effects';
import { ngrxErrorInitialState } from './+state/ngrx-error.init';
import { ngrxErrorReducer } from './+state/ngrx-error.reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgrxErrorInterceptorService } from './ngrx-error-interceptor.service';

@NgModule({
  imports: [
    StoreModule.forFeature('ngrxError', ngrxErrorReducer, { initialState: ngrxErrorInitialState }),
    EffectsModule.forFeature([NgrxErrorEffects])
  ],
  providers: [
    NgrxErrorEffects,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgrxErrorInterceptorService,
      multi: true
    }
  ]
})
export class NgrxErrorModule {}
