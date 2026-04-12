import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportesService {

  private apiUrl = `${environment.apiUrl}/actividades`;

  constructor(private http: HttpClient) {}

  getActividades(): Observable<any[]> {

    const data = localStorage.getItem('token');
    const parsed = data ? JSON.parse(data) : null;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${parsed?.token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}