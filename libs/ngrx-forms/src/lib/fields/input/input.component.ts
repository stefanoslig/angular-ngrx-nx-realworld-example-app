import { Component, OnInit, Input, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Field } from '../../+state/ngrx-forms.interfaces';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputComponentModule {}
