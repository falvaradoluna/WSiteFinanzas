import { Component, OnInit } from '@angular/core';
import { CuentaContable } from '../../../../models/administracion/cuentaContable';

@Component({
  selector: 'wsf-editar-cuenta-bpro',
  templateUrl: './editar-cuenta-bpro.component.html',
  styleUrls: ['./editar-cuenta-bpro.component.scss']
})
export class EditarCuentaBproComponent implements OnInit {
  public cuentaContable = new CuentaContable();
  public mask: Array<string | RegExp>;
  
  constructor() { 
    this.mask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  }

  ngOnInit() {
  }

}
