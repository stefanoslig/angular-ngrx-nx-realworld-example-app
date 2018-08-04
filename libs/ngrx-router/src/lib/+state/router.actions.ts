import { NavigationExtras } from '@angular/router';

export interface Go {
  type: '[router] Go';
  payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  };
}

export interface Back {
  type: '[router] BACK';
}

export interface Forward {
  type: '[router] FORWARD';
}

export type RouterAction = Go | Back | Forward;
