import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseButtonComponent } from './close-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CloseButtonComponent],
  exports: [CloseButtonComponent]
})
export class CloseButtonModule { }
