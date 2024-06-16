import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../+state/forms.interfaces';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cdt-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}
