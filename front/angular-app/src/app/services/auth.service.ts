// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth'; // Cambiar a tu URL de API

    constructor(private http: HttpClient) { }

    // Método para registrar al usuario
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    // Método para iniciar sesión
    login(credentials: any): Observable<any> {
        // Indicamos que la respuesta es de tipo 'text' para evitar el error de JSON
        return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' });
    }

    // Método para obtener el token almacenado
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Método para guardar el token
    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    // Método para eliminar el token
    logout(): void {
        localStorage.removeItem('token');
    }
}
