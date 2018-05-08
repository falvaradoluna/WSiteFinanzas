import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasSinClasificarComponent } from './cuentas-sin-clasificar.component';
import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasSinClasificarEditComponent } from './cuentas-sin-clasificar-edit.component';
import { CuentasSinClasificarSelectComponent } from './cuentas-sin-clasificar-select.component';
import { TreeviewModule } from 'ngx-treeview';
import { InternosService } from '../../internos/internos.service';
import { CuentaContableService } from '../servicios/cuentaContable.service';
import { FormsModule } from '@angular/forms';
import { CargaMasivaCuentasComponent } from './carga-masiva-cuentas/carga-masiva-cuentas.component';

@NgModule({
  imports: [
    CommonModule,
    TreeviewModule.forRoot(),
    CuentasRoutingModule,
    FormsModule
  ],
  declarations: [CuentasSinClasificarComponent, CuentasSinClasificarEditComponent, CuentasSinClasificarSelectComponent, CargaMasivaCuentasComponent],
  providers: [
      CuentaContableService, InternosService
  ]
})
export class CuentasModule { }
