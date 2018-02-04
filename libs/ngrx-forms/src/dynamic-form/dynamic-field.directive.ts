import { Field, FieldType } from '@angular-ngrx-nx/ngrx-forms/src/+state/ngrx-forms.interfaces';
import {
  Directive,
  Input,
  OnInit,
  Component,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Type,
  OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../fields/input/input.component';
import { TextareaComponent } from '../fields/textarea/textarea.component';

const componentsMapper: { [key: string]: Type<any> } = {
  INPUT: InputComponent,
  TEXTAREA: TextareaComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() field: Field;
  @Input() group: FormGroup;
  component: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    const component = this.resolver.resolveComponentFactory<any>(componentsMapper[this.field.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}
