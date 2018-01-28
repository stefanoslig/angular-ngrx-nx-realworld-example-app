import { ValidatorFn } from '@angular/forms';

export interface Editor {
	data: any;
	structure: Field[];
	status: Status;
	valid: boolean;
}

export interface EditorState {
	readonly editor: Editor;
}

export type Status = 'INIT' | 'IN_PROGRESS';

export interface Field {
	type: FieldType;
	name: string;
	label?: string;
	placeholder?: string;
	validator?: ValidatorFn[];
}

export type FieldType = 'INPUT' | 'TEXTAREA';
