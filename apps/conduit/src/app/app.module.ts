import { ArticleModule } from '@angular-ngrx-nx/article';
import { AuthModule } from '@angular-ngrx-nx/auth';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';

import { environment } from '../environments/environment';
import { AppEffects } from './+state/app.effects';
import { appInitialState } from './+state/app.init';
import { appReducer } from './+state/app.reducer';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterNgrxModule } from '@angular-ngrx-nx/router/src/router.module';

@NgModule({
	imports: [
		AuthModule,
		BrowserModule,
		NxModule.forRoot(),
		RouterNgrxModule,
		RouterModule.forRoot([{ path: '', loadChildren: '@angular-ngrx-nx/home#HomeModule' }], {
			initialNavigation: 'enabled'
		}),
		StoreModule.forRoot({ app: appReducer }, { initialState: { app: appInitialState } }),
		EffectsModule.forRoot([AppEffects]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		ArticleModule
	],
	declarations: [AppComponent, FooterComponent, NavbarComponent],
	bootstrap: [AppComponent],
	providers: [AppEffects]
})
export class AppModule { }
