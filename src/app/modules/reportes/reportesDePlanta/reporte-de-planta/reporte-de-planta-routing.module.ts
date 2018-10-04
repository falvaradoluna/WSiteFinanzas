import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteDePlantaComponent } from './reporte-de-planta.component'
const routes: Routes = [
  {
    path: '',
   component: ReporteDePlantaComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteDePlantaRoutingModule { }
