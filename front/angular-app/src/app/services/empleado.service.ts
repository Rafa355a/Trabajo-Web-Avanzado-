// src/app/services/empleado.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importar AuthService para obtener el token

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080'; // Cambiar a tu URL de API

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para incluir el token en las solicitudes
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token del AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Agregar el token a la cabecera
    });
  }

  // Obtener todos los empleados,
  getEmpleados(headers: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/empleados`, { headers });
  }

  // Crear un nuevo empleado
createEmpleado(body: any, headers: HttpHeaders): Observable<any> {
  return this.http.post(`${this.apiUrl}/empleados`, body, { headers });
}

// Actualizar un empleado existente
updateEmpleado(id: number, body: any, headers: HttpHeaders): Observable<any> {
  return this.http.put(`${this.apiUrl}/empleados/${id}`, body, { headers });
}


  // Eliminar un empleado
  deleteEmpleado(id: number, headers: HttpHeaders): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleados/${id}`, { headers });
  }
}
