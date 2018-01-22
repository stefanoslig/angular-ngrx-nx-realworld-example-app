import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './+state/auth.reducer';
import { authInitialState } from './+state/auth.init';
import { AuthEffects } from './+state/auth.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('auth', authReducer, {initialState: authInitialState}), EffectsModule.forFeature([AuthEffects])],
  providers: [AuthEffects]
})
export class AuthModule {
}
