import { Component, Input, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Field } from '../../+state/ngrx-forms.interfaces';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() field: Field;
  @Input() group: FormGroup;
}

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [TextareaComponent],
  exports: [TextareaComponent],
})
export class TextareaComponentModule {}
