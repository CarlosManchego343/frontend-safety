import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(correo: string, contrasenia: string): Observable<any> {
    const params = new HttpParams().set('correo', correo).set('contrasenia', contrasenia);
    return this.http.get(`${environment.authUrl}/login`, { params });
  }

  guardarToken(token: string) { localStorage.setItem('token', token); }
  getToken(): string | null { return localStorage.getItem('token'); }
  estaAutenticado(): boolean { return !!this.getToken(); }
  logout() { localStorage.removeItem('token'); }
}