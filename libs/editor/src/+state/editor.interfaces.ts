import { ValidatorFn } from '@angular/forms';

export interface Editor {
	data: any;
	structure: Field[];
	valid: boolean;
}

export interface EditorState {
	readonly editor: Editor;
}

export interface Field {
	type: FieldType;
	name: string;
	label?: string;
	placeholder?: string;
	validator?: ValidatorFn[];
	attrs?: any;
}

export type FieldType = 'INPUT' | 'TEXTAREA';
