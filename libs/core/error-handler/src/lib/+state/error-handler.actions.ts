import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';

export const errorHandlerActions = createActionGroup({
  source: 'Error Handler',
  events: {
    throw401Error: props<{ error: HttpErrorResponse }>(),
    throw404Error: props<{ error: HttpErrorResponse }>(),
  },
});
