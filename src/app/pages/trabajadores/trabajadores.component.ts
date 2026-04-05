import { Component } from '@angular/core';
import { TrabajadoresService } from '../../core/services/trabajadores.service';
import { Trabajador } from '../../core/models/trabajador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css'
})
export class TrabajadoresComponent {
  trabajadores: Trabajador[] = [];
  constructor(private service: TrabajadoresService) { }

  ngOnInit() { this.service.getTrabajadores().subscribe(data => this.trabajadores = data); }
}
