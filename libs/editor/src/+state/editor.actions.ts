export interface SetData {
  type: '[editor] SET_DATA';
  payload: any;
}

export interface SetStructure {
  type: '[editor] SET_STRUCTURE';
  payload: any;
}

export interface SaveData {
  type: '[editor] SAVE_DATA';
  payload: any;
}

export interface DataSaveSuccess {
  type: '[editor] SAVE_DATA_SUCCESS';
}

export interface DataSaveFail {
  type: '[editor] SAVE_DATA_FAIL';
  payload: Error;
}

export type EditorAction = SetData | SaveData | DataSaveSuccess | DataSaveFail | SetStructure;
