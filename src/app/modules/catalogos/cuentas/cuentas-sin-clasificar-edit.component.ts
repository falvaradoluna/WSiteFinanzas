import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { DOCUMENT } from '@angular/platform-browser';
import xml2js from 'xml2js';

// Interfaces
import { ICompania } from '../../../models/catalog/compania';
import { IDepartamento } from '../../../models/catalog/departamento';
import { IBalanceConceptoNivel01 } from '../../../models/administracion/balanceConceptoNivel01';
import { IBalanceConceptoNivel02 } from '../../../models/administracion/balanceConceptoNivel02';
import { IBalanceConceptoNivel03 } from '../../../models/administracion/balanceConceptoNivel03';
import { INotasDictamen } from '../../../models/administracion/notasDictamen';
import { INotasFinancieras } from '../../../models/administracion/notasFinancieras';
import { IConceptoEstadoResultado } from '../../../models/administracion/conceptoEstadoResultado';
import { CuentaContable } from '../../../models/administracion/cuentaContable';
import { CompaniaCuentaContable } from '../../../models/administracion/companiaCuentaContable';
import { ICuentaContableNaturaleza } from '../../../models/administracion/cuentaContableNaturaleza';
import { IDictamen } from '../../../models/administracion/dictamen';
import { IEstadoFinancieroInterno } from '../../../models/administracion/estadoFinancieroInterno';
import { ICuentaContableDetalle } from '../../../models/administracion/cuentaContableDetalle';
import { IAfectaCuentaContable } from '../../../models/administracion/AfectaCuentaContable';
import { ICuentaContableSituacion } from '../../../models/administracion/cuentaContableSituacion';


// Servicios
import { CuentaContableService } from '../servicios/cuentaContable.service';
import { IDetalleErrorCuenta } from '../../../models/administracion/detalleErrorCuenta';
import { ICuentaContableSAT } from '../../../models/administracion/cuentaContableSAT';

@Component({
  selector: 'cta-cuentas-sin-clasificar-edit',
  templateUrl: './cuentas-sin-clasificar-edit.component.html',
  styleUrls: ['./cuentas-sin-clasificar-edit.component.scss']
})
export class CuentasSinClasificarEditComponent implements OnInit {
  companias: ICompania[];
  departamentos: IDepartamento[] = [];
  balanceConceptoNivel01: IBalanceConceptoNivel01[] = [];
  balanceConceptoNivel02: IBalanceConceptoNivel02[] = [];
  balanceConceptoNivel03: IBalanceConceptoNivel03[] = [];
  notasDictamen: INotasDictamen[] = [];
  notasFinancieras: INotasFinancieras[] = [];
  conceptoEstadoResultado: IConceptoEstadoResultado[] = [];
  cuentaContableNaturaleza: ICuentaContableNaturaleza[] = []
  dictamenCuenta: IDictamen[] = [];
  estadoFinancieroInterno: IEstadoFinancieroInterno[] = [];
  cuentaContableDetalle: ICuentaContableDetalle[] = [];
  afectaCuentaContable: IAfectaCuentaContable[] = [];
  cuentaContableSituacion: ICuentaContableSituacion[] = [];
  cuentaContableSAT: ICuentaContableSAT[] = [];
     
  public detalleErrorCuenta: IDetalleErrorCuenta[] = [];
  textModal: string;

  // Variables para validar formulario
  public validaGrupo1: boolean = false;
  public validaGrupo2: boolean = false;
  public validaCompaniaCuenta: boolean = false;
  public validaDescripcionCompania: boolean = false;
  public validaCompaniaCuentaEspecifico: boolean = false;
  public valorDescrCompania: string;
  public valorEFInterno: string;
  public tituloFormCuenta: string;
  public companiaCuentaCont = new CompaniaCuentaContable();
  public errorGuardarCuenta: boolean = false;

  // propiedad para tamaño alto de grid 
  public heightTable = 55;

  items: TreeviewItem[] = [];
  companiasCuentaContable: CompaniaCuentaContable[] = [];
  errorMessage: any;
  companiasSelected: any = [];
  descripcionGeneral: string;

