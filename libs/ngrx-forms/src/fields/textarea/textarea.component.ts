import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {
	@Input() field: Field;
	@Input() group: FormGroup;
}
