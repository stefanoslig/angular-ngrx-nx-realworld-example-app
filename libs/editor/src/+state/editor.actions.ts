export interface SetData {
	type: '[editor] SET_DATA';
	payload: any;
}

export interface SetStructure {
	type: '[editor] SET_STRUCTURE';
	payload: any;
}

export type EditorAction = SetData | SetStructure;
