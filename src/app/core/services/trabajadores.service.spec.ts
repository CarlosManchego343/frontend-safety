import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TrabajadoresService } from './trabajadores.service';
import { environment } from '../../enviroments/enviroment';

describe('TrabajadoresService', () => {
  let service: TrabajadoresService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/usuarios`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrabajadoresService]
    });

    service = TestBed.inject(TrabajadoresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // -------------------------
  // 🔐 CON TOKEN
  // -------------------------
  it('should send request with Authorization header', () => {
    localStorage.setItem('token', 'jwt-123');

    service.getTrabajadores().subscribe();

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('GET');

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer jwt-123');

    req.flush([]);
  });

  // -------------------------
  // 📦 RESPONSE
  // -------------------------
  it('should return list of trabajadores', () => {
    localStorage.setItem('token', 'jwt-abc');

    const mockResponse = [
      { id: 1, nombre: 'Juan' },
      { id: 2, nombre: 'Ana' }
    ] as any;

    service.getTrabajadores().subscribe(res => {
      expect(res.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);

    req.flush(mockResponse);
  });

  // -------------------------
  // ❌ SIN TOKEN (caso borde)
  // -------------------------
  it('should send request even without token', () => {
    service.getTrabajadores().subscribe();

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer null');

    req.flush([]);
  });
});