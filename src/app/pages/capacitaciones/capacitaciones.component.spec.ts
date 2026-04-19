import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CapacitacionesComponent } from './capacitaciones.component';

describe('CapacitacionesComponent', () => {
  let component: CapacitacionesComponent;
  let fixture: ComponentFixture<CapacitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CapacitacionesComponent,
        HttpClientTestingModule // 👈 FIX
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CapacitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});