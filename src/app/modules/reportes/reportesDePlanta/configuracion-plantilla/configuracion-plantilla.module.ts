
// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ReportesDePlantaRoutingModule } from '../reportes-de-planta/reportes-de-planta-routing.module';
//import { ReportesDePlantaComponent } from '../reportes-de-planta/reportes-de-planta.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ReportesService } from '../../../../services/Reportes.service'
import { CatalogoService } from '../../../../services/catalogo.service'
import { ConfiguracionPlantillaComponent } from './configuracion-plantilla.component';
import { ConfiguracionPlantillaRoutingModule } from './configuracion-plantilla-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    ConfiguracionPlantillaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DataTablesModule//.forRoot(),
  ],
  declarations: [
                  ConfiguracionPlantillaComponent
                ],
  providers:    [
                  ReportesService,
                  CatalogoService
                ]
})
export class ConfiguracionDePlantillaModule { 


  
}
