import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { CustomSerializer } from './+state/custom-serializer';
import { RouterEffects } from './+state/router.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([RouterEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  providers: [RouterEffects, [{ provide: RouterStateSerializer, useClass: CustomSerializer }]]
})
export class NgrxRouterModule {}