  // Variables input y outputs
  @Input() public cuentaContable = new CuentaContable();
  @Input() public operacionCuenta: number;
  @Output() public mostrarCuentas: EventEmitter<boolean> = new EventEmitter();
  @Output() public mostrarFormCuenta: EventEmitter<boolean> = new EventEmitter();
  @Output() public getCuentasContables: EventEmitter<void> = new EventEmitter();
  public mask: Array<string | RegExp>;
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 300
  });

  constructor(private _cuentaContableService: CuentaContableService, private _spinnerService: NgxSpinnerService) {
    this.mask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  }

  ngOnInit() {
    this.descripcionGeneral = '';
    this.asignarTituloFormulario(true);
    this.getCompanias();
    this.getDepartamentos();
    this.getBalanceConceptoNivel01();
    this.getNotasDictamen();
    this.getNotasFinancieras();
    this.getConceptoEstadoResultado();
    this.getCuentaContableNaturaleza();
    this.getDictamenCuenta();
    this.getEstadoFinancieroInterno();
    this.getCuentaContableDetalle();
    this.getAfectaCuentaContable();
    this.getSituacionCuentaContable();
    this.obtenerCuentaContableSat();


    //let selectores = document.getElementsByClassName('dropdownTreeview');
    //console.log(selectores);
    // innerText
  }

  // ==========================================
  //  Recupera las companias de la centa
  // ==========================================
  private getCompaniasCuentaContable() {
    this._cuentaContableService.getCompaniasCuentaContable({ idCuentaContable: this.cuentaContable.id })
      .subscribe(
        companiasCuenta => {
          this.companiasCuentaContable = companiasCuenta;
          console.log(this.companiasCuentaContable);
          this.heightTable = this.companiasCuentaContable.length === 1 ? 115 : 165;
        },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Limpia formulario
  // ==========================================
  private limpiarFormulario() {
    this.cuentaContable = new CuentaContable();
    this.companiasCuentaContable = [];
    this.cuentaContable.idBalanceNivel01 = 0;
    this.cuentaContable.idBalanceNivel02 = 0;
    this.cuentaContable.idBalanceNivel03 = 0;
    this.cuentaContable.idCuentaDetalle = 0;
    this.cuentaContable.idDepartamento = 0;
    this.cuentaContable.idDictamen = 0;
    this.cuentaContable.idEFInterno = 0;
    this.cuentaContable.idEstadoResultadosI = 0;
    this.cuentaContable.idEFInterno = 0;
    this.cuentaContable.idFlujoEfectivo = 0;
    this.cuentaContable.idNaturaleza = 0;
    this.cuentaContable.idNotasDictamen = 0;
    this.cuentaContable.idNotasFinancieras = 0;
    this.cuentaContable.idNotasFinanciero = 0;
    this.cuentaContable.idSituacion = 0;
    this.cuentaContable.idSucursal = 0;
    this.cuentaContable.idAfectaCuentaContable = -1;    
    this.cuentaContable.grupoSATCuentaContable = "0";
  }

  // ==========================================
  //  Asigna el titulo correspondiente al formulario
  // ==========================================
  private asignarTituloFormulario(limpiar: boolean) {
    switch (this.operacionCuenta) {
      case 1:
        this.tituloFormCuenta = 'Crear nueva cuenta';
        this.textModal = 'registrada';
        if (limpiar) {
          this.limpiarFormulario();
        }
        break;
      case 2:
        this.tituloFormCuenta = 'Modificar cuenta';
        this.textModal = 'actualizada';
        if (limpiar) {
          this.getCompaniasCuentaContable();
        }
        break;
      case 3:
        this.tituloFormCuenta = 'Detalle de cuenta';
        this.getCompaniasCuentaContable();
        break;
    }
  }

  // ==========================================
  //  Evalua valor de evento de inputSelect
  // ==========================================
  onSelectedChange(event, validarSelect: boolean = false) {
    this.companiasSelected = event;
    this.validaCompaniaCuentaEspecifico = false;
  }

  // ==========================================
  //  Carga datos al treeView
  // ==========================================
  cargaTreeview() {
    this.items = [];
    for (var i = 0; i < this.companias.length; i++) {
      this.items.push(
        new TreeviewItem(
          {
            text: this.companias[i].razonSocial,
            value: this.companias[i].id,
            collapsed: true,
            checked: false
          })
      );
    }
  }

  // ==========================================
  //  Recupera las companias por usuario
  // ==========================================
  getCompanias(idCompania: number = 0): void {
    this.controlaSpinner(true, 3000);
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._cuentaContableService.getCompanias({ idUsuario: usuario.id })
      .subscribe(
        companias => {
          this.companias = companias;
          if (idCompania > 0) {
            this.reloadTreeview(idCompania);
          } else if (this.operacionCuenta == 2 || this.operacionCuenta == 3) {
            this.eliminarCompaniasSeleccionadas();
          }

          this.cargaTreeview();
          this.controlaSpinner(false);
        },
        error => this.errorMessage = <any>error);
  }

  // ==========================================
  //  Recupera los departamentos
  // ==========================================
  getDepartamentos(): void {
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._cuentaContableService.getDepartamentos({
      idCompania: 2,
      idSucursal: 0,
      idUsuario: usuario.id
    })
      .subscribe(
        departamentos => { this.departamentos = departamentos; },
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
          if (this.operacionCuenta === 2) {
            this.getBalanceConceptoNivel02();
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Obtiene el concepto de balance nivel 02
  // ==========================================
  getBalanceConceptoNivel02(): void {
    if (this.cuentaContable.idBalanceNivel01 > 0) {
      this._cuentaContableService.getBalanceConceptoNivel02({ idBalanceNivel01: this.cuentaContable.idBalanceNivel01 })
        .subscribe(
          balanceConceptoNivel02 => {
            this.balanceConceptoNivel02 = balanceConceptoNivel02;
            if (this.operacionCuenta === 2) {
              this.getBalanceConceptoNivel03();
            }
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  // ==========================================
  //  Obtiene el concepto de balance nivel 02
  // ==========================================
  getBalanceConceptoNivel03(): void {
    if (this.cuentaContable.idBalanceNivel01 > 0 && this.cuentaContable.idBalanceNivel02 > 0) {
      this._cuentaContableService.getBalanceConceptoNivel03({
        idBalanceNivel01: this.cuentaContable.idBalanceNivel01,
        idBalanceNivel02: this.cuentaContable.idBalanceNivel02
      })
        .subscribe(
          balanceConceptoNivel03 => { this.balanceConceptoNivel03 = balanceConceptoNivel03; },
          error => this.errorMessage = <any>error
        );
    }
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
  //  Obtiene el catalogo de estado de resultados
  // ==========================================
  getConceptoEstadoResultado(): void {
    this._cuentaContableService.getConceptoEstadoResultado()
      .subscribe(
        conceptoEstadoResultado => { this.conceptoEstadoResultado = conceptoEstadoResultado; },
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
  //  Recupera la situación de cuentas contables (Catalogo)
  // ==========================================
  obtenerCuentaContableSat(): void {
    this._cuentaContableService.obtenerCuentaContableSat()
      .subscribe(
        cuentaContableSAT => { this.cuentaContableSAT = cuentaContableSAT; },
        error => this.errorMessage = <any>error
      );
  }


  // ==========================================
  //  Guarda la información de la cuenta
  // ==========================================
  guardarCuenta(): void {
    if (!this.validaFormulario()) {
      this.controlaSpinner(true, 3000);
      const usuario = JSON.parse(localStorage.getItem('userLogged'));
      this._cuentaContableService.CuentaContableExecute({
        idMovimiento: this.operacionCuenta,
        idUsuario: usuario.id,
        xmlCuenta: this.getXmlCuenta()
      })
        .subscribe(
          resultadoInsert => {
            this.controlaSpinner(false);
            if (this.operacionCuenta === 1) {
              this.evaluaRespuestaInsert(resultadoInsert);
            } else if (resultadoInsert.respuesta === 0) {
              this.limpiarFormulario();
              this.ocultarFormmulario(false, true);
              this.getCuentasContables.emit();
              swal('Administración de cuenta', 'Cuenta ' + this.textModal + ' correctamente', 'success');
            } else {
              swal('Administración de cuenta', 'Cuenta no' + this.textModal, 'error');
            }
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  private evaluaRespuestaInsert(resultadoInsert) {
    this.detalleErrorCuenta = [];
    let parseString = xml2js.parseString;
    let resultado: any;
    if (resultadoInsert[0][''] !== null) {
      parseString(resultadoInsert[0][''], function (err, result) {
        resultado = result;
      });
      this.errorGuardarCuenta = true;
      this.tituloFormCuenta = 'La cuenta: ' + this.cuentaContable.numeroCuenta + ' contiene los siguientes errores:'
      for (var i = 0; i < resultado['Errores']['Error'].length; i++) {
        this.detalleErrorCuenta.push({ numero: (i + 1), descripcion: resultado['Errores']['Error'][i].error });
      }
    } else {
      this.limpiarFormulario();
      this.ocultarFormmulario(false, true);
      this.getCuentasContables.emit();
      swal('Administración de cuenta', 'Cuenta ' + this.textModal + ' correctamente', 'success');
    }
  }


  // ==========================================
  //  Evalua Onchange de Select
  // ==========================================
  onChangeValidador(newValue: number, origen: string): void {
    switch (origen) {
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
      case 'EFInterno':
        if (newValue > 0) {
          this.valorEFInterno = this.estadoFinancieroInterno.find(x => x.id == newValue).EstadoFinancieroInterno;
        }
        break;
    }
  }

  // ==========================================
  //  Actualiza la información de la cuenta
  // ==========================================
  actualizaCuentaContable(): void {
    this.controlaSpinner(true, 3000);
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._cuentaContableService.CuentaContableExecute({
      idMovimiento: 2,
      idUsuario: usuario.id,
      xmlCuenta: this.getXmlCuenta()
    })
      .subscribe(
        resultadoUpdate => {
          this.controlaSpinner(false);
          if (resultadoUpdate.respuesta === 0) {
            this.controlaSpinner(false, 0);
            this.limpiarFormulario();
            this.ocultarFormmulario(false, true);
            swal('Actualizar cuenta contable', 'Cuenta actualizada correctamente', 'success');
          } else {
            swal('Actualizar cuenta contable', 'Cuenta no actualizada', 'error');
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  // ==========================================
  //  Agrega una compania relacionada a la cuenta
  // ==========================================
  agregarCompania(): void {
    this.validaDescripcionCompania = this.descripcionGeneral == '';
    this.validaCompaniaCuentaEspecifico = this.companiasSelected.length == 0;
    if (this.companiasSelected.length > 0 && this.descripcionGeneral != '') {
      var companiaValue: ICompania = null;
      for (var i = 0; i < this.companiasSelected.length; i++) {
        companiaValue = this.companias.find(x => x.id == parseInt(this.companiasSelected[i]));
        this.companias.splice(this.companias.findIndex(x => x.id == parseInt(this.companiasSelected[i])), 1);
        this.companiasCuentaContable.push(
          {
            idCompania: companiaValue.id,
            razonSocial: companiaValue.razonSocial,
            descripcion: this.descripcionGeneral,
            id: 0,
            editardescripcion: false
          }
        );
      }
      this.companiasSelected = [];
      this.descripcionGeneral = '';
      this.heightTable = this.companiasCuentaContable.length === 1 ? 115 : 165;
      this.cargaTreeview();
      this.validaCompaniaCuenta = this.companiasCuentaContable.length === 0;
    }
  }

  // ==========================================
  //  Elimina una compania de la lista
  // ==========================================
  eliminarCompania(idCompania: number): void {
    this.getCompanias(idCompania);
  }

  // ==========================================
  //  Modifica la descripción de la compania
  // ==========================================
  guardaEdicionDescripcion(descripcion: string, idCompania: number): void {
    if (descripcion === '') {
      this.companiasCuentaContable.find(x => x.idCompania === idCompania).descripcion = this.valorDescrCompania;
    }
    this.companiasCuentaContable.find(x => x.idCompania === idCompania).editardescripcion = false;
  }

  // ==========================================
  //  Oculta boton de edición
  // ==========================================
  cancelarEdicion(idCompania: number): void {
    this.companiasCuentaContable.find(x => x.idCompania === idCompania).descripcion = this.valorDescrCompania;
    this.companiasCuentaContable.find(x => x.idCompania === idCompania).editardescripcion = false;

  }

  // ==========================================
  //  Activa boton de edición
  // ==========================================
  editarDescripcionCompania(idCompania: number, descripcion: string): void {
    this.companiasCuentaContable.find(x => x.idCompania === idCompania).editardescripcion = true;
    this.valorDescrCompania = descripcion;
  }

  // ==========================================
  //  Oculta la lista de errores de la cuenta
  // ==========================================
  ocultarTablaErrores(): void {
    this.errorGuardarCuenta = false;
    this.asignarTituloFormulario(false);
  }

  // ==========================================
  //  Recupera el xml de la cuenta
  // ==========================================
  private getXmlCuenta() {
    var xmlCuenta = [];
    if (this.cuentaContable.id !== undefined && this.cuentaContable.id > 0) {
      xmlCuenta.push('<id>' + this.cuentaContable.id + '</id>');
    }
    xmlCuenta.push('<numeroCuenta>' + this.cuentaContable.numeroCuenta + '</numeroCuenta>');
    xmlCuenta.push('<Concepto>' + this.cuentaContable.Concepto + '</Concepto>');
    xmlCuenta.push('<idNaturaleza>' + this.cuentaContable.idNaturaleza + '</idNaturaleza>');
    xmlCuenta.push('<idCuentaDetalle>' + this.cuentaContable.idCuentaDetalle + '</idCuentaDetalle>');
    xmlCuenta.push('<idDictamen>' + this.cuentaContable.idDictamen + '</idDictamen>');
    xmlCuenta.push('<idNotasDictamen>' + this.cuentaContable.idNotasDictamen + '</idNotasDictamen>');
    xmlCuenta.push('<idBalanceNivel01>' + this.cuentaContable.idBalanceNivel01 + '</idBalanceNivel01>');
    xmlCuenta.push('<idBalanceNivel02>' + this.cuentaContable.idBalanceNivel02 + '</idBalanceNivel02>');
    xmlCuenta.push('<idBalanceNivel03>' + this.cuentaContable.idBalanceNivel03 + '</idBalanceNivel03>');
    //xmlCuenta.push('<idEstadoFinancieroInterno>' + this.cuentaContable.idEstadoFinancieroInterno + '</idEstadoFinancieroInterno>');
    xmlCuenta.push('<idNotasFinancieras>' + this.cuentaContable.idNotasFinancieras + '</idNotasFinancieras>');

    xmlCuenta.push('<idNotasFinanciero>' + this.convertUndefined(this.cuentaContable.idNotasFinanciero, 0) + '</idNotasFinanciero>');

    xmlCuenta.push('<idEstadoResultadosI>' + this.cuentaContable.idEFInterno + '</idEstadoResultadosI>');
    xmlCuenta.push('<idEFInterno>' + this.cuentaContable.idEFInterno + '</idEFInterno>');
    // xmlCuenta.push('<idEstadoResultados>' + this.cuentaContable.idEstadoResultados + '</idEstadoResultados>');
    xmlCuenta.push('<idDepartamento>' + this.cuentaContable.idDepartamento + '</idDepartamento>');
    xmlCuenta.push('<idAfectaCuentaContable>' + this.cuentaContable.idAfectaCuentaContable + '</idAfectaCuentaContable>');
    xmlCuenta.push('<grupoSATCuentaContable>' + this.cuentaContable.grupoSATCuentaContable + '</grupoSATCuentaContable>');
    xmlCuenta.push('<eFInterno>' + this.valorEFInterno + '</eFInterno>');
    xmlCuenta.push('<idSituacion>' + this.cuentaContable.idSituacion + '</idSituacion>');

    xmlCuenta.push('<idEstadoResultadosInternoConcepto>' + this.convertUndefined(this.cuentaContable.idEstadoResultadosInternoConcepto, 0) + '</idEstadoResultadosInternoConcepto>');
    xmlCuenta.push('<idSucursalSecuencia>' + this.convertUndefined(this.cuentaContable.idSucursalSecuencia, -1) + '</idSucursalSecuencia>');
    xmlCuenta.push('<idFlujoEfectivo>' + this.convertUndefined(this.cuentaContable.idFlujoEfectivo, 0) + '</idFlujoEfectivo>');

    xmlCuenta.push('<Companias>' + this.getXmlCompanias().join('') + '</Companias>');
    var xmlCuentaFinal = '<CuentaContables>' + '<CuentaContable>' + xmlCuenta.join('') + '</CuentaContable>' + '</CuentaContables>';

    return xmlCuentaFinal;
  }

  // ==========================================
  //  Recupera el xml de las companias
  // ==========================================
  private getXmlCompanias() {
    var xmlCompania = [];
    var xmlCompanias = [];
    for (var comp = 0; comp < this.companiasCuentaContable.length; comp++) {
      if (this.cuentaContable.id === undefined || this.cuentaContable.id === 0) {
        xmlCompania.push('<numeroCuenta>' + this.cuentaContable.numeroCuenta + '</numeroCuenta>');
      } else {
        xmlCompania.push('<idCuentaContable>' + this.cuentaContable.id + '</idCuentaContable>');
      }
      xmlCompania.push('<id>' + this.companiasCuentaContable[comp].idCompania + '</id>');
      xmlCompania.push('<descripcion>' + this.companiasCuentaContable[comp].descripcion + '</descripcion>');
      xmlCompanias.push('<Compania>' + xmlCompania.join('') + '</Compania>');
      xmlCompania = [];
    }
    return xmlCompanias;
  }

  // ==========================================
  //  Evalua valor undefined y retorna nuevo valor
  // ==========================================
  private convertUndefined(value, newValue) {
    return value === undefined ? newValue : value;
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
  //  Recalcula las companias que mostrara en el TreeView
  // ==========================================
  private reloadTreeview(idCompania: number) {
    this.companiasCuentaContable.splice(this.companiasCuentaContable.findIndex(x => x.idCompania === idCompania), 1);
    this.eliminarCompaniasSeleccionadas();
  }

  // ==========================================
  //  Elimina las companias que se seleccionaron
  // ==========================================
  private eliminarCompaniasSeleccionadas() {
    for (var i = 0; i < this.companiasCuentaContable.length; i++) {
      this.companias.splice(this.companias.findIndex(x => x.id == this.companiasCuentaContable[i].idCompania), 1);
    }
  }

  // ==========================================
  //  Oculta el formulario y muestra el grid
  // ==========================================
  ocultarFormmulario(viewForm: boolean, viewTable: boolean): void {
    this.mostrarFormCuenta.emit(viewForm);
    this.mostrarCuentas.emit(viewTable);
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
  //  Valida la información del formulario
  // ==========================================
  private validaFormulario() {
    return (
      this.cuentaContable.idNaturaleza == 0 || this.cuentaContable.idCuentaDetalle == 0
      || this.cuentaContable.idNotasDictamen == 0 || this.cuentaContable.idDictamen == 0
      || this.cuentaContable.idBalanceNivel01 == 0 || this.cuentaContable.idBalanceNivel02 == 0
      || this.cuentaContable.idBalanceNivel03 == 0 || this.cuentaContable.idEFInterno == 0
      || this.cuentaContable.idNotasFinancieras == 0 || this.cuentaContable.idDepartamento == 0
      || this.companiasCuentaContable.length == 0 || (this.cuentaContable.numeroCuenta == undefined || this.cuentaContable.numeroCuenta == '' || this.validaEstructuraCuenta(this.cuentaContable.numeroCuenta))
      || (this.cuentaContable.Concepto == undefined || this.cuentaContable.Concepto == '')
      || this.cuentaContable.idAfectaCuentaContable == -1 || (this.cuentaContable.grupoSATCuentaContable == undefined || this.cuentaContable.grupoSATCuentaContable == '0')
      || this.cuentaContable.idSituacion == 0
    );
  }

  // ==========================================
  //  Actualiza la información de la cuenta
  // ==========================================
  private validaCuentaContableBD() {
    this.controlaSpinner(true, 3000);
    this._cuentaContableService.ObtieneValoresCuentaContable({
      numCuenta: this.cuentaContable.numeroCuenta
    })
      .subscribe(
        resultado => {
          this.validaCaracteresCuenta(resultado);
          this.controlaSpinner(false);
        },
        error => this.errorMessage = <any>error
      );
  }


  private validaCaracteresCuenta(resultado): boolean {
    var txtError: string[] = [];
    if (!this.validaNumeroCuenta) {
      if (!this.validaDepartamento) {
        if (this.cuentaContable.idDepartamento != parseInt(this.cuentaContable.numeroCuenta.substring(5, 9))) {
          txtError.push('No es valido el departamento de la cuenta');
        }
      } if (this.cuentaContable.idBalanceNivel01 != resultado[0].grupo1) {
        txtError.push('No es valido el grupo 1 de la cuenta');
      }
      if (this.cuentaContable.idBalanceNivel02 != resultado[0].grupo2) {
        txtError.push('No es valido el grupo 2 de la cuenta');
      }

      if (txtError.length > 0) {
        swal('Errores en numero de cuenta', txtError.join(', '), 'error');
        return true;
      }
      return false;
    }
  }



}
