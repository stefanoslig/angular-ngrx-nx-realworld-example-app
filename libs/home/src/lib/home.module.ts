import { ArticleListModule } from '@angular-ngrx-nx-realworld-example-app/article-list';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HomeEffects } from './+state/home.effects';
import { homeFeature } from './+state/home.reducer';
import { HomeResolverService } from './home-resolver.service';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    ArticleListModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        resolve: { HomeResolverService },
      },
    ]),
    StoreModule.forFeature(homeFeature),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeModule {}
