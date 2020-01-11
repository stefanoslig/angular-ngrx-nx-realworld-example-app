import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const throw401Error = createAction('[ngrx-error] THROW_401_ERROR', props<{ error: HttpErrorResponse }>());
export const throw404Error = createAction('[ngrx-error] THROW_404_ERROR', props<{ error: HttpErrorResponse }>());
