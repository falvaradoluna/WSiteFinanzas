import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumaColumnasDirective } from './suma-columnas.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SumaColumnasDirective],
  exports: [SumaColumnasDirective]
})
export class SumaColumnasModule { }
