import { CoreHttpClientModule } from '@realworld/core/http-client';
import { AuthModule } from '@angular-ngrx-nx-realworld-example-app/auth';
import { CoreErrorHandlerModule } from '@realworld/core/error-handler';
import { CoreFormsModule } from '@realworld/core/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    CoreHttpClientModule,
    CoreErrorHandlerModule,
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
          loadChildren: () => import('@realworld/articles/article').then((m) => m.ArticleFeatureArticleModule),
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
            import('@realworld/articles/article-edit').then((m) => m.ArticlesFeatureArticleEditModule),
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
    StoreRouterConnectingModule.forRoot(),
    CoreFormsModule,
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
