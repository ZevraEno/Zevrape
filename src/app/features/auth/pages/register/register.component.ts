import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Button} from 'primeng/button';
import {InputNumber} from 'primeng/inputnumber';

import {Select} from 'primeng/select';
import {Router} from "@angular/router";
import {RegisterFormModel} from '../../models/register-form.models';
import {AuthService} from '../../services/auth.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Card,
    DropdownModule,
    FloatLabel,
    InputText,
    DatePicker,
    Button,
    InputNumber,
    FormsModule,
    Select
  ],
  template: `
    <h2>Register</h2>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      @if (failure) {
        <p-card>
          <div class="red">
            {{ failure }}
          </div>
        </p-card>
      }
      <p-float-label variant="in">
        <input
          pInputText
          id="pseudonym"
          formControlName="pseudonym"
          fluid="true"/>
        <label for="pseudonym">Pseudonym</label>
      </p-float-label>
      <p-float-label variant="in">
        <input
          pInputText
          id="email"
          formControlName="email"
          fluid="true"/>
        <label for="email">Email</label>
      </p-float-label>
      <p-float-label variant="in">
        <p-date-picker
          id="birthDate"
          formControlName="birthDate"
          fluid="true"/>
        <label for="birthDate">Birth date</label>
      </p-float-label>
      <div class="form-group">
        <p-float-label variant="in">
          <p-select
            id="gender"
            optionLabel="label"
            formControlName="gender"
            dataKey="value"
            [options]="genders"
            fluid="true"
          />
          <label for="gender">Gender</label>
        </p-float-label>
      </div>
      <p-button
        severity="info"
        label="Register"
        type="submit"
        size="large"
        fluid="true"/>
    </form>
  `,
})
export class RegisterComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  genders: any[];
  registerForm: FormGroup;
  failure?: string;

  constructor() {
    this.registerForm = this._fb.group({
      pseudonym: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });
    this.genders = [
      {label: 'Female', value: 'FEMALE'},
      {label: 'Male', value: 'MALE'},
      {label: 'Unknown', value: 'UNKNOWN'},
    ];
    this.registerForm.patchValue({gender: {value: this.genders[0].value}});
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;
    const formValue = this.registerForm.value;
    const form: RegisterFormModel = {
      ...formValue,
      birthDate: formValue.birthDate.toISOString(),
      gender: formValue.gender.value as "MALE" | "FEMALE" | "UNKNOWN",
    };
    this._authService.register(form).subscribe({
      next: _ => {
        this._router.navigate(['/affiche']).then();
      },
      error: err => {
        if (typeof err.error === "string") {
          this.failure = err.error;
        } else {
          this.failure = Object.entries(err.error)
            .map(([key, value]) => `The "${key}" value ${value}`)
            .toString();
        }
      }
    });
  }
}
