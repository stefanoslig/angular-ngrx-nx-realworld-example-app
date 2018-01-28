import { Component, OnInit, Input } from '@angular/core';
import { Field } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.css']
})
export class TextareaComponent {
	@Input() field: Field;
	@Input() group: FormGroup;
}
