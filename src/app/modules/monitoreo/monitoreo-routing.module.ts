import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MonitoreoMontoBalanzaComponent } from './monitoreo-monto-balanza/monitoreo-monto-balanza.component';

//import { CuentasSinClasificarComponent } from './cuentas-sin-clasificar.component';
//import { CuentasSinClasificarEditComponent } from './cuentas-sin-clasificar-edit.component';
//import { CuentasSinClasificarSelectComponent } from './cuentas-sin-clasificar-select.component';
//import { CargaMasivaCuentasComponent } from './carga-masiva-cuentas/carga-masiva-cuentas.component';
//import { EditarCuentaBproComponent } from './editar-cuenta-bpro/editar-cuenta-bpro.component';

const routes: Routes = [
  {
    path: '',
    component: MonitoreoMontoBalanzaComponent,
    children: [
      { path: '', redirectTo: 'select' },
      //{ path: 'select', component: CuentasSinClasificarSelectComponent },
      //{ path: 'load-account', component: CargaMasivaCuentasComponent },
      //{ path: 'edit-account', component: EditarCuentaBproComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoreoRoutingModule { }
