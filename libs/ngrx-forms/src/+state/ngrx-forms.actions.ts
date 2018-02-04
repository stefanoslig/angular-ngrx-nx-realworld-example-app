export interface SetData {
  type: '[ngrxForms] SET_DATA';
  payload: any;
}

export interface SetStructure {
  type: '[ngrxForms] SET_STRUCTURE';
  payload: any;
}

export type NgrxFormsAction = SetData | SetStructure;
