import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'wsf-cuentas-sin-clasificar',
  templateUrl: './cuentas-sin-clasificar.component.html',
  styleUrls: ['./cuentas-sin-clasificar.component.scss'],
  animations: [routerTransition()]
})
export class CuentasSinClasificarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
