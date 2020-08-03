import { ErrorHandler, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgrxErrorEffects } from './+state/ngrx-error.effects';
import { ngrxErrorReducer, ngrxErrorInitialState, ngrxErrorFeatureKey } from './+state/ngrx-error.reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgrxErrorInterceptorService } from './ngrx-error-interceptor.service';
import { NgrxErrorFacade } from './+state/ngrx-error.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(ngrxErrorFeatureKey, ngrxErrorReducer, {
      initialState: ngrxErrorInitialState,
    }),
    EffectsModule.forFeature([NgrxErrorEffects]),
  ],
  providers: [
    NgrxErrorFacade,
    NgrxErrorEffects,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgrxErrorInterceptorService,
      multi: true,
    },
  ],
})
export class NgrxErrorModule {}
