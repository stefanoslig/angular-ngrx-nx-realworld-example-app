import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './+state/router.effects';
import { CustomSerializer, routerReducer } from '@angular-ngrx-nx/router/src/+state/router.reducer';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([RouterEffects]),
    StoreRouterConnectingModule
  ],
  providers: [RouterEffects, [{ provide: RouterStateSerializer, useClass: CustomSerializer }]]
})
export class RouterNgrxModule {}
