import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Capacitacion } from '../models/capacitacion';

@Injectable({ providedIn: 'root' })
export class CapacitacionesService {

  private apiUrl = `${environment.apiUrl}/capacitaciones`;

  constructor(private http: HttpClient) {}

  getCapacitaciones(): Observable<Capacitacion[]> {

  const tokenData = localStorage.getItem('token');

  let token = '';

  if (tokenData) {
    const parsed = JSON.parse(tokenData);
    token = parsed.token; // 👈 AQUÍ está el JWT real
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  console.log('🔥 TOKEN REAL EN HEADER:', token);

  return this.http.get<Capacitacion[]>(this.apiUrl, { headers });
}
}