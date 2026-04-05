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
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: token => {
        console.log('TOKEN:', token);

        this.authService.guardarToken(token); // 👈 ahora es string directo
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('ERROR COMPLETO:', err);
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
