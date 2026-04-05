import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CapacitacionesComponent } from './pages/capacitaciones/capacitaciones.component';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'capacitaciones', component: CapacitacionesComponent },
  { path: 'trabajadores', component: TrabajadoresComponent },
  { path: 'reportes', component: ReportesComponent }
];