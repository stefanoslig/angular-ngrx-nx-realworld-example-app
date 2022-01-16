import { ValidatorFn } from '@angular/forms';

export interface Field {
  type: FieldType;
  name: string;
  label?: string;
  placeholder?: string;
  validator?: ValidatorFn[];
  attrs?: any;
}

export type FieldType = 'INPUT' | 'TEXTAREA';

export interface Errors {
  [key: string]: string;
}
