import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.authUrl}/login`;

  constructor(private http: HttpClient) {}

  // 🔐 Login usando RequestParam (como espera tu backend)
  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(this.authUrl, null, {
    params,
    responseType: 'text'
  });
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}