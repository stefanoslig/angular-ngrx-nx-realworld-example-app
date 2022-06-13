import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../+state/forms.interfaces';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cdt-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}
