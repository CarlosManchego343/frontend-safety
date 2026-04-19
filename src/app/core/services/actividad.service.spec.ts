import { TestBed } from '@angular/core/testing';
import { ActividadService } from './actividad.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('ActividadService', () => {
  let service: ActividadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActividadService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ActividadService);
    httpMock = TestBed.inject(HttpTestingController);

    // Simular token
    localStorage.setItem('token', JSON.stringify({ token: 'fake-token' }));
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // ===============================
  // 1️⃣ crearActividad
  // ===============================
  it('debería hacer POST a /actividades con Authorization header', () => {
    const payload = { nombre: 'Actividad Test' };

    service.crearActividad(payload).subscribe(res => {
      expect(res).toEqual({ ok: true });
    });

    const req = httpMock.expectOne(service['apiUrl']);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    // 🔥 Validación clave
    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer fake-token');

    expect(req.request.headers.get('Content-Type'))
      .toBe('application/json');

    req.flush({ ok: true });
  });

  // ===============================
  // 2️⃣ evaluarRiesgo
  // ===============================
  it('debería construir URL correctamente y NO enviar Authorization', () => {
    const id = 5;
    const prob = 2;
    const impacto = 3;

    service.evaluarRiesgo(id, prob, impacto).subscribe(res => {
      expect(res).toEqual({ nivel: 'MEDIO' });
    });

    const req = httpMock.expectOne(
      `${service['evalUrl']}/${id}?probabilidad=${prob}&impacto=${impacto}`
    );

    expect(req.request.method).toBe('POST');

    // 👇 importante: no hay token aquí
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({ nivel: 'MEDIO' });
  });

  // ===============================
  // 3️⃣ token inválido / inexistente
  // ===============================
  it('debería enviar Bearer vacío si no hay token', () => {
    localStorage.removeItem('token');

    service.crearActividad({}).subscribe();

    const req = httpMock.expectOne(service['apiUrl']);

    expect(req.request.headers.get('Authorization'))
      .toBe('Bearer ');

    req.flush({});
  });

  // ===============================
  // 4️⃣ flujo crearYEvaluar (switchMap)
  // ===============================
  it('debería ejecutar crearActividad → evaluarRiesgo', () => {
    const data = { nombre: 'Actividad' };
    const prob = 1;
    const impacto = 2;

    service.crearYEvaluar(data, prob, impacto).subscribe(res => {
      expect(res).toEqual({ evaluado: true });
    });

    // 1️⃣ crear
    const req1 = httpMock.expectOne(service['apiUrl']);
    expect(req1.request.method).toBe('POST');
    req1.flush({ id: 10 });

    // 2️⃣ evaluar (⚠️ usa 1 en tu código actual)
    const req2 = httpMock.expectOne(
      `${service['evalUrl']}/1?probabilidad=${prob}&impacto=${impacto}`
    );

    expect(req2.request.method).toBe('POST');

    req2.flush({ evaluado: true });
  });

});