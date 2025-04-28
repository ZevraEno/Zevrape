import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  failure?: string;

  @Output()
  private readonly close: EventEmitter<void> = new EventEmitter();

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this._fb.group({
      pseudonym: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this._authService.login(this.loginForm.value).subscribe({
      next: () => {
        this._router.navigate(['/affiche']).then();
      },
      error: (err) => {
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

