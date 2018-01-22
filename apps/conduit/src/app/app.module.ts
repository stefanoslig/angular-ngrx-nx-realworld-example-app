import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './+state/app.reducer';
import { appInitialState } from './+state/app.init';
import { AppEffects } from './+state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
  BrowserModule,
  NxModule.forRoot(),
  RouterModule.forRoot([{path: 'home', loadChildren: '@angular-ngrx-nx-realworld-example-app/home#HomeModule'}], {initialNavigation: 'enabled'}),
  StoreModule.forRoot({app: appReducer}, {initialState: {app: appInitialState}}),
  EffectsModule.forRoot([AppEffects]),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  StoreRouterConnectingModule],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent],
  providers: [AppEffects]
})
export class AppModule { }
