import { DynamicFormComponentModule, Field, ListErrorsComponentModule, NgrxFormsFacade } from '@realworld/core/forms';
import { ChangeDetectionStrategy, Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@realworld/auth/data-access';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Username',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ListErrorsComponentModule, DynamicFormComponentModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  structure$ = this.ngrxFormsFacade.structure$;
  data$ = this.ngrxFormsFacade.data$;

  constructor(private ngrxFormsFacade: NgrxFormsFacade, private facade: AuthFacade) {}

  ngOnInit() {
    this.ngrxFormsFacade.setStructure(structure);
    this.data$ = this.ngrxFormsFacade.data$;
    this.structure$ = this.ngrxFormsFacade.structure$;
  }

  updateForm(changes: any) {
    this.ngrxFormsFacade.updateData(changes);
  }

  submit() {
    this.facade.register();
  }

  ngOnDestroy() {
    this.ngrxFormsFacade.initializeForm();
  }
}
