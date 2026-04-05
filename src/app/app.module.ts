import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CapacitacionesComponent } from './pages/capacitaciones/capacitaciones.component';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CapacitacionesComponent,
    TrabajadoresComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}