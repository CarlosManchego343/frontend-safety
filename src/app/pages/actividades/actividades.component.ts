import { Component } from '@angular/core';
import { ActividadService } from '../../core/services/actividad.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividades',
  imports: [FormsModule, CommonModule],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {

  actividad = {
    nombre: '',
    descripcion: '',
    estado: 'PENDIENTE',
    fecha: new Date()
  };

  probabilidad = 1;
  impacto = 1;

  resultado: any = null;
  loading = false;

  constructor(private actividadService: ActividadService, private router: Router) {}

  enviar() {
    this.loading = true;

    this.actividadService
      .crearYEvaluar(this.actividad, this.probabilidad, this.impacto)
      .subscribe({
        next: (res) => {
          this.resultado = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }

}
