import { NgrxFormsModule } from '@angular-ngrx-nx/ngrx-forms/src/ngrx-forms.module';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './+state/auth.effects';
import { authInitialState } from './+state/auth.init';
import { authReducer } from './+state/auth.reducer';
import { AuthGuardService } from './auth-guard.service';
import { NoAuthGuardService } from './no-auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [NoAuthGuardService]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [NoAuthGuardService]
	}
]);

@NgModule({
	imports: [
		CommonModule,
		NgrxFormsModule,
		authRouting,
		StoreModule.forFeature('auth', authReducer, { initialState: authInitialState }),
		EffectsModule.forFeature([AuthEffects])
	],
	providers: [AuthEffects, AuthGuardService, AuthService, NoAuthGuardService],
	declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
