import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '../../enviroments/enviroment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const authUrl = `${environment.authUrl}/login`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // -------------------------
  // 🔐 LOGIN TEST
  // -------------------------
  it('should call login with correct params', () => {
    service.login('test@mail.com', '123456').subscribe();

    const req = httpMock.expectOne(request =>
      request.method === 'POST' &&
      request.url === authUrl
    );

    expect(req.request.params.get('email')).toBe('test@mail.com');
    expect(req.request.params.get('password')).toBe('123456');
    expect(req.request.responseType).toBe('text');

    req.flush('fake-token');
  });

  // -------------------------
  // 💾 TOKEN TESTS
  // -------------------------
  it('should store token in localStorage', () => {
    service.guardarToken('abc123');
    expect(localStorage.getItem('token')).toBe('abc123');
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('token', 'abc123');

    expect(service.getToken()).toBe('abc123');
  });

  it('should return true if authenticated', () => {
    localStorage.setItem('token', 'abc123');

    expect(service.estaAutenticado()).toBeTrue();
  });

  it('should return false if not authenticated', () => {
    expect(service.estaAutenticado()).toBeFalse();
  });

  it('should remove token on logout', () => {
    localStorage.setItem('token', 'abc123');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
  });
});