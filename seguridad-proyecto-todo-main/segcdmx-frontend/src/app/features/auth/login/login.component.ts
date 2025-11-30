import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/services/auth.service';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa tus credenciales.';
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    
    this.authService.login(username, password).subscribe({
      next: (success) => {
        if (success) {
          this.errorMessage = '';
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          const message = error.error?.message || 'Acceso denegado: Solo administradores';
          this.toastService.push(message, 'danger');
          this.errorMessage = message;
        } else if (error.status === 401) {
          this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
          this.toastService.push('Credenciales inválidas', 'danger');
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
          this.toastService.push('Error al iniciar sesión', 'danger');
        }
      },
    });
  }
}
