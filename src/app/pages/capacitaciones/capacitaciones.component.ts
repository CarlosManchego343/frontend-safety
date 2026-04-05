import { Component, OnInit } from '@angular/core';
import { CapacitacionesService } from '../../core/services/capacitaciones.service';
import { Capacitacion } from '../../core/models/capacitacion';
import { FormsModule } from '@angular/forms';
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
  constructor(private service: CapacitacionesService) { }

  ngOnInit() { this.service.getCapacitaciones().subscribe(data => this.capacitaciones = data); }
}
