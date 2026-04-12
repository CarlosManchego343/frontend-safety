import { Component, OnInit } from '@angular/core';
import { CapacitacionesService } from '../../core/services/capacitaciones.service';
import { Capacitacion } from '../../core/models/capacitacion';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capacitaciones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './capacitaciones.component.html',
  styleUrl: './capacitaciones.component.css'
})
export class CapacitacionesComponent implements OnInit {

  capacitaciones: Capacitacion[] = [];

  constructor(private capacitacionesService: CapacitacionesService, private router: Router) { }

  ngOnInit(): void {
    this.capacitacionesService.getCapacitaciones().subscribe({
      next: (data) => {
        this.capacitaciones = data;
      },
      error: (err) => {
        console.error('Error al cargar capacitaciones', err);
      }
    });
  }

   volver() {
    this.router.navigate(['/dashboard']);
  }

}
