import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';

import { AuthEffects, authFeature, AuthGuardService, TokenInterceptorService } from '@realworld/auth/data-access';
import { SettingsEffects } from '@realworld/settings/data-access';
import { ProfileEffects, ProfileResolverService } from '@realworld/profile/data-access';
import { profileFeature } from '@realworld/profile/data-access';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ErrorHandlerEffects,
  errorHandlerFeature,
  ErrorHandlerInterceptorService,
} from '@realworld/core/error-handler';
import { CoreFormsModule } from '@realworld/core/forms';
import { ArticleEditComponent, ArticleEditResolverService } from '@realworld/articles/article-edit';
import {
  ArticleEditEffects,
  ArticleEffects,
  articleFeature,
  ArticleListEffects,
  articleListFeature,
} from '@realworld/articles/data-access';
import { homeFeature } from '@realworld/home/src/lib/+state/home.reducer';
import { HomeEffects } from '@realworld/home/src/lib/+state/home.effects';
import { ArticleGuardService } from '@realworld/articles/article';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      NxModule.forRoot(),
      RouterModule.forRoot(
        [
          {
            path: '',
            loadComponent: () => import('@realworld/home/src/lib/home.component').then((home) => home.HomeComponent),
            providers: [
              importProvidersFrom(
                StoreModule.forFeature(articleListFeature),
                EffectsModule.forFeature([ArticleListEffects]),
                StoreModule.forFeature(homeFeature),
                EffectsModule.forFeature([HomeEffects]),
              ),
            ],
          },
          {
            path: 'login',
            loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.LoginComponent),
          },
          {
            path: 'register',
            loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.RegisterComponent),
          },
          {
            path: 'article/:slug',
            loadComponent: () => import('@realworld/articles/article').then((m) => m.ArticleComponent),
            providers: [
              importProvidersFrom(StoreModule.forFeature(articleFeature), EffectsModule.forFeature([ArticleEffects])),
            ],
            canActivate: [ArticleGuardService],
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
            loadComponent: () =>
              import('@realworld/articles/article-edit').then((article) => article.ArticleEditComponent),
            providers: [
              importProvidersFrom(
                StoreModule.forFeature(articleFeature),
                EffectsModule.forFeature([ArticleEditEffects]),
              ),
            ],
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: ArticleEditComponent,
                canActivate: [AuthGuardService],
              },
              {
                path: ':slug',
                component: ArticleEditComponent,
                resolve: { ArticleEditResolverService },
              },
            ],
          },
          {
            path: 'profile/:username',
            loadComponent: () =>
              import('@realworld/profile/feature-profile').then((profile) => profile.ProfileComponent),
            providers: [
              importProvidersFrom(EffectsModule.forFeature([ProfileEffects]), StoreModule.forFeature(profileFeature)),
            ],
            resolve: { ProfileResolverService },
            canActivate: [AuthGuardService],
            loadChildren: () => import('@realworld/profile/feature-profile').then((profile) => profile.profileRoutes),
          },
        ],
        {
          initialNavigation: 'enabledBlocking',
          useHash: true,
          relativeLinkResolution: 'legacy',
        },
      ),
      StoreModule.forRoot({ auth: authFeature.reducer, errorHandler: errorHandlerFeature.reducer }),
      EffectsModule.forRoot([ErrorHandlerEffects, AuthEffects]),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      StoreRouterConnectingModule.forRoot(),
      CoreFormsModule,
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
}).catch((err) => console.log(err));
