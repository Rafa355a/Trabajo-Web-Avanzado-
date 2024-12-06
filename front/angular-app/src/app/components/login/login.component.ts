// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { correo: '', clave: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        // Guardar el token en localStorage
        this.authService.saveToken(response);
        this.message = 'Inicio de sesión exitoso. Redirigiendo al home...';
        // Redirigir al home después del login
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      (error) => {
        this.message = 'Error al iniciar sesión, verifica tus credenciales.';
        console.error(error);
      }
    );
  }
}

