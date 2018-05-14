import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { CuentasSinClasificarComponent } from './cuentas-sin-clasificar.component';
import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasSinClasificarEditComponent } from './cuentas-sin-clasificar-edit.component';
import { CuentasSinClasificarSelectComponent } from './cuentas-sin-clasificar-select.component';
import { TreeviewModule } from 'ngx-treeview';
import { InternosService } from '../../internos/internos.service';
import { CuentaContableService } from '../servicios/cuentaContable.service';
import { CargaMasivaCuentasComponent } from './carga-masiva-cuentas/carga-masiva-cuentas.component';
import { EditarCuentaBproComponent } from './editar-cuenta-bpro/editar-cuenta-bpro.component';

@NgModule({
  imports: [
    CommonModule,
    TreeviewModule.forRoot(),
    CuentasRoutingModule,
    FormsModule,
    TextMaskModule
  ],
  declarations: [CuentasSinClasificarComponent, CuentasSinClasificarEditComponent, CuentasSinClasificarSelectComponent, CargaMasivaCuentasComponent, EditarCuentaBproComponent],
  providers: [
      CuentaContableService, InternosService
  ]
})
export class CuentasModule { }
