import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CapacitacionesComponent } from './pages/capacitaciones/capacitaciones.component';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'capacitaciones', component: CapacitacionesComponent, canActivate: [AuthGuard] },
  { path: 'trabajadores', component: TrabajadoresComponent, canActivate: [AuthGuard] },
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}