import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternoComponent } from './externo.component';

const routes: Routes = [
  {
    path: '',
   component: ExternoComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternoRoutingModule { }
