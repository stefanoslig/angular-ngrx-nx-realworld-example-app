import { CoreHttpClientModule } from '@realworld/core/http-client';
import { CoreErrorHandlerModule } from '@realworld/core/error-handler';
import { CoreFormsModule } from '@realworld/core/forms';
import { importProvidersFrom, NgModule } from '@angular/core';
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
import { AuthFeatureAuthModule } from '@realworld/auth/feature-auth';
import { AuthDataAccessModule, AuthGuardService } from '@realworld/auth/data-access';
import { SettingsEffects } from '@realworld/settings/data-access';
import {
  ProfileArticlesResolverService,
  ProfileEffects,
  ProfileFavoritesResolverService,
  ProfileResolverService,
} from '@realworld/profile/data-access';
import { ArticleListComponent } from '@realworld/articles/articles-list';
import { profileFeature } from '@realworld/profile/data-access';

@NgModule({
  imports: [
    CoreHttpClientModule,
    CoreErrorHandlerModule,
    AuthFeatureAuthModule,
    AuthDataAccessModule,
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () => import('@realworld/home/src/lib/home.module').then((m) => m.HomeModule),
        },
        {
          path: 'article/:slug',
          loadChildren: () => import('@realworld/articles/article').then((m) => m.ArticleFeatureArticleModule),
        },
        {
          path: 'settings',
          loadComponent: () =>
            import('@realworld/settings/feature-settings').then((settings) => settings.SettingsComponent),
          canActivate: [AuthGuardService],
          providers: [importProvidersFrom(EffectsModule.forFeature([SettingsEffects]))],
        },
        {
          path: 'editor',
          loadChildren: () =>
            import('@realworld/articles/article-edit').then((m) => m.ArticlesFeatureArticleEditModule),
        },
        {
          path: 'profile/:username',
          loadComponent: () => import('@realworld/profile/feature-profile').then((profile) => profile.ProfileComponent),
          providers: [
            importProvidersFrom(EffectsModule.forFeature([ProfileEffects]), StoreModule.forFeature(profileFeature)),
          ],
          resolve: { ProfileResolverService },
          canActivate: [AuthGuardService],
          children: [
            {
              path: '',
              component: ArticleListComponent,
              resolve: { ProfileArticlesResolverService },
            },
            {
              path: 'favorites',
              component: ArticleListComponent,
              resolve: { ProfileFavoritesResolverService },
            },
          ],
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
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
