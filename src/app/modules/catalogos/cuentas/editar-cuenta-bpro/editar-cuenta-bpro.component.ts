import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { CuentaContable } from '../../../../models/administracion/cuentaContable';
import { CuentaContableService } from '../../servicios/cuentaContable.service';
import { ICuentaContableNaturaleza } from '../../../../models/administracion/cuentaContableNaturaleza';
import { ICuentaContableDetalle } from '../../../../models/administracion/cuentaContableDetalle';
import { INotasDictamen } from '../../../../models/administracion/notasDictamen';
import { IDictamen } from '../../../../models/administracion/dictamen';
import { IBalanceConceptoNivel01 } from '../../../../models/administracion/balanceConceptoNivel01';
import { IBalanceConceptoNivel02 } from '../../../../models/administracion/balanceConceptoNivel02';
import { IBalanceConceptoNivel03 } from '../../../../models/administracion/balanceConceptoNivel03';
import { IEstadoFinancieroInterno } from '../../../../models/administracion/estadoFinancieroInterno';
import { INotasFinancieras } from '../../../../models/administracion/notasFinancieras';
import { ICuentaContableSituacion } from '../../../../models/administracion/cuentaContableSituacion';
import { IDepartamento } from '../../../../models/catalog/departamento';
import { IAfectaCuentaContable } from '../../../../models/administracion/afectaCuentaContable';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'wsf-editar-cuenta-bpro',
  templateUrl: './editar-cuenta-bpro.component.html',
  styleUrls: ['./editar-cuenta-bpro.component.scss']
})
export class EditarCuentaBproComponent implements OnInit {
  public cuentaContable = new CuentaContable();
  public mask: Array<string | RegExp>;
  public errorMessage: any;

  cuentaContableNaturaleza: ICuentaContableNaturaleza[] = []
  cuentaContableDetalle: ICuentaContableDetalle[] = [];
  notasDictamen: INotasDictamen[] = [];
  dictamenCuenta: IDictamen[] = [];
  balanceConceptoNivel01: IBalanceConceptoNivel01[] = [];
  balanceConceptoNivel02: IBalanceConceptoNivel02[] = [];
  balanceConceptoNivel03: IBalanceConceptoNivel03[] = [];
  estadoFinancieroInterno: IEstadoFinancieroInterno[] = [];
  notasFinancieras: INotasFinancieras[] = [];
  cuentaContableSituacion: ICuentaContableSituacion[] = [];
  departamentos: IDepartamento[] = [];
  afectaCuentaContable: IAfectaCuentaContable[] = [];
  public validaNumeroCuenta: boolean = false;
  public validaConcepto: boolean = false;
  public validaGrupoSATCuentaContable: boolean = false;
  valorEFInterno: string = '';
  public validaNaturaleza: boolean = false;
  public validaCuentaDetalle: boolean = false;
  public validaNotaDictamen: boolean = false;
  public validaDictamen: boolean = false;
  public validaGrupo1: boolean = false;
  public validaGrupo2: boolean = false;
  public validaGrupo3: boolean = false;
  public validaEFInterno: boolean = false;
  public validaNotaFinanciera: boolean = false;
  public validaDepartamento: boolean = false;
  public validaCompaniaCuenta: boolean = false;
  public validaDescripcionCompania: boolean = false;
  public validaCompaniaCuentaEspecifico: boolean = false;
  public valorDescrCompania: string;
  public validaAfectaCuentaContable: boolean = false;
  public validaSituacionCuentaContable: boolean = false;
  public cuentaEncontrada: boolean = false;


  constructor(private _cuentaContableService: CuentaContableService, private _spinnerService: NgxSpinnerService) {
    this.mask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  }

  ngOnInit() {
    this.inicializaCuenta();
    this.getCuentaContableNaturaleza();
    this.getCuentaContableDetalle();
    this.getNotasDictamen();
    this.getDictamenCuenta();
    this.getBalanceConceptoNivel01();
    this.getEstadoFinancieroInterno();
    this.getNotasFinancieras();
    this.getSituacionCuentaContable();
    this.getDepartamentos();
    this.getAfectaCuentaContable();
  }

