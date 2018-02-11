import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ngrxErrorReducer } from './+state/ngrx-error.reducer';
import { ngrxErrorInitialState } from './+state/ngrx-error.init';
import { NgrxErrorEffects } from './+state/ngrx-error.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('ngrxError', ngrxErrorReducer, { initialState: ngrxErrorInitialState }),
    EffectsModule.forFeature([NgrxErrorEffects])
  ],
  providers: [NgrxErrorEffects]
})
export class NgrxErrorModule {}
