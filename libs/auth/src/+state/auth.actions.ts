export interface LoadData {
  type: 'LOAD_DATA';
  payload: {};
}

export interface DataLoaded {
  type: 'DATA_LOADED';
  payload: {};
}

export type AuthAction = LoadData | DataLoaded;

