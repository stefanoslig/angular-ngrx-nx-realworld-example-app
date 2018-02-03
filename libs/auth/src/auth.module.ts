import { ApiModule } from '@angular-ngrx-nx/api';
import { EditorModule } from '@angular-ngrx-nx/editor/src/editor.module';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './+state/auth.effects';
import { authInitialState } from './+state/auth.init';
import { authReducer } from './+state/auth.reducer';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const authRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	}
]);

@NgModule({
	imports: [
		CommonModule,
		EditorModule,
		authRouting,
		StoreModule.forFeature('auth', authReducer, { initialState: authInitialState }),
		EffectsModule.forFeature([AuthEffects]),
		ApiModule
	],
	providers: [AuthEffects, LocalStorageJwtService, AuthGuardService, AuthService],
	declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
