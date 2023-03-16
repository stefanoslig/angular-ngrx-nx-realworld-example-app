import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeature, authGuard, tokenInterceptor, authFunctionalEffects } from '@realworld/auth/data-access';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlerEffects, errorHandlerFeature, errorHandlingInterceptor } from '@realworld/core/error-handler';
import { ngrxFormsEffects, ngrxFormsFeature } from '@realworld/core/forms';
import { API_URL } from '@realworld/core/http-client';
import { provideEffects } from '@ngrx/effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('@realworld/home/src/lib/home.routes').then((home) => home.HOME_ROUTES),
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
        path: 'article',
        loadChildren: () => import('@realworld/articles/article').then((m) => m.ARTICLE_ROUTES),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@realworld/settings/feature-settings').then((settings) => settings.SettingsComponent),
      },
      {
        path: 'editor',
        loadChildren: () => import('@realworld/articles/article-edit').then((article) => article.ARTICLE_EDIT_ROUTES),
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        loadChildren: () => import('@realworld/profile/feature-profile').then((profile) => profile.PROFILE_ROUTES),
      },
    ]),
    provideStore({
      auth: authFeature.reducer,
      errorHandler: errorHandlerFeature.reducer,
      ngrxForms: ngrxFormsFeature.reducer,
    }),
    provideEffects(errorHandlerEffects, ngrxFormsEffects, authFunctionalEffects),
    provideRouterStore(),
    provideHttpClient(withInterceptors([errorHandlingInterceptor, tokenInterceptor])),
    !environment.production ? provideStoreDevtools() : [],
    { provide: API_URL, useValue: environment.api_url },
  ],
}).catch((err) => console.log(err));
