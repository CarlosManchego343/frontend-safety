import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReportesService } from './reportes.service';
import { environment } from '../../enviroments/enviroment';

describe('ReportesService', () => {
  let service: ReportesService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.apiUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportesService]
    });

    service = TestBed.inject(ReportesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // -------------------------
  // 🔐 HEADERS CON TOKEN
  // -------------------------
  it('should include Authorization header when token exists', () => {
    localStorage.setItem('token', JSON.stringify({ token: 'jwt-999' }));

    service.getActividades().subscribe();

    const req = httpMock.expectOne(`${baseUrl}/actividades`);

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer jwt-999');

    req.flush([]);
  });

  // -------------------------
  // ❌ HEADERS SIN TOKEN
  // -------------------------
  it('should send request with empty Authorization when no token', () => {
    service.getActividades().subscribe();

    const req = httpMock.expectOne(`${baseUrl}/actividades`);

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer undefined');

    req.flush([]);
  });

  // -------------------------
  // 📊 ACTIVIDADES
  // -------------------------
  it('should return activities list', () => {
    localStorage.setItem('token', JSON.stringify({ token: 'jwt-123' }));

    const mockData = [
      { id: 1, nombre: 'Actividad 1' },
      { id: 2, nombre: 'Actividad 2' }
    ];

    service.getActividades().subscribe(res => {
      expect(res.length).toBe(2);
    });

    const req = httpMock.expectOne(`${baseUrl}/actividades`);

    req.flush(mockData);
  });

  // -------------------------
  // 📄 PDF REPORT
  // -------------------------
  it('should request PDF report as blob', () => {
    localStorage.setItem('token', JSON.stringify({ token: 'jwt-abc' }));

    service.getReportePdf().subscribe();

    const req = httpMock.expectOne(`${baseUrl}/reportes/pdf`);

    expect(req.request.responseType).toBe('blob');

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer jwt-abc');

    req.flush(new Blob());
  });
});