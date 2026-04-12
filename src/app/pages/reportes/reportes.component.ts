import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../core/services/reportes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  actividades: any[] = [];

  constructor(
    private service: ReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getActividades().subscribe(data => {
      this.actividades = data;
    });
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
