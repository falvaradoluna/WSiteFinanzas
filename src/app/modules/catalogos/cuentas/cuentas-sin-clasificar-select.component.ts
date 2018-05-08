// Generales
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import xml2js from 'xml2js';


// Interfaces
import { CuentaContable } from '../../../models/administracion/cuentaContable';

// Servicios
import { CuentaContableService } from '../servicios/cuentaContable.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'wsf-cuentas-sin-clasificar-select',
  templateUrl: './cuentas-sin-clasificar-select.component.html',
  styleUrls: ['./cuentas-sin-clasificar-select.component.scss']
})

export class CuentasSinClasificarSelectComponent implements OnInit {
  errorMessage: any;
  public cuentas: CuentaContable[] = [];
  public mostrarCuentas: boolean = true;
  public mostrarFormCuenta: boolean = false;
  public idCuenta: number = 0;
  public operacionCuenta: number;
  public cuentaContable = new CuentaContable();
  public selectAllCuentas: boolean = false;
  public heightTable: number = 75;

  constructor(private _cuentaContableService: CuentaContableService, private _spinnerService: NgxSpinnerService) {
    this.mostrarCuentas = true;
    this.mostrarFormCuenta = false;
  }

  ngOnInit() {
    this.getCuentasContables();
  }

  // Obtiene las cuentas
  public getCuentasContables(): void {
    this._cuentaContableService.getCuentasContables()
      .subscribe(
        cuentasContables => {
          if (cuentasContables !== null && cuentasContables[0]['XML_F52E2B61-18A1-11d1-B105-00805F49916B'] !== "") {
            let parseString = xml2js.parseString;
            let resultado: any;
            parseString(cuentasContables[0]['XML_F52E2B61-18A1-11d1-B105-00805F49916B'], function (err, result) {
              resultado = result.CuentasContables.CuentaContable;
            });
            this.cuentas = resultado;
            if(this.cuentas.length === 1) {
              this.heightTable = 130;
            } else if(this.cuentas.length === 2) {
              this.heightTable = 185;
            } else if(this.cuentas.length === 3) {
              this.heightTable = 240;
            } else if(this.cuentas.length === 4) {
              this.heightTable = 295;
            } else if(this.cuentas.length === 5) {
              this.heightTable = 350;
            } else if(this.cuentas.length === 6) {
              this.heightTable = 405;
            } else if(this.cuentas.length > 6) {
              this.heightTable = 460;
            }
          } else {
            this.cuentas = [];
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  // Se encarga de mostrar formulario para crear, detalle, editar cuenta contable
  mostrarFormulario(idCuenta: number, operacion: number, cuenta: CuentaContable = null): void {
    this.mostrarCuentas = false;
    this.mostrarFormCuenta = true;
    this.operacionCuenta = operacion
    this.idCuenta = 0;
    if (operacion !== 1) {
      this.cuentaContable = cuenta;
    }
  }

  // Elimina una cuenta contable
  eliminarCuenta(idCuenta: number): void {
    swal(this.obtenerSweetAlertContent('¿Esta seguro de eliminar la cuenta?', 'Se eleiminara 1 cuenta.', 'warning')).then((result) => {
      if (result.value) {
        this.controlaSpinner(true, 3000);
        this._cuentaContableService.CuentaContableExecute({
          idMovimiento: 3,
          idUsuario: JSON.parse(localStorage.getItem('userLogged')).id,
          xmlCuenta: this.getXmlCuenta(idCuenta)
        })
          .subscribe(
            resultadoInsert => {
              this.controlaSpinner(false);
              if (resultadoInsert.respuesta === 0) {
                this.getCuentasContables();
                swal('Eliminar cuenta contable', 'Cuenta eliminada correctamente', 'success');
              } else {
                swal('Eliminar cuenta contable', 'Cuenta no eliminada', 'error');
              }
            },
            error => this.errorMessage = <any>error
          );
      }
    });
  }

  // Controla los checkbox para marcar o desmarcar todos
  controlaAllCheck(idCuenta: number, estado: boolean): void {
    if (idCuenta == 0) {
      for (var i = 0; i < this.cuentas.length; i++) {
        this.cuentas[i].enviarcuenta = estado;
      }
    } else {
      if (this.cuentas.filter(function (x) { return x.enviarcuenta == estado }).length == this.cuentas.length) {
        this.selectAllCuentas = estado;
      }
    }
  }

  // Envia las cuentas a BPRO
  enviarCuentas(): void {
    var totalCuentas = this.cuentas.filter(function (x) { return x.enviarcuenta == true }).length;
    if (totalCuentas > 0) {
      swal(this.obtenerSweetAlertContent('¿Esta seguro de enviar las cuentas?', 'Se enviaran ' + totalCuentas + ' cuentas!', 'warning'))
        .then((result) => {
          if (result.value) {
            this.controlaSpinner(true, 3000);
            this._cuentaContableService.CuentaContableExecute({
              idMovimiento: 4,
              idUsuario: JSON.parse(localStorage.getItem('userLogged')).id,
              xmlCuenta: this.getXmlCuenta(0)
            })
              .subscribe(
                resultadoEnvio => {
                  this.controlaSpinner(false);
                  if (resultadoEnvio.respuesta === 0) {
                    this.getCuentasContables();
                    swal('Envió de cuentas!', 'Las cuentas se han enviado correctamente', 'success');
                    this.selectAllCuentas = false;
                  } else {
                    swal('Envió de cuentas!', 'Las cuentas no se han enviado correctamente', 'error');
                  }
                },
                error => this.errorMessage = <any>error
              );
          }
        })
    }

  }

  // retorna un json con la estructura para la alerta
  private obtenerSweetAlertContent(title, text, type) {
    return {
      title: title,
      text: text,
      type: type,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    };
  }

  // Se encarga de generar el xml para eliminar la cuenta
  private getXmlCuenta(idCuenta: number) {
    if (idCuenta > 0) {
      return '<CuentaContables>' + '<CuentaContable>' + '<id>' + idCuenta + '</id>' + '</CuentaContable>' + '</CuentaContables>';
    } else {
      var xmlCuenta = [];
      for (var i = 0; i < this.cuentas.length; i++) {
        if (this.cuentas[i].enviarcuenta) {
          xmlCuenta.push('<CuentaContable>' + '<id>' + this.cuentas[i].id + '</id>' + '</CuentaContable>');
        }
      }
      var xmlCuentas = '<CuentaContables>' + xmlCuenta.join('') + '</CuentaContables>';
      return xmlCuentas;
    }
  }

  // Se encarga de controlar el spinner
  private controlaSpinner(estado: boolean, tiempo: number = 0) {
    if (estado) {
      this._spinnerService.show();
      setTimeout(() => { this._spinnerService.hide(); }, tiempo);
    } else { this._spinnerService.hide(); }
  }
}
