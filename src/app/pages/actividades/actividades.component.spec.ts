import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActividadesComponent } from './actividades.component';

describe('ActividadesComponent', () => {
  let component: ActividadesComponent;
  let fixture: ComponentFixture<ActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActividadesComponent,
        HttpClientTestingModule // 👈 SOLUCIÓN
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});