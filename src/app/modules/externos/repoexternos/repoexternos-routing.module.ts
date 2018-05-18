import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepoexternosComponent } from "./repoexternos.component";

const routes: Routes = [
  {
      path: '',
      component: RepoexternosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepoexternosRoutingModule { }
