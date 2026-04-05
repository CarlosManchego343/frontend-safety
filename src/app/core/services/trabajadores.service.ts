import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador';

@Injectable({ providedIn: 'root' })
export class TrabajadoresService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getTrabajadores(): Observable<Trabajador[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log('🔥 TOKEN EN SERVICE:', token); // debug

    return this.http.get<Trabajador[]>(this.apiUrl, { headers });
  }
}