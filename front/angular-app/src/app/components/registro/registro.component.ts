// src/app/registro/registro.component.ts

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = { nombres: '', correo: '', clave: '' };
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para registrar al usuario
  register(): void {
    this.authService.register(this.usuario).subscribe(
      (response) => {
        this.message = response.message; // Extraemos el mensaje de la respuesta JSON
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.message = error.error.message || 'Error al registrar, intenta nuevamente.';
        console.error(error);
      }
    );
  }
  
}
