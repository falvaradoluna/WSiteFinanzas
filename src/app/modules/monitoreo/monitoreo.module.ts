import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MonitoreoMontoBalanzaComponent } from './monitoreo-monto-balanza/monitoreo-monto-balanza.component';
import { MonitoreoService } from './servicios/monitoreo.service';


@NgModule({
  imports: [
    CommonModule,
    MonitoreoRoutingModule,
    FormsModule,
    TextMaskModule
  ],
  declarations: [MonitoreoMontoBalanzaComponent],
  providers: [
    MonitoreoService
  ]
})
export class MonitoreoModule { }
