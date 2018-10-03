import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionPlantillaComponent } from './configuracion-plantilla.component';

const routes: Routes = [
  {
    path: '',
   component: ConfiguracionPlantillaComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionPlantillaRoutingModule { }
