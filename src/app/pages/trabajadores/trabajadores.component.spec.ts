import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabajadoresComponent } from './trabajadores.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TrabajadoresComponent', () => {
  let component: TrabajadoresComponent;
  let fixture: ComponentFixture<TrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajadoresComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});