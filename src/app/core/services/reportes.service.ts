import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private apiUrl = `${environment.apiUrl}/reportes/pdf`;

  constructor(private http: HttpClient) {}

  descargarPdf(): Observable<Blob> {
    return this.http.get(this.apiUrl, { responseType: 'blob' });
  }
}