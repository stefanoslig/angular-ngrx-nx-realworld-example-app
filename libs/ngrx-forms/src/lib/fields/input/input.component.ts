import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../+state/ngrx-forms.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() field: Field;
  @Input() group: FormGroup;
}
