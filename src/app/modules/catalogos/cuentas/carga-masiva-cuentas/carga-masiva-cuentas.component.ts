import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import swal from 'sweetalert2';
import { CuentaContableService } from '../../servicios/cuentaContable.service';
import { CargarCuenta } from '../../../../models/administracion/cargarCuenta';
import { ICompania } from '../../../../models/catalog/compania';
import { NgxSpinnerService } from 'ngx-spinner';
//import {read, IWorkBook} from "ts-xlsx";
//import { CargarCuentaCompania, ICargarCuentaCompania } from '../../../../models/administracion/cargarCuentaCompania';
// import {List, Enumerable} from 'linqts';
//import { CargarCuenta } from '../../../../models/administracion/cargarCuenta';

@Component({
  selector: 'wsf-carga-masiva-cuentas',
  templateUrl: './carga-masiva-cuentas.component.html',
  styleUrls: ['./carga-masiva-cuentas.component.scss']
})
export class CargaMasivaCuentasComponent implements OnInit {

  archivoSubir: File;
  archivoTemp: string;
  errorMessage: any;
  cuentas: CargarCuenta[] = [];
  public heightTable: number = 0;
  public selectedCompania: number = 0;
  companias: ICompania[];

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private _cuentaContableService: CuentaContableService, private _spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getCompanias();
  }

  
// ==========================================
//  Valida el archivo
// ==========================================
seleccionArchivo(archivo: File) {
  this.cuentas = [];
    if (!archivo || this.selectedCompania === 0) {
      this.archivoSubir = null;
      return;
    }
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];
    if (extensionArchivo !== "xlsx" && extensionArchivo !== "xls") {
      swal('Sólo archivos excel', 'El archivo seleccionado no es valido', 'error');
      this.archivoSubir = null;
      this.fileInput.nativeElement.value = '';
      return;
    }
    this.archivoSubir = archivo;
    
    let reader = new FileReader();
    reader.onloadend = () => this.archivoTemp = reader.result;
  }

   // Recupera las companias por usuario
   getCompanias() {
    this.controlaSpinner(true, 3000);
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._cuentaContableService.getCompanias({ idUsuario: usuario.id })
      .subscribe(
        companias => {
          this.companias = companias;
          this.controlaSpinner(false);
        },
        error => this.errorMessage = <any>error);
  }

  subirArchivo() {
    this.cuentas = [];
    this._cuentaContableService.subirArchivo(this.archivoSubir)
      .then(resp => {
        if (resp['ok']) {
          const usuario = JSON.parse(localStorage.getItem('userLogged'));
          var nombreArchivo = resp['nombreArchivo'];
          this._cuentaContableService.procesaArchivoExcel({
            nombreArchivo: nombreArchivo,
            idUsuario: usuario.id
          }).subscribe(
            resultado => {
              if (resultado['ok']) {
                swal('Procesar archivo excel', 'Se procesaron: ' + resultado['cuentasValidas'] + ' cuentas correctamente', 'success');
                this.fileInput.nativeElement.value = '';
              } else {
                swal('Procesar archivo excel', resultado['mensaje'], 'error');
              }
              if (resultado.errores.length > 0) {
                this.procesarErroresArchivo(resultado.errores);
              }
            },
            error => {
              this.errorMessage = <any>error;
              swal('Procesar archivo excel', 'El archivo no se proceso correctamente', 'error');
            }
          );

        } else {
          swal('Procesar archivo excel', 'El archivo no se proceso correctamente', 'error');
        }
      })
      .catch(err => {
        swal('Procesar archivo excel', 'El archivo no se proceso correctamente', 'error');
      });
  }ss

  onChangeCompania(newValue: number): void {
    this.selectedCompania = newValue;
  }

  procesarErroresArchivo(erroresArchivo) {
    var cuenta: any;
    for (var i = 0; i < erroresArchivo.length; i++) {
      cuenta = erroresArchivo[i]['cuenta'];
      this.cuentas.push({
        NUMCTA: this.validarValorEncabezado(cuenta['NUMCTA']),
        DESCRIPCION: this.validarValorEncabezado(cuenta['DESCRIPCION']),
        /*NATURALEZA: this.validarValorEncabezado(cuenta['NATURALEZA']),
        ACUMDET: this.validarValorEncabezado(cuenta['ACUMDET']),
        GPO1: this.validarValorEncabezado(cuenta['GPO1']),
        GPO2: this.validarValorEncabezado(cuenta['GPO2']),
        GPO3: this.validarValorEncabezado(cuenta['GPO3']),
        DEPTO: this.validarValorEncabezado(cuenta['DEPTO']),
        DICTAMEN: this.validarValorEncabezado(cuenta['DICTAMEN']),
        EFINTERNO: this.validarValorEncabezado(cuenta['EFINTERNO']),
        NOTASDIC: this.validarValorEncabezado(cuenta['NOTASDIC']),
        NOTASFIN: this.validarValorEncabezado(cuenta['NOTASFIN']),
        TipoBI: this.validarValorEncabezado(cuenta['TipoBI']),
        AFECTACC: this.validarValorEncabezado(cuenta['AFECTACC']),
        GRUPOSAT: this.validarValorEncabezado(cuenta['GRUPOSAT']),
        SITUACION: this.validarValorEncabezado(cuenta['SITUACION']),*/
        ERROR: this.validarValorEncabezado(erroresArchivo[i].mensaje)
      });
    }

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
  }

  private validarValorEncabezado(valor) {
    return valor !== undefined ? valor : '';
  }

  private controlaSpinner(estado: boolean, tiempo: number = 0) {
    if (estado) {
      this._spinnerService.show();
      setTimeout(() => { this._spinnerService.hide(); }, tiempo);
    } else { this._spinnerService.hide(); }
  }

}
