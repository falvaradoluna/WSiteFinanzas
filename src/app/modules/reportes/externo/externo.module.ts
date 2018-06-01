// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { TextMaskModule } from 'angular2-text-mask';

// import { TreeviewModule } from 'ngx-treeview';
// import { InternosService } from '../../internos/internos.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { InternosRoutingModule } from './internos-routing.module';
// import { InternosComponent } from './internos.component';
// import { InternosService } from './internos.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SharedPipesModule, SortableTableModule, SumaColumnasModule, CloseButtonModule } from '../../shared';
// import { UnidadesNv2Component } from './unidades-nv2.component';
// import { UnidadesNv3Component } from './unidades-nv3.component';
// import { UnidadesNv4Component } from './unidades-nv4.component';
// import { FlujoeSituacionfComponent } from './flujoe-situacionf/flujoe-situacionf.component';
import { ExternoRoutingModule } from './externo-routing.module';
import { ExternoComponent } from './externo.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ReportesService } from '../../../services/Reportes.service'

@NgModule({
  imports: [
    CommonModule,
    ExternoRoutingModule,
    FormsModule,
    // SharedPipesModule,
    // SortableTableModule,
    // SumaColumnasModule,
    // CloseButtonModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [ExternoComponent],
  providers: [
    ReportesService
  ]
})
export class ExternoModule { }
