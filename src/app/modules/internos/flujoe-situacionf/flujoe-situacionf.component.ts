import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
//Interfaces
import { IEfectivoSituacion } from '../efectivo-y-situacion-financiera';
import { IEstadoSituacion } from '../estado-Situacion-Financiera';
//Servicio
import { InternosService } from '../internos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEstadoSituacionCuenta } from '../estado-Situacion-Financiera-Cuenta';

@Component({
  selector: 'int-flujoe-situacionf',
  templateUrl: './flujoe-situacionf.component.html',
  styleUrls: ['./flujoe-situacionf.component.scss']
})
export class FlujoeSituacionfComponent implements OnInit, OnChanges {

  @Input() mes:                   string;
  @Input() anio:                  string;
  @Input() selectedCompania:      number;
  @Input() selectedIdSucursal:    number;
  @Input() showEfectivoSituacion: boolean;
  @Input() selectedTipoReporte:   number;
  
  @Output() errorMessage  = new EventEmitter<any>();
  @Output() fixedHeader   = new EventEmitter<string>();
  //@Input() showPercents: boolean;
  
  efectivoSituacion:  IEfectivoSituacion[];
  estadoSituacion:    IEstadoSituacion[] = [];
  estadoSituacionCuentas: IEstadoSituacionCuenta[];
  isEstadoSituacion: boolean = false;
  showReporteNivel: number = 0;
  selectedNombreCompania: string;
  selectedConcepto: string;
  nombreMes: string;
  detalleValue: number = 0;

  constructor(private _service: InternosService, private _spinnerService: NgxSpinnerService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.getEfectivoSituacion();
  }
  
  ngOnInit() {
  }

  getEfectivoSituacion(): void {
    if (this.selectedTipoReporte.toString() === '4') {
      this._spinnerService.show(); 
      this.showReporteNivel = 1
      this._service.get_EfectivoSituacion({
        idTipoReporte: this.selectedTipoReporte,
        idAgencia: this.selectedCompania,
        anio: this.anio
      })
        .subscribe(efectivoSituacion => {
          this.efectivoSituacion = efectivoSituacion;
          this.fixedHeader.emit('tableEfectivo');
          this._spinnerService.hide(); 
        },
        error => this.errorMessage.emit(error));
    }else if (this.selectedTipoReporte.toString() === '5') {
      this._spinnerService.show(); 
      this.showReporteNivel = 2
      this._service.get_EstadoSituacion({
        idTipoReporte: this.selectedTipoReporte,
        idAgencia: this.selectedCompania,
        anio: this.anio
      })
        .subscribe(estadoSituacion => {
          this.RubroCalculo(estadoSituacion);
          this.fixedHeader.emit('tableEstado');
          this._spinnerService.hide(); 
        },
        error => this.errorMessage.emit(error));
    }
  }

  private RubroCalculo(estadoSituacionTemp:    IEstadoSituacion[]) {
    this.estadoSituacion = estadoSituacionTemp;
    var valorVentas : any;
    if(estadoSituacionTemp.length > 0) {
      valorVentas = estadoSituacionTemp[50];
      var valorUtilidad = estadoSituacionTemp[46];
      var valorActivo = estadoSituacionTemp[23];
      var valorCapitalContable = estadoSituacionTemp[48];
      var totalPasivo = this.estadoSituacion[39];
      var activoCirculante = this.estadoSituacion[15];
      var pasivoCortoPlazo = this.estadoSituacion[34];
      //Calculo de ROA: Ventas / Total Activo
      this.calculoPorRubroROA(51, valorVentas, valorActivo);      
      //Calculo de ROS: Utilidad Neta / Ventas
      this.calculoPorRubroROS(50, valorUtilidad, valorVentas, 100);    
      //Calculo de MAF: Total Activo / Capital sin Resultado de Ejercicios Anteriores
      this.calculoPorRubroMAF(52, valorActivo, valorCapitalContable, valorUtilidad); 
      //Calculo de ROE: ROS*ROA*MAF
        this.calculoPorRubroROE(53, this.estadoSituacion[50], this.estadoSituacion[51], this.estadoSituacion[52]); 
      //Calculo de Deuda a Capital: Total Pasivo / Capital sin Resultado de Ejercicios Anteriores
      this.calculoPorRubroMAF(54, totalPasivo, valorCapitalContable, valorUtilidad); 
      //Calculo de Prueba de Liquidez: Activo Circulante  / Pasivo a Corto plazo 
      this.calculoPorRubroROA(56, activoCirculante, pasivoCortoPlazo);   
      //Calculo de Deuda a activos totales: Total Pasivo / Total Activo
      this.calculoPorRubroROA(55, totalPasivo, valorActivo);   
      //Calculo de Prueba de ácido: Activo Circulante Sin Inventarios / Pasivo a Corto plazo
      this.calculoPorRubroPruebaAcido(57, activoCirculante, this.estadoSituacion[57], pasivoCortoPlazo);   
    }
  }
  private calculoPorRubroROS(idRubro, rubroDom, rubroDenom, valorMultiplica: number) {
    this.estadoSituacion[idRubro].dicAnioAnt = rubroDenom.dicAnioAnt !== 0 ? ((rubroDom.dicAnioAnt/rubroDenom.dicAnioAnt)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Ene = rubroDenom.Ene !== 0 ? ((rubroDom.Ene/rubroDenom.Ene)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Feb = rubroDenom.Feb !== 0 ? ((rubroDom.Feb/rubroDenom.Feb)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Mar = rubroDenom.Mar !== 0 ? ((rubroDom.Mar/rubroDenom.Mar)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Abr = rubroDenom.Abr !== 0 ? ((rubroDom.Abr/rubroDenom.Abr)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].May = rubroDenom.May !== 0 ? ((rubroDom.May/rubroDenom.May)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Jun = rubroDenom.Jun !== 0 ? ((rubroDom.Jun/rubroDenom.Jun)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Jul = rubroDenom.Jul !== 0 ? ((rubroDom.Jul/rubroDenom.Jul)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Ago = rubroDenom.Ago !== 0 ? ((rubroDom.Ago/rubroDenom.Ago)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Sep = rubroDenom.Sep !== 0 ? ((rubroDom.Sep/rubroDenom.Sep)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Oct = rubroDenom.Oct !== 0 ? ((rubroDom.Oct/rubroDenom.Oct)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Nov = rubroDenom.Nov !== 0 ? ((rubroDom.Nov/rubroDenom.Nov)*valorMultiplica) : 0;
    this.estadoSituacion[idRubro].Dic = rubroDenom.Dic !== 0 ? ((rubroDom.Dic/rubroDenom.Dic)*valorMultiplica) : 0;
  }
  
  private calculoPorRubroROA(idRubro, rubroDom, rubroDenom) {
    this.estadoSituacion[idRubro].dicAnioAnt = rubroDenom.dicAnioAnt != 0 ? (rubroDom.dicAnioAnt/rubroDenom.dicAnioAnt) : 0;
    this.estadoSituacion[idRubro].Ene = rubroDenom.Ene != 0 ? (rubroDom.Ene/rubroDenom.Ene) : 0;
    this.estadoSituacion[idRubro].Feb = rubroDenom.Feb != 0 ? (rubroDom.Feb/rubroDenom.Feb) : 0;
    this.estadoSituacion[idRubro].Mar = rubroDenom.Mar != 0 ? (rubroDom.Mar/rubroDenom.Mar) : 0;
    this.estadoSituacion[idRubro].Abr = rubroDenom.Abr != 0 ? (rubroDom.Abr/rubroDenom.Abr) : 0;
    this.estadoSituacion[idRubro].May = rubroDenom.May != 0 ? (rubroDom.May/rubroDenom.May) : 0;
    this.estadoSituacion[idRubro].Jun = rubroDenom.Jun != 0 ? (rubroDom.Jun/rubroDenom.Jun) : 0;
    this.estadoSituacion[idRubro].Jul = rubroDenom.Jul != 0 ? (rubroDom.Jul/rubroDenom.Jul) : 0;
    this.estadoSituacion[idRubro].Ago = rubroDenom.Ago != 0 ? (rubroDom.Ago/rubroDenom.Ago) : 0;
    this.estadoSituacion[idRubro].Sep = rubroDenom.Sep != 0 ? (rubroDom.Sep/rubroDenom.Sep) : 0;
    this.estadoSituacion[idRubro].Oct = rubroDenom.Oct != 0 ? (rubroDom.Oct/rubroDenom.Oct) : 0;
    this.estadoSituacion[idRubro].Nov = rubroDenom.Nov != 0 ? (rubroDom.Nov/rubroDenom.Nov) : 0;
    this.estadoSituacion[idRubro].Dic = rubroDenom.Dic != 0 ? (rubroDom.Dic/rubroDenom.Dic) : 0;
  }
  private calculoPorRubroMAF(idRubro, rubroDom, rubroDenom, valorResta) {
    this.estadoSituacion[idRubro].dicAnioAnt = (rubroDenom.dicAnioAnt-valorResta.dicAnioAnt) != 0 ? (rubroDom.dicAnioAnt/(rubroDenom.dicAnioAnt-valorResta.dicAnioAnt)) : 0;
    this.estadoSituacion[idRubro].Ene = (rubroDenom.Ene-valorResta.Ene) != 0 ? (rubroDom.Ene/(rubroDenom.Ene-valorResta.Ene)) : 0;
    this.estadoSituacion[idRubro].Feb = (rubroDenom.Feb-valorResta.Feb) != 0 ? (rubroDom.Feb/(rubroDenom.Feb-valorResta.Feb)) : 0;
    this.estadoSituacion[idRubro].Mar = (rubroDenom.Mar-valorResta.Mar) != 0 ? (rubroDom.Mar/(rubroDenom.Mar-valorResta.Mar)) : 0;
    this.estadoSituacion[idRubro].Abr = (rubroDenom.Abr-valorResta.Abr) != 0 ? (rubroDom.Abr/(rubroDenom.Abr-valorResta.Abr)) : 0;
    this.estadoSituacion[idRubro].May = (rubroDenom.May-valorResta.May) != 0 ? (rubroDom.May/(rubroDenom.May-valorResta.May)) : 0;
    this.estadoSituacion[idRubro].Jun = (rubroDenom.Jun-valorResta.Jun) != 0 ? (rubroDom.Jun/(rubroDenom.Jun-valorResta.Jun)) : 0;
    this.estadoSituacion[idRubro].Jul = (rubroDenom.Jul-valorResta.Jul) != 0 ? (rubroDom.Jul/(rubroDenom.Jul-valorResta.Jul)) : 0;
    this.estadoSituacion[idRubro].Ago = (rubroDenom.Ago-valorResta.Ago) != 0 ? (rubroDom.Ago/(rubroDenom.Ago-valorResta.Ago)) : 0;
    this.estadoSituacion[idRubro].Sep = (rubroDenom.Sep-valorResta.Sep) != 0 ? (rubroDom.Sep/(rubroDenom.Sep-valorResta.Sep)) : 0;
    this.estadoSituacion[idRubro].Oct = (rubroDenom.Oct-valorResta.Oct) != 0 ? (rubroDom.Oct/(rubroDenom.Oct-valorResta.Oct)) : 0;
    this.estadoSituacion[idRubro].Nov = (rubroDenom.Nov-valorResta.Nov) != 0 ? (rubroDom.Nov/(rubroDenom.Nov-valorResta.Nov)) : 0;
    this.estadoSituacion[idRubro].Dic = (rubroDenom.Dic-valorResta.Dic) != 0 ? (rubroDom.Dic/(rubroDenom.Dic-valorResta.Dic)) : 0;
  }
  private calculoPorRubroROE(idRubro, rubro1, rubro2, rubro3) {
    this.estadoSituacion[idRubro].dicAnioAnt = (rubro1.dicAnioAnt * rubro2.dicAnioAnt * rubro3.dicAnioAnt);
    this.estadoSituacion[idRubro].Ene = (rubro1.Ene * rubro2.Ene * rubro3.Ene);
    this.estadoSituacion[idRubro].Feb = (rubro1.Feb * rubro2.Feb * rubro3.Feb);
    this.estadoSituacion[idRubro].Feb = (rubro1.Feb * rubro2.Feb * rubro3.Feb);
    this.estadoSituacion[idRubro].Mar = (rubro1.Mar * rubro2.Mar * rubro3.Mar);
    this.estadoSituacion[idRubro].Abr = (rubro1.Abr * rubro2.Abr * rubro3.Abr);
    this.estadoSituacion[idRubro].May = (rubro1.May * rubro2.May * rubro3.May);
    this.estadoSituacion[idRubro].Jun = (rubro1.Jun * rubro2.Jun * rubro3.Jun);
    this.estadoSituacion[idRubro].Jul = (rubro1.Jul * rubro2.Jul * rubro3.Jul);
    this.estadoSituacion[idRubro].Ago = (rubro1.Ago * rubro2.Ago * rubro3.Ago);
    this.estadoSituacion[idRubro].Sep = (rubro1.Sep * rubro2.Sep * rubro3.Sep);
    this.estadoSituacion[idRubro].Oct = (rubro1.Oct * rubro2.Oct * rubro3.Oct);
    this.estadoSituacion[idRubro].Nov = (rubro1.Nov * rubro2.Nov * rubro3.Nov);
    this.estadoSituacion[idRubro].Dic = (rubro1.Dic * rubro2.Dic * rubro3.Dic);
  }
  private calculoPorRubroPruebaAcido(idRubro, rubro1, rubro2, rubro3) {
    this.estadoSituacion[idRubro].dicAnioAnt = rubro3.dicAnioAnt != 0 ? ((rubro1.dicAnioAnt- rubro2.dicAnioAnt)/rubro3.dicAnioAnt) : 0;
    this.estadoSituacion[idRubro].Ene = rubro3.Ene !== 0 ? ((rubro1.Ene- rubro2.Ene)/rubro3.Ene) : 0;
    this.estadoSituacion[idRubro].Feb = rubro3.Feb !== 0 ? ((rubro1.Feb- rubro2.Feb)/rubro3.Feb) : 0;
    this.estadoSituacion[idRubro].Mar = rubro3.Mar !== 0 ? ((rubro1.Mar- rubro2.Mar)/rubro3.Mar) : 0;
    this.estadoSituacion[idRubro].Abr = rubro3.Abr !== 0 ? ((rubro1.Abr- rubro2.Abr)/rubro3.Abr) : 0;
    this.estadoSituacion[idRubro].May = rubro3.May !== 0 ? ((rubro1.May- rubro2.May)/rubro3.May) : 0;
    this.estadoSituacion[idRubro].Jun = rubro3.Jun !== 0 ? ((rubro1.Jun- rubro2.Jun)/rubro3.Jun) : 0;
    this.estadoSituacion[idRubro].Jul = rubro3.Jul !== 0 ? ((rubro1.Jul- rubro2.Jul)/rubro3.Jul) : 0;
    this.estadoSituacion[idRubro].Ago = rubro3.Ago !== 0 ? ((rubro1.Ago- rubro2.Ago)/rubro3.Ago) : 0;
    this.estadoSituacion[idRubro].Sep = rubro3.Sep !== 0 ? ((rubro1.Sep- rubro2.Sep)/rubro3.Sep) : 0;
    this.estadoSituacion[idRubro].Oct = rubro3.Oct !== 0 ? ((rubro1.Oct- rubro2.Oct)/rubro3.Oct) : 0;
    this.estadoSituacion[idRubro].Nov = rubro3.Nov !== 0 ? ((rubro1.Nov- rubro2.Nov)/rubro3.Nov) : 0;
    this.estadoSituacion[idRubro].Dic = rubro3.Dic !== 0 ? ((rubro1.Dic- rubro2.Dic)/rubro3.Dic) : 0;
  }

getReporteNivel(nivel: number): void {
  this.efectivoSituacion = [];
  this.estadoSituacion = [];
  this.showReporteNivel = this.showReporteNivel === 3 ? 1 : 2;
  this.getEfectivoSituacion();  
}

onClickCuentas(id: number, idConcepto: number, periodoMes: number, concepto: string, nombreCompania: string, mes: string, valueMes: number): void {
  if(id > 0) {
    this.estadoSituacionCuentas = [];
    this.selectedNombreCompania = nombreCompania;
    this.nombreMes = mes;
    this.selectedConcepto = concepto;
    this.detalleValue = valueMes;
    if (this.selectedTipoReporte.toString() === '4') {
      if(id != 21 && id != 3006 && id != 3011) {
        this.getEfectivoSituacionCuentas(periodoMes, id);
        this.showReporteNivel = 3;
      }
    } else if (this.selectedTipoReporte.toString() === '5') {
      this.getEfectivoSituacionCuentas(periodoMes, idConcepto);
      this.showReporteNivel = 4;
    }
  }
}

getEfectivoSituacionCuentas(periodoMes: number, idConcepto: number): void {
  this._spinnerService.show(); 
  this._service.get_EstadoSituacionCuenta({
    idTipoReporte: this.selectedTipoReporte,
    idCompania: this.selectedCompania,
    periodoYear: this.anio,
    periodoMes: periodoMes,
    idConcepto: idConcepto
  }).subscribe(estadoSituacionCuenta => {
    this.estadoSituacionCuentas = estadoSituacionCuenta;
    this._spinnerService.hide(); 
  }, error => { 
        this.errorMessage.emit(error); 
        this._spinnerService.hide(); 
      });
}
}
