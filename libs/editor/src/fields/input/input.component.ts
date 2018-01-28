import { Component, OnInit, Input } from '@angular/core';
import { Field } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() field: Field;
  @Input() group: FormGroup;
}