  private inicializaCuenta() {
    this.cuentaContable = {
      Concepto: '',
      idNaturaleza: 0,
      idCuentaDetalle: 0,
      idBalanceNivel01: 0,
      idBalanceNivel02: 0,
      idBalanceNivel03: 0,
      idEstadoResultadosI: 0,
      idDictamen: 0,
      idNotasDictamen: 0,
      idNotasFinanciero: 0,
      idSituacion: 0,
      idSucursal: 0,
      idDepartamento: 0,
      departamento: '',
      idSucursalSecuencia: 0,
      idFlujoEfectivo: 0,
      idNotasFinancieras: 0,
      idEstadoResultadosInternoConcepto: 0,
      eFInterno: '',
      idEFInterno: 0,
      descripcion: '',
      idAfectaCuentaContable: 0,
      grupoSATCuentaContable: '',
      numeroCuenta: '',
      companias: [],
      CreacionFecha: '',
      enviarcuenta: false,
      id: 0
    };
    /*this.cuentaContable.numeroCuenta = '';
    this.cuentaContable.Concepto = '';
    this.cuentaContable.idNaturaleza = 0;
    this.cuentaContable.idCuentaDetalle = 0;
    this.cuentaContable.idBalanceNivel01 = 0;
    this.cuentaContable.idBalanceNivel02 = 0;
    this.cuentaContable.idBalanceNivel03 = 0;
    this.cuentaContable.idEstadoResultadosI = 0;
    this.cuentaContable.idDictamen = 0;
    this.cuentaContable.idNotasDictamen = 0;
    this.cuentaContable.idNotasFinanciero = 0;
    this.cuentaContable.idSituacion = 0;
    this.cuentaContable.idSucursal = 0;
    this.cuentaContable.idDepartamento = 0;
    this.cuentaContable.departamento = '';
    this.cuentaContable.idSucursalSecuencia = 0;
    this.cuentaContable.idFlujoEfectivo = 0;
    this.cuentaContable.idNotasFinancieras = 0;
    this.cuentaContable.idEstadoResultadosInternoConcepto = 0;
    this.cuentaContable.eFInterno = '';
    this.cuentaContable.idEFInterno = 0;
    this.cuentaContable.descripcion = '';
    this.cuentaContable.idAfectaCuentaContable = 0;
    this.cuentaContable.grupoSATCuentaContable = '';*/
  }

  // ==========================================
  //  Evalua onblur de unputText
  // ==========================================
  buscarCuentaContable(): void {
    this.validaNumeroCuenta = (this.cuentaContable.numeroCuenta == undefined || this.cuentaContable.numeroCuenta == '');
    this.validaNumeroCuenta = !this.validaNumeroCuenta ? this.validaEstructuraCuenta(this.cuentaContable.numeroCuenta) : true;

    if (!this.validaNumeroCuenta) {
      this.getCuentaContableLocal(this.cuentaContable.numeroCuenta);
    }
  }


