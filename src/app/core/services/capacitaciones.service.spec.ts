import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CapacitacionesService } from './capacitaciones.service';
import { environment } from '../../enviroments/enviroment';

describe('CapacitacionesService', () => {
  let service: CapacitacionesService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/capacitaciones`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapacitacionesService]
    });

    service = TestBed.inject(CapacitacionesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // -------------------------
  // 🔐 CON TOKEN EN LOCALSTORAGE
  // -------------------------
  it('should send request with Authorization header when token exists', () => {
    const fakeToken = { token: 'jwt-123' };
    localStorage.setItem('token', JSON.stringify(fakeToken));

    service.getCapacitaciones().subscribe();

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('GET');

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer jwt-123');

    req.flush([]);
  });

  // -------------------------
  // ❌ SIN TOKEN
  // -------------------------
  it('should send request without token when localStorage is empty', () => {
    service.getCapacitaciones().subscribe();

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('GET');

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer '); // vacío

    req.flush([]);
  });

  // -------------------------
  // 📦 RESPONSE TYPE CHECK
  // -------------------------
  it('should return list of capacitaciones', () => {
    const fakeToken = { token: 'jwt-123' };
    localStorage.setItem('token', JSON.stringify(fakeToken));

    const mockResponse = [
      { id: 1, nombre: 'Angular' },
      { id: 2, nombre: 'Spring Boot' }
    ] as any;

    service.getCapacitaciones().subscribe(res => {
      expect(res.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);

    req.flush(mockResponse);
  });
});