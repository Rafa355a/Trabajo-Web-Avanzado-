// src/app/services/cargo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importar AuthService para obtener el token

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = 'http://localhost:8080/cargos'; // Cambiar a tu URL de API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para incluir el token en las solicitudes
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Obtener el token del AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Agregar el token a la cabecera
    });
  }

  // Obtener todos los cargos
  getCargos(): Observable<any[]> {
    const headers = this.getHeaders(); // Generar las cabeceras dinámicamente
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Crear un nuevo cargo
  createCargo(cargo: any): Observable<any> {
    const headers = this.getHeaders(); // Generar las cabeceras dinámicamente
    return this.http.post(this.apiUrl, cargo, { headers });
  }

  // Actualizar un cargo existente
  updateCargo(id: number, cargo: any): Observable<any> {
    const headers = this.getHeaders(); // Generar las cabeceras dinámicamente
    return this.http.put(`${this.apiUrl}/${id}`, cargo, { headers });
  }

  // Eliminar un cargo
  deleteCargo(id: number): Observable<any> {
    const headers = this.getHeaders(); // Generar las cabeceras dinámicamente
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
