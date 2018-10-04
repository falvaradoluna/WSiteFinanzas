
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from "@angular/forms";
import { ReportesService } from '../../../../services/Reportes.service'
import { CatalogoService } from '../../../../services/catalogo.service'
import { ReporteDePlantaComponent } from './reporte-de-planta.component';
import { ReporteDePlantaRoutingModule } from './reporte-de-planta-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    ReporteDePlantaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DataTablesModule
  ],
  declarations: [
                  ReporteDePlantaComponent
                ],
  providers:    [
                  ReportesService,
                  CatalogoService
                ]
})
export class ReporteDePlantaModule {   
}
