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
import { NxModule } from '@nrwl/angular';

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
        {
          path: '',
          loadChildren: () =>
            import('@angular-ngrx-nx-realworld-example-app/home/src/lib/home.module').then((m) => m.HomeModule),
        },
        {
          path: 'article/:slug',
          loadChildren: () =>
            import('@angular-ngrx-nx-realworld-example-app/article/src/lib/article.module').then(
              (m) => m.ArticleModule,
            ),
        },
        {
          path: 'settings',
          loadChildren: () =>
            import('@angular-ngrx-nx-realworld-example-app/settings/src/lib/settings.module').then(
              (m) => m.SettingsModule,
            ),
        },
        {
          path: 'editor',
          loadChildren: () =>
            import('@angular-ngrx-nx-realworld-example-app/editor/src/lib/editor.module').then((m) => m.EditorModule),
        },
        {
          path: 'profile/:username',
          loadChildren: () =>
            import('@angular-ngrx-nx-realworld-example-app/profile/src/lib/profile.module').then(
              (m) => m.ProfileModule,
            ),
        },
      ],
      {
        initialNavigation: 'enabled',
        useHash: true,
        relativeLinkResolution: 'legacy',
      },
    ),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterModule,
    NgrxErrorModule,
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
