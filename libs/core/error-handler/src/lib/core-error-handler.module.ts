import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ErrorHandlerEffects } from './+state/error-handler.effects';
import { errorHandlerFeature } from './+state/error-handler.reducer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptorService } from './error-handler-interceptor.service';

@NgModule({
  imports: [StoreModule.forFeature(errorHandlerFeature), EffectsModule.forFeature([ErrorHandlerEffects])],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptorService,
      multi: true,
    },
  ],
})
export class CoreErrorHandlerModule {}
