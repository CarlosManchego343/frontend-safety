import { Component } from '@angular/core';
import { ReportesService } from '../../core/services/reportes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  constructor(private service: ReportesService) { }

  descargarPDF() {
    this.service.descargarPdf().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
