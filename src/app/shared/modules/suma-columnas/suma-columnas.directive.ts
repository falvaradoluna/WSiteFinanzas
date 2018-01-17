import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[suma-columnas]'
})
export class SumaColumnasDirective {

  constructor() { }

  @Input('suma-columnas') value;

  @HostListener('click')
  onClick() {
    console.log('suma-columnas works!: ' + this.value);
  }

}
