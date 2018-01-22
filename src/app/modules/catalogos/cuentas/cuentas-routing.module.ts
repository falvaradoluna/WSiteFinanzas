import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CuentasSinClasificarComponent } from './cuentas-sin-clasificar.component';
import { CuentasSinClasificarEditComponent } from './cuentas-sin-clasificar-edit.component';
import { CuentasSinClasificarSelectComponent } from './cuentas-sin-clasificar-select.component';

const routes: Routes = [
  {
    path: '',
    component: CuentasSinClasificarComponent,
    children: [
      { path: '', redirectTo: 'select' },
      { path: 'edit', component: CuentasSinClasificarEditComponent },
      { path: 'select', component: CuentasSinClasificarSelectComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasRoutingModule { }
