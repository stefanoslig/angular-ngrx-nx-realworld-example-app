import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './+state/auth.reducer';
import { authInitialState } from './+state/auth.init';
import { AuthEffects } from './+state/auth.effects';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { ApiModule } from '@angular-ngrx-nx/api';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer, { initialState: authInitialState }),
    EffectsModule.forFeature([AuthEffects]),
    ApiModule
  ],
  providers: [AuthEffects, LocalStorageJwtService, AuthGuardService],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
