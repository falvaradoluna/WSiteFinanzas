import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasSinClasificarComponent } from './cuentas-sin-clasificar.component';
import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasSinClasificarEditComponent } from './cuentas-sin-clasificar-edit.component';
import { CuentasSinClasificarSelectComponent } from './cuentas-sin-clasificar-select.component';

@NgModule({
  imports: [
    CommonModule,
    CuentasRoutingModule
  ],
  declarations: [CuentasSinClasificarComponent, CuentasSinClasificarEditComponent, CuentasSinClasificarSelectComponent]
})
export class CuentasModule { }
