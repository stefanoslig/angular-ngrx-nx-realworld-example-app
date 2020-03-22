import { Pipe, PipeTransform } from '@angular/core';
import { Errors } from '../+state/ngrx-forms.interfaces';

@Pipe({
  name: 'listErrors',
  pure: true,
})
export class ListErrorsPipe implements PipeTransform {
  transform(e: Errors) {
    return Object.keys(e || {}).map(key => `${key} ${e[key]}`);
  }
}
