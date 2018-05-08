import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CuentasSinClasificarComponent } from './cuentas-sin-clasificar.component';
import { CuentasSinClasificarEditComponent } from './cuentas-sin-clasificar-edit.component';
import { CuentasSinClasificarSelectComponent } from './cuentas-sin-clasificar-select.component';
import { CargaMasivaCuentasComponent } from './carga-masiva-cuentas/carga-masiva-cuentas.component';

const routes: Routes = [
  {
    path: '',
    component: CuentasSinClasificarComponent,
    children: [
      { path: '', redirectTo: 'select' },
      { path: 'edit/:id', component: CuentasSinClasificarEditComponent },
      { path: 'select', component: CuentasSinClasificarSelectComponent },
      { path: 'load-account', component: CargaMasivaCuentasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasRoutingModule { }
