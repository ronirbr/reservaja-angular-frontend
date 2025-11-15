import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loading) return;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Senhas não coincidem';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register({ name, email, password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.message || 'Erro ao registrar usuário. Tente novamente.';
      },
    });
  }
}
