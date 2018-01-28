import { Field } from '@angular-ngrx-nx/editor/src/+state/editor.interfaces';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { map } from 'rxjs/operators/map';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators/tap';


@Component({
	selector: 'dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges, OnDestroy {


	@Input() field$: Observable<Field[]>;
	@Input() data$: Observable<any>
	unsubscribe$: Subject<void> = new Subject();
	form: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnChanges() {
		this.field$.pipe(
			map(this.formBuilder),
			tap(this.listenFormChanges),
			combineLatest(this.data$),
			takeUntil(this.unsubscribe$)
		)
			.subscribe(this.patchValue)
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	private formBuilder = (structure: Field[]): FormGroup => {
		const group = this.fb.group({});
		structure.forEach(field => group.addControl(field.name, this.control(field)));
		return group;
	}

	private control = (field: Field): FormControl => {
		return this.fb.control('', field.validator);
	}

	private patchValue = ([form, data]) => {
		!!data ? form.patchValue(data) : form.patchValue({});
	}

	private listenFormChanges(form: FormGroup) {
		this.form = form;
		//form.valueChanges.subscribe((changes: any) => this.updateForm.emit(changes))
	}
}
