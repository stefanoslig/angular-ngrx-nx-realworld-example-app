import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMapperPipe } from './error-mapper-pipe';
import { IsErrorVisibleDirective } from './is-error-visible.directive';

@Component({
  selector: 'cdt-input-errors',
  templateUrl: './input-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KeyValuePipe, ErrorMapperPipe, IsErrorVisibleDirective],
})
export class InputErrorsComponent {
  readonly control = input.required<AbstractControl>();
}
