import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo = '';
  contrasenia = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.correo, this.contrasenia).subscribe({
      next: data => {
        this.authService.guardarToken(data.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => this.error = 'Usuario o contraseña incorrectos'
    });
  }
}
