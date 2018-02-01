import { NavigationExtras } from "@angular/router";

export interface Go {
	type: '[Router] Go';
	payload: {
		path: any[],
		query?: object;
		extras?: NavigationExtras;
	};
}

export interface Back {
	type: '[Router] BACK';
}

export interface Forward {
	type: '[Router] FORWARD';
}

export type RouterAction = Go | Back | Forward;
