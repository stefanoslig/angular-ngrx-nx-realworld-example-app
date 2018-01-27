import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { HomeState } from './home.interfaces';

@Injectable()
export class HomeEffects {
	constructor(private actions: Actions) { }
}
