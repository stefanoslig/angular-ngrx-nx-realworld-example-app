import { ComponentRef, Directive, Input, NgModule, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../+state/ngrx-forms.interfaces';
import { InputComponent } from '../fields/input/input.component';
import { TextareaComponent } from '../fields/textarea/textarea.component';

// TODO: remove any
const componentsMapper: { [key: string]: Type<any> } = {
  INPUT: InputComponent,
  TEXTAREA: TextareaComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() field: Field;
  @Input() group: FormGroup;
  component: ComponentRef<any>;

  constructor(private container: ViewContainerRef) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    this.component = this.container.createComponent(componentsMapper[this.field.type]);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}

@NgModule({
  declarations: [DynamicFieldDirective],
  exports: [DynamicFieldDirective],
})
export class DynamicFieldDirectiveModule {}
