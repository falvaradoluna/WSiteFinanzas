
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from "@angular/forms";
import { ReportesService } from '../../../../services/Reportes.service'
import { CatalogoService } from '../../../../services/catalogo.service'
import { ConfiguracionPlantillaComponent } from './configuracion-plantilla.component';
import { ConfiguracionPlantillaRoutingModule } from './configuracion-plantilla-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NissanComponent } from '../shared/nissan/nissan.component';
import { HondaComponent } from '../shared/honda/component/honda.component';

@NgModule({
  imports: [
    CommonModule,
    ConfiguracionPlantillaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
                  ConfiguracionPlantillaComponent,
                  NissanComponent
                  ,HondaComponent
                ],
  providers:    [
                  ReportesService,
                  CatalogoService
                ]
})
export class ConfiguracionDePlantillaModule { 


  
}
