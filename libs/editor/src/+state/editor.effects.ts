import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import { EditorState } from './editor.interfaces';
import { SaveData } from './editor.actions';

@Injectable()
export class EditorEffects {
  @Effect() saveData = this.actions.ofType<SaveData>('[editor] SAVE_DATA').pipe();

  constructor(private actions: Actions) {}
}
