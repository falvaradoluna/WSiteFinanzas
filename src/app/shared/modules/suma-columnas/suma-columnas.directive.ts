import { Directive, HostListener, Input, EventEmitter, ElementRef, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { SumaColumnasService } from './suma-columnas.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[suma-columnas]'
})
export class SumaColumnasDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef, private renderer: Renderer2, private sumaColumnasService: SumaColumnasService) { }

  @Input('suma-columnas') valueSelected;

  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.sumaColumnasService.suma$.subscribe(suma => {
      // Cuando se oculta alguno de los elementos de la tabla, reiniciar todas las directivas
      if (suma === null) {
        this.renderer.removeClass(this.el.nativeElement, 'table-success');
      }
    });
  }

  ngOnDestroy() {
      // Cuando se destruye la directiva (se destruye la tabla que la contiene) mandar un null para indicarlo
    this.sumaColumnasService.add(null);
    this.subscription.unsubscribe();
  }

  @HostListener('click')
  onClick() {
    if (this.el.nativeElement.classList.contains('table-success')) {
      this.renderer.removeClass(this.el.nativeElement, 'table-success');
      this.sumaColumnasService.add(-this.valueSelected);
    } else {
      this.renderer.addClass(this.el.nativeElement, 'table-success');
      this.sumaColumnasService.add(this.valueSelected);
    }
  }

}
