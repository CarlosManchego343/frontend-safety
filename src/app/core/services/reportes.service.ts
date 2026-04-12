import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportesService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // 🔹 Reutilizamos headers
  private getHeaders(): HttpHeaders {
    const data = localStorage.getItem('token');
    const parsed = data ? JSON.parse(data) : null;

    return new HttpHeaders({
      Authorization: `Bearer ${parsed?.token}`
    });
  }

  // 📊 Actividades
  getActividades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actividades`, {
      headers: this.getHeaders()
    });
  }

  // 📄 PDF
  getReportePdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reportes/pdf`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }
}