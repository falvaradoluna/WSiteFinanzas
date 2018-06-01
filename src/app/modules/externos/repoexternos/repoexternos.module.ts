import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoexternosRoutingModule } from './repoexternos-routing.module';
import { RepoexternosComponent } from './repoexternos.component';
import { RepoexternosService } from './repoexternos.service';
import { FormsModule }              from '@angular/forms';
import { NgbModule }                from '@ng-bootstrap/ng-bootstrap';
import { SharedPipesModule, 
         SortableTableModule }      from '../../../shared';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RepoexternosRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedPipesModule,
    SortableTableModule,
    ReactiveFormsModule
  ],
  declarations: [
    RepoexternosComponent
  ],
  providers:[
    RepoexternosService
  ]
})
export class RepoexternosModule { }