  // ==========================================
  //  Obtiene el concepto de balance nivel 02
  // ==========================================
  getCuentaContableLocal(valorCuenta): void {
    this.controlaSpinner(true, 3000);
    this._cuentaContableService.ObtieneCuentaContableLocal({ numCuenta: valorCuenta })
      .subscribe(
        cuenta => {
          if (typeof cuenta !== 'undefined' && typeof cuenta[0] !== 'undefined') {
            this.cuentaContable = cuenta[0];
            this.getBalanceConceptoNivel02();
            this.cuentaEncontrada = true;
            this.controlaSpinner(false);
          } else {
            this.cuentaEncontrada = false;
            this.controlaSpinner(false);
            swal('Cuenta contable no encontrada', 'No se encontro la cuenta', 'warning');
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Recupera la naturaleza de las cuentas
  // ==========================================
  getCuentaContableNaturaleza(): void {
    this._cuentaContableService.getCuentaContableNaturaleza()
      .subscribe(
        cuentaContableNaturaleza => { this.cuentaContableNaturaleza = cuentaContableNaturaleza; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Recupera el detalle de cuentas contables (Catalogo)
  // ==========================================
  getCuentaContableDetalle(): void {
    this._cuentaContableService.getCuentaContableDetalle()
      .subscribe(
        cuentaContableDetalle => { this.cuentaContableDetalle = cuentaContableDetalle; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Obtiene el catalogo de notasDictamen
  // ==========================================
  getNotasDictamen(): void {
    this._cuentaContableService.getNotasDictamen()
      .subscribe(
        notasDictamen => { this.notasDictamen = notasDictamen; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Recupera los dictamenes de las cuentas
  // ==========================================
  getDictamenCuenta(): void {
    this._cuentaContableService.getDictamenCuenta()
      .subscribe(
        dictamenCuenta => { this.dictamenCuenta = dictamenCuenta; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Obtiene el concepto de balance nivel 01
  // ==========================================
  getBalanceConceptoNivel01(): void {
    this._cuentaContableService.getBalanceConceptoNivel01()
      .subscribe(
        balanceConceptoNivel01 => {
          this.balanceConceptoNivel01 = balanceConceptoNivel01;
          this.getBalanceConceptoNivel02();
        },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Obtiene el concepto de balance nivel 02
  // ==========================================
  private getBalanceConceptoNivel02() {
    if (this.cuentaContable.idBalanceNivel01 > 0) {
      this._cuentaContableService.getBalanceConceptoNivel02({ idBalanceNivel01: this.cuentaContable.idBalanceNivel01 })
        .subscribe(
          balanceConceptoNivel02 => {
            this.balanceConceptoNivel02 = balanceConceptoNivel02;
            this.getBalanceConceptoNivel03();
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  // ==========================================
  //  Obtiene el concepto de balance nivel 02
  // ==========================================
  private getBalanceConceptoNivel03() {
    if (this.cuentaContable.idBalanceNivel01 > 0 && this.cuentaContable.idBalanceNivel02 > 0) {
      this._cuentaContableService.getBalanceConceptoNivel03({
        idBalanceNivel01: this.cuentaContable.idBalanceNivel01,
        idBalanceNivel02: this.cuentaContable.idBalanceNivel02
      })
        .subscribe(
          balanceConceptoNivel03 => { 
            this.balanceConceptoNivel03 = balanceConceptoNivel03; 
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  // ==========================================
  //  Recupera los estados financieros internos
  // ==========================================
  getEstadoFinancieroInterno(): void {
    this._cuentaContableService.getEstadoFinancieroInterno()
      .subscribe(
        estadoFinancieroInterno => { this.estadoFinancieroInterno = estadoFinancieroInterno; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Obtiene el catalogo de notasFinancieras
  // ==========================================
  getNotasFinancieras(): void {
    this._cuentaContableService.getNotasFinancieras()
      .subscribe(
        notasFinancieras => { this.notasFinancieras = notasFinancieras; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Recupera la situación de cuentas contables (Catalogo)
  // ==========================================
  getSituacionCuentaContable(): void {
    this._cuentaContableService.getSituacionCuentaContable()
      .subscribe(
        situacionCuentaContable => { this.cuentaContableSituacion = situacionCuentaContable; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Recupera los departamentos
  // ==========================================
  getDepartamentos(): void {
    this._cuentaContableService.getTodosDepartamentos()
      .subscribe(
        departamentos => { this.departamentos = departamentos; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Recupera la afectación de cuenta contable
  // ==========================================
  getAfectaCuentaContable(): void {
    this._cuentaContableService.getAfectaCuentaContable()
      .subscribe(
        afectaCuentaContable => { this.afectaCuentaContable = afectaCuentaContable; },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Evalua onblur de un inputText
  // ==========================================
  onBlurMetodo(newValue: string, origen: string) {
    switch (origen) {
      //case 'grupoSat':
        //this.validaGrupoSATCuentaContable = (this.cuentaContable.grupoSATCuentaContable == undefined || this.cuentaContable.grupoSATCuentaContable == '');
        //break;
      case 'descripcion':
        this.validaConcepto = (this.cuentaContable.Concepto == undefined || this.cuentaContable.Concepto == '');
        break;
    }
  }

  // ==========================================
  //  Valida el numero de cuenta
  // ==========================================
  private validaEstructuraCuenta(valor) {
    if (valor.length === 19) {
      var filtro = '1234567890';
      for (var i = 0; i < valor.length; i++) {
        if (filtro.indexOf(valor.charAt(i)) == -1) {
          if (i === 4 || i === 9 || i === 14) {
            if (valor.charAt(i) !== '-') { return true; }
          } else { return true; }
        } else if (i === 4 || i === 9 || i === 14) { return true; }
      }
      return false;
    }
    return true;
  }

  // ==========================================
  //  Recupera el xml de la cuenta
  // ==========================================
  private getXmlCuenta() {
    var xmlCuenta = [];
    xmlCuenta.push('<id>' + this.cuentaContable.id + '</id>');
    xmlCuenta.push('<numeroCuenta>' + this.cuentaContable.numeroCuenta + '</numeroCuenta>');
    xmlCuenta.push('<Concepto>' + this.cuentaContable.Concepto + '</Concepto>');
    if (typeof this.cuentaContable.idNaturaleza !== 'undefined' && this.cuentaContable.idNaturaleza !== 0) {
      xmlCuenta.push('<idNaturaleza>' + this.cuentaContable.idNaturaleza + '</idNaturaleza>');
    } if (typeof this.cuentaContable.idCuentaDetalle !== 'undefined' && this.cuentaContable.idCuentaDetalle !== 0) {
      xmlCuenta.push('<idCuentaDetalle>' + this.cuentaContable.idCuentaDetalle + '</idCuentaDetalle>');
    } if (typeof this.cuentaContable.idBalanceNivel01 !== 'undefined' && this.cuentaContable.idBalanceNivel01 !== 0) {
      xmlCuenta.push('<idBalanceNivel01>' + this.cuentaContable.idBalanceNivel01 + '</idBalanceNivel01>');
    } if (typeof this.cuentaContable.idBalanceNivel02 !== 'undefined' && this.cuentaContable.idBalanceNivel02 !== 0) {
      xmlCuenta.push('<idBalanceNivel02>' + this.cuentaContable.idBalanceNivel02 + '</idBalanceNivel02>');
    } if (typeof this.cuentaContable.idBalanceNivel03 !== 'undefined' && this.cuentaContable.idBalanceNivel03 !== 0) {
      xmlCuenta.push('<idBalanceNivel03>' + this.cuentaContable.idBalanceNivel03 + '</idBalanceNivel03>');
    } if (typeof this.cuentaContable.idEstadoResultadosI !== 'undefined' && this.cuentaContable.idEstadoResultadosI !== 0) {
      xmlCuenta.push('<idEstadoResultadosI>' + this.cuentaContable.idEstadoResultadosI + '</idEstadoResultadosI>');
    } if (typeof this.cuentaContable.idDictamen !== 'undefined' && this.cuentaContable.idDictamen !== 0) {
      xmlCuenta.push('<idDictamen>' + this.cuentaContable.idDictamen + '</idDictamen>');
    } if (typeof this.cuentaContable.idNotasDictamen !== 'undefined' && this.cuentaContable.idNotasDictamen !== 0) {
      xmlCuenta.push('<idNotasDictamen>' + this.cuentaContable.idNotasDictamen + '</idNotasDictamen>');
    } if (typeof this.cuentaContable.idNotasFinanciero !== 'undefined' && this.cuentaContable.idNotasFinanciero !== 0) {
      xmlCuenta.push('<idNotasFinanciero>' + this.cuentaContable.idNotasFinanciero, null + '</idNotasFinanciero>');
    } if (typeof this.cuentaContable.idSituacion !== 'undefined' && this.cuentaContable.idSituacion !== 0) {
      xmlCuenta.push('<idSituacion>' + this.cuentaContable.idSituacion + '</idSituacion>');
    } if (typeof this.cuentaContable.idDepartamento !== 'undefined' && this.cuentaContable.idDepartamento !== 0) {
      xmlCuenta.push('<idDepartamento>' + this.cuentaContable.idDepartamento + '</idDepartamento>');
    } if (typeof this.cuentaContable.idSucursalSecuencia !== 'undefined' && this.cuentaContable.idSucursalSecuencia !== 0) {
      xmlCuenta.push('<idSucursalSecuencia>' + this.cuentaContable.idSucursalSecuencia + '</idSucursalSecuencia>');
    } if (typeof this.cuentaContable.idFlujoEfectivo !== 'undefined' && this.cuentaContable.idFlujoEfectivo !== 0) {
      xmlCuenta.push('<idFlujoEfectivo>' + this.cuentaContable.idFlujoEfectivo + '</idFlujoEfectivo>');
    } if (typeof this.cuentaContable.idEstadoResultadosInternoConcepto !== 'undefined' && this.cuentaContable.idEstadoResultadosInternoConcepto !== 0) {
      xmlCuenta.push('<idEstadoResultadosInternoConcepto>' + this.cuentaContable.idEstadoResultadosInternoConcepto + '</idEstadoResultadosInternoConcepto>');
    } if (typeof this.cuentaContable.idEFInterno !== 'undefined' && this.cuentaContable.idEFInterno !== 0) {
      xmlCuenta.push('<idEFInterno>' + this.cuentaContable.idEFInterno + '</idEFInterno>');
    } if (typeof this.cuentaContable.idAfectaCuentaContable !== 'undefined' && this.cuentaContable.idAfectaCuentaContable !== 0) {
      xmlCuenta.push('<idAfectaCuentaContable>' + this.cuentaContable.idAfectaCuentaContable + '</idAfectaCuentaContable>');
    } if (typeof this.cuentaContable.grupoSATCuentaContable !== 'undefined' && this.cuentaContable.grupoSATCuentaContable !== '') {
      xmlCuenta.push('<grupoSATCuentaContable>' + this.cuentaContable.grupoSATCuentaContable + '</grupoSATCuentaContable>');
    }
    //xmlCuenta.push('<eFInterno>' + this.valorEFInterno + '</eFInterno>');
    var xmlCuentaFinal = '<CuentaContables>' + '<CuentaContable>' + xmlCuenta.join('') + '</CuentaContable>' + '</CuentaContables>';

    return xmlCuentaFinal;
  }

  // ==========================================
  //  Evalua valor undefined y retorna nuevo valor
  // ==========================================
  private convertUndefined(value, newValue) {
    return value === undefined ? newValue : value;
  }


  // ==========================================
  //  Evalua Onchange de Select
  // ==========================================
  onChangeValidador(newValue: number, origen: string): void {
    switch (origen) {
      case 'naturaleza':
        this.validaNaturaleza = newValue == 0;
        break;
      case 'cuentaDetalle':
        this.validaCuentaDetalle = newValue == 0;
        break;
      case 'notaDictamen':
        this.validaNotaDictamen = newValue == 0;
        break;
      case 'dictamen':
        this.validaDictamen = newValue == 0;
        break;
      case 'grupo1':
        this.validaGrupo1 = newValue == 0;
        if (!this.validaGrupo1) {
          this.getBalanceConceptoNivel02();
        }
        break;
      case 'grupo2':
        this.validaGrupo2 = newValue == 0;
        if (!this.validaGrupo1 && !this.validaGrupo2) {
          this.getBalanceConceptoNivel03();
        }
        break;
      case 'grupo3':
        this.validaGrupo3 = newValue == 0;
        break;
      case 'EFInterno':
        this.validaEFInterno = newValue == 0;
        if (newValue > 0) {
          this.valorEFInterno = this.estadoFinancieroInterno.find(x => x.id == newValue).EstadoFinancieroInterno;
        }
        break;
      case 'notaFinanciera':
        this.validaNotaFinanciera = newValue == 0;
        break;
      case 'departamento':
        this.validaDepartamento = newValue == 0;
        break;
      case 'afectaCuentaContable':
        this.validaAfectaCuentaContable = newValue == -1;
        break;
      case 'situacionCuenta':
        this.validaSituacionCuentaContable = newValue == -1;
        break;

    }
  }

  // ==========================================
  //  Controla spinner
  // ==========================================
  private controlaSpinner(estado: boolean, tiempo: number = 0) {
    if (estado) {
      this._spinnerService.show();
      setTimeout(() => { this._spinnerService.hide(); }, tiempo);
    } else { this._spinnerService.hide(); }
  }

  // ==========================================
  //  Guarda la información de la cuenta
  // ==========================================
  guardarCuenta(): void {
    if (!this.validaFormulario()) {
      this.controlaSpinner(true, 3000);
      const usuario = JSON.parse(localStorage.getItem('userLogged'));
      this._cuentaContableService.CuentaContableEditar({
        idUsuario: usuario.id,
        xmlCuenta: this.getXmlCuenta()
      })
        .subscribe(
          resultadoInsert => {
            this.controlaSpinner(false);
            if (resultadoInsert.respuesta === 1) {
              this.inicializaCuenta();
              this.cuentaEncontrada = false;
              swal('Administración de cuenta', 'Cuenta actualizada correctamente', 'success');
            } else {
              this.controlaSpinner(false);
              swal('Administración de cuenta', 'Ocurrio un error al actualizar la cuenta', 'error');
            }
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  ocultarFormmulario(): void {
    this.inicializaCuenta();
    this.cuentaEncontrada = false;
  }

  // ==========================================
  //  Valida la información del formulario
  // ==========================================
  private validaFormulario() {
    /*
    this.validaNaturaleza = this.cuentaContable.idNaturaleza == 0;
    this.validaCuentaDetalle = this.cuentaContable.idCuentaDetalle == 0;
    this.validaNotaDictamen = this.cuentaContable.idNotasDictamen == 0;
    this.validaDictamen = this.cuentaContable.idDictamen == 0;
    this.validaGrupo1 = this.cuentaContable.idBalanceNivel01 == 0;
    this.validaGrupo2 = this.cuentaContable.idBalanceNivel02 == 0;
    this.validaGrupo3 = this.cuentaContable.idBalanceNivel03 == 0;
    this.validaEFInterno = this.cuentaContable.idEFInterno == 0;
    this.validaNotaFinanciera = this.cuentaContable.idNotasFinancieras == 0;
    this.validaDepartamento = this.cuentaContable.idDepartamento == 0;
    this.validaNumeroCuenta = (this.cuentaContable.numeroCuenta == undefined || this.cuentaContable.numeroCuenta == '');
    this.validaNumeroCuenta = !this.validaNumeroCuenta ? this.validaEstructuraCuenta(this.cuentaContable.numeroCuenta) : true;
    this.validaConcepto = (this.cuentaContable.Concepto == undefined || this.cuentaContable.Concepto == '');
    this.validaAfectaCuentaContable = this.cuentaContable.idAfectaCuentaContable == -1;
    this.validaGrupoSATCuentaContable = (this.cuentaContable.grupoSATCuentaContable == undefined || this.cuentaContable.grupoSATCuentaContable == '');
    this.validaSituacionCuentaContable = this.cuentaContable.idSituacion == 0;
    */

    this.validaNumeroCuenta = !this.validaNumeroCuenta ? this.validaEstructuraCuenta(this.cuentaContable.numeroCuenta) : true;
    this.validaConcepto = (this.cuentaContable.Concepto == undefined || this.cuentaContable.Concepto == '');
    //this.validaGrupoSATCuentaContable = (this.cuentaContable.grupoSATCuentaContable == undefined || this.cuentaContable.grupoSATCuentaContable == '');
    /*return (this.validaNaturaleza || this.validaCuentaDetalle || this.validaNotaDictamen || this.validaDictamen
      || this.validaGrupo1 || this.validaGrupo2 || this.validaGrupo3 || this.validaNotaFinanciera || this.validaEFInterno
      || this.validaDepartamento || this.validaCompaniaCuenta || this.validaNumeroCuenta || this.validaConcepto
      || this.validaAfectaCuentaContable || this.validaGrupoSATCuentaContable || this.validaSituacionCuentaContable)*/
    return (this.validaNumeroCuenta || this.validaConcepto)

  }

}
