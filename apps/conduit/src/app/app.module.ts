import { ApiModule } from '@angular-ngrx-nx-realworld-example-app/api';
import { AuthModule } from '@angular-ngrx-nx-realworld-example-app/auth';
import { NgrxErrorModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-error';
import { NgrxRouterModule } from '@angular-ngrx-nx-realworld-example-app/ngrx-router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    ApiModule,
    AuthModule,
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        { path: '', loadChildren: '@angular-ngrx-nx-realworld-example-app/home#HomeModule' },
        { path: 'article/:slug', loadChildren: '@angular-ngrx-nx-realworld-example-app/article#ArticleModule' },
        { path: 'settings', loadChildren: '@angular-ngrx-nx-realworld-example-app/settings#SettingsModule' },
        { path: 'editor', loadChildren: '@angular-ngrx-nx-realworld-example-app/editor#EditorModule' },
        { path: 'profile/:username', loadChildren: '@angular-ngrx-nx-realworld-example-app/profile#ProfileModule' }
      ],
      {
        initialNavigation: 'enabled',
        useHash: true
      }
    ),
    StoreModule.forRoot({}, { metaReducers: !environment.production ? [storeFreeze] : [] }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterModule,
    NgrxErrorModule
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
