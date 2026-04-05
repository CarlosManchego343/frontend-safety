import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Capacitacion } from '../models/capacitacion';

@Injectable({ providedIn: 'root' })
export class CapacitacionesService {
  private apiUrl = `${environment.apiUrl}/actividades`;

  constructor(private http: HttpClient) {}

  getCapacitaciones(): Observable<Capacitacion[]> {
    return this.http.get<Capacitacion[]>(this.apiUrl);
  }
}