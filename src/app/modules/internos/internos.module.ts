import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternosRoutingModule } from './internos-routing.module';
import { InternosComponent } from './internos.component';
import { InternosService } from './internos.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InternosRoutingModule,
    FormsModule
  ],
  declarations: [InternosComponent],
  providers: [
    InternosService
  ]
})
export class InternosModule { }
