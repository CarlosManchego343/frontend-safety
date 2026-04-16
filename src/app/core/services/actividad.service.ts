import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActividadService {

  private apiUrl = `${environment.apiUrl}/actividades`;
  private evalUrl = `${environment.apiUrl}/evaluaciones`;

  constructor(private http: HttpClient) { }

  // 🔐 Obtener token de forma segura
  private getToken(): string {
    const data = localStorage.getItem('token');

    if (!data) return '';

    try {
      const parsed = JSON.parse(data);

      // fallback por si estructura viene rara
      return parsed?.token || parsed?.value?.token || '';

    } catch (e) {
      console.error('Error parsing token:', e);
      return '';
    }
  }

  // 📦 Construcción segura de headers
  private getHeaders(): HttpHeaders {
    const token = this.getToken();

    console.log('🔥 TOKEN FINAL ANTES DE ENVIAR:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('📡 HEADERS OBJECT:', headers);

    return headers;
  }

  // 1️⃣ Crear actividad
  crearActividad(data: any): Observable<any> {

    console.log("Token de la solicitud:", this.getHeaders().get('Authorization'));
    return this.http.post(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  // 2️⃣ Evaluar riesgo
  evaluarRiesgo(idActividad: number, probabilidad: number, impacto: number): Observable<any> {

    const url = `${this.evalUrl}/${idActividad}?probabilidad=${probabilidad}&impacto=${impacto}`;

    return this.http.post(url, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  // 3️⃣ Flujo completo: crear → evaluar
  crearYEvaluar(data: any, probabilidad: number, impacto: number): Observable<any> {
    return this.crearActividad(data).pipe(
      switchMap((actividadCreada: any) => {

        return this.evaluarRiesgo(
          1,
          probabilidad,
          impacto
        );
      })
    );
  }
}