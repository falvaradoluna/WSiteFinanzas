import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { IDetalleUnidadesMensual } from '../../models/reports/detalle-unidades-mensual';
import { IDetalleUnidadesAcumulado } from '../../models/reports/detalle-unidades-acumulado';
import { ITipoUnidad } from '../../models/reports/tipo-unidad';

import { ColumnSortedEvent } from '../../shared/index';
import { InternosService } from './internos.service';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'int-unidades-nv2',
  templateUrl: './unidades-nv2.component.html',
  styleUrls: ['./internos.component.scss']
})
export class UnidadesNv2Component implements OnInit, OnDestroy, OnChanges {
  @Input() idDetalleUnidades: number; // 1 = mensual, 2 = acumulado
  @Input() mes: string;
  @Input() anio: string;
  @Input() selectedCompania: number;
  @Input() selectedIdSucursal: number;
  @Input() idOrigen: number;
  @Input() showPercents: boolean;
  @Input() selectedIdDepartamento: number;
  @Input() isUnidadesDepto: boolean;

  @Output() showUnidades = new EventEmitter<boolean>();
  @Output() showDetalleUnidadesPrimerNivel = new EventEmitter<boolean>();
  @Output() showDetalleUnidadesSegundoNivel = new EventEmitter<boolean>();
  @Output() detalleUnidadesNameSegundoNivel = new EventEmitter<string>();
  @Output() detalleUnidadesValueSegundoNivel = new EventEmitter<string>();
  @Output() detalleUnidadesConceptoSegundoNivel = new EventEmitter<string>();
  @Output() mesAcumulado = new EventEmitter<string>();
  @Output() idDepartamento = new EventEmitter<string>();
  @Output() carLine = new EventEmitter<string>();
  @Output() idAutoLinea = new EventEmitter<number>();
  @Output() errorMessage = new EventEmitter<string>();
  @Output() fixedHeaderId = new EventEmitter<string>();

  @Output() showUnidadesDepartamentoByLevel = new EventEmitter<number>();

  detalleUnidadesMensual: IDetalleUnidadesMensual[];
  detalleUnidadesAcumulado: IDetalleUnidadesAcumulado[];

  dumSubscription: Subscription;
  duaSubscription: Subscription;

  constructor(private _service: InternosService) { }

  ngOnInit() {
    this.fixedHeaderId.emit('idDetalleUnidadesAcumulado');

    if (this.isUnidadesDepto) {
      if (this.idDetalleUnidades === 1) { // Mensual
        this.getUnidadesDepartamentoNv2();
      } else if (this.idDetalleUnidades === 2) { // Acumulado
        this.getUnidadesDepartamentoNv2Acumulado();
      }
    } else {
      if (this.idDetalleUnidades === 1) { // Mensual
        if (this.idOrigen === 3) { // Flotillas
          this.getDetalleUnidadesMensualFlotillas();
        } else {
          this.getDetalleUnidadesMensual();
        }
      } else if (this.idDetalleUnidades === 2) { // Acumulado
        if (this.idOrigen === 3) {
          this.getDetalleUnidadesAcumuladoFlotillas();
        } else {
          this.getDetalleUnidadesAcumulado();
        }
      }
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    const changeProp = changes['showPercents'];
    this.showPercents = <boolean>changeProp.currentValue;
  }

  ngOnDestroy() {
    if (this.idDetalleUnidades === 1) { // Mensual
      this.dumSubscription.unsubscribe();
    } else if (this.idDetalleUnidades === 2) { // Acumulado
      this.duaSubscription.unsubscribe();
    }
  }

  getDetalleUnidadesMensual(): void {
    this.dumSubscription = this._service.getDetalleUnidadesMensual({
      idCompania: this.selectedIdSucursal > 0 ?  0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      idOrigen: this.idOrigen // Nuevas, usadas, etc.
    }).subscribe(
      dum => { this.detalleUnidadesMensual = dum; },
      error => { console.log(error); },
      () => {
        // Se calcula el total y se inserta en el objeto
        const total: number = this.calculaTotalMensual(this.detalleUnidadesMensual, 'cantidad');
        const t: IDetalleUnidadesMensual = {
          'idAutoLinea': -1,
          'autoLinea': 'Total',
          'cantidad': total,
          'CantidadSelected': false,
          'Perc': 100,
          'departamento': '',
          'departamentoOri': ''
        };
        this.detalleUnidadesMensual.push(t);

        // Se calculan porcentajes
        this.detalleUnidadesMensual.forEach(dum => dum.Perc = dum.cantidad / total * 100);
      }
    );
  }

  getUnidadesDepartamentoNv2(): void {
    this.dumSubscription = this._service.getDetalleUnidadesMensual({
      idCompania: this.selectedIdSucursal > 0 ?  0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      idOrigen: this.selectedIdDepartamento, // Nuevas, usadas, etc.
      isUnidadesDepto: this.isUnidadesDepto
    }).subscribe(
      dum => { this.detalleUnidadesMensual = dum; },
      error => { console.log(error); },
      () => {
        // Se calcula el total y se inserta en el objeto
        const total: number = this.calculaTotalMensual(this.detalleUnidadesMensual, 'cantidad');
        const t: IDetalleUnidadesMensual = {
          'idAutoLinea': -1,
          'autoLinea': 'Total',
          'cantidad': total,
          'CantidadSelected': false,
          'Perc': 100,
          'departamento': '',
          'departamentoOri': ''
        };
        this.detalleUnidadesMensual.push(t);

        // Se calculan porcentajes
        this.detalleUnidadesMensual.forEach(dum => dum.Perc = dum.cantidad / total * 100);
      }
    );
  }

  getUnidadesDepartamentoNv2Acumulado(): void {
    this.duaSubscription = this._service.getDetalleUnidadesAcumulado({
      idCompania: this.selectedIdSucursal > 0 ?  0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      idOrigen: this.selectedIdDepartamento, // Nuevas, usadas, etc.
      isUnidadesDepto: this.isUnidadesDepto
    }).subscribe(
      dua => { this.detalleUnidadesAcumulado = dua; },
      error => { console.log(JSON.stringify(error)); },
      () => {
        const totales: IDetalleUnidadesAcumulado = {
          'departamento': '',
          'descripcion': '',
          'IdAutoLinea': -1,
          'autoLinea': 'Total',
          'enero': 0,
          'eneroPerc': 100,
          'febrero': 0,
          'febreroPerc': 100,
          'marzo': 0,
          'marzoPerc': 100,
          'abril': 0,
          'abrilPerc': 100,
          'mayo': 0,
          'mayoPerc': 100,
          'junio': 0,
          'junioPerc': 100,
          'julio': 0,
          'julioPerc': 100,
          'agosto': 0,
          'agostoPerc': 100,
          'septiembre': 0,
          'septiembrePerc': 100,
          'octubre': 0,
          'octubrePerc': 100,
          'noviembre': 0,
          'noviembrePerc': 100,
          'diciembre': 0,
          'diciembrePerc': 100,
          'totalAnual': 0,
          'totalAnualPerc': 100,
          'idOrden': 0,
          'idEstadoResultadosI': 0
        };

        // Ciclo de 12 meses, no debe superar el mes actual, se usa el mes del combo
        for (let mes = 1; mes <= +this.mes; mes++) {
          const nombreMes = this.toLongMonth(mes);

          // Se calcula el total
          const totalMensual: number = this.calculaTotalMensual(this.detalleUnidadesAcumulado, nombreMes);

          // Se actualiza el valor del mes correspondiente
          totales[nombreMes] = totalMensual;

          // Se calculan porcentajes del mes correspondiente
          this.detalleUnidadesAcumulado.forEach(dua => {
            dua[nombreMes + 'Perc'] = dua[nombreMes] / totalMensual * 100;
            if (!dua.totalAnual) {
              dua.totalAnual = 0;
            }
            dua.totalAnual += dua[nombreMes];
            dua.totalAnualPerc = 0;
          });
        }

        // Se actualiza el total anual de todas las autoLineas
        totales.totalAnual = this.calculaTotalMensual(this.detalleUnidadesAcumulado, 'totalAnual');

        // Se calculan los porcentajes de totales
        this.detalleUnidadesAcumulado.forEach(dua => {
          dua.totalAnualPerc = dua.totalAnual / totales.totalAnual * 100;
        });

        // Se agregan totales al objeto
        this.detalleUnidadesAcumulado.push(totales);
      }
    );
  }

  // Flotillas
  getDetalleUnidadesMensualFlotillas(): void {
    this.dumSubscription = this._service.getDetalleUnidadesMensualFlotillas({
      idCompania: this.selectedIdSucursal > 0 ?  0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      idOrigen: this.idOrigen // Nuevas, usadas, etc.
    }).subscribe(
      dum => { this.detalleUnidadesMensual = dum; },
      error => { console.log(error); },
      () => {
        // Se calcula el total y se inserta en el objeto
        const total: number = this.calculaTotalMensual(this.detalleUnidadesMensual, 'cantidad');
        const t: IDetalleUnidadesMensual = {
          'idAutoLinea': -1,
          'autoLinea': 'Total',
          'cantidad': total,
          'CantidadSelected': false,
          'Perc': 100,
          'departamento': '',
          'departamentoOri': ''
        };
        this.detalleUnidadesMensual.push(t);

        // Se calculan porcentajes
        this.detalleUnidadesMensual.forEach(dum => dum.Perc = dum.cantidad / total * 100);
      }
    );
  }

  getDetalleUnidadesAcumulado(): void {
    this.duaSubscription = this._service.getDetalleUnidadesAcumulado({
      idCompania: this.selectedIdSucursal > 0 ?  0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      idOrigen: this.idOrigen // Nuevas, usadas, etc.
    }).subscribe(
      dua => { this.detalleUnidadesAcumulado = dua; },
      error => { console.log(JSON.stringify(error)); },
      () => {
        const totales: IDetalleUnidadesAcumulado = {
          'departamento': '',
          'descripcion': '',
          'IdAutoLinea': -1,
          'autoLinea': 'Total',
          'enero': 0,
          'eneroPerc': 100,
          'febrero': 0,
          'febreroPerc': 100,
          'marzo': 0,
          'marzoPerc': 100,
          'abril': 0,
          'abrilPerc': 100,
          'mayo': 0,
          'mayoPerc': 100,
          'junio': 0,
          'junioPerc': 100,
          'julio': 0,
          'julioPerc': 100,
          'agosto': 0,
          'agostoPerc': 100,
          'septiembre': 0,
          'septiembrePerc': 100,
          'octubre': 0,
          'octubrePerc': 100,
          'noviembre': 0,
          'noviembrePerc': 100,
          'diciembre': 0,
          'diciembrePerc': 100,
          'totalAnual': 0,
          'totalAnualPerc': 100,
          'idOrden': 0,
          'idEstadoResultadosI': 0
        };

        // Ciclo de 12 meses
        for (let mes = 1; mes <= 12; mes++) {
          const nombreMes = this.toLongMonth(mes);

          // Se calcula el total
          const totalMensual: number = this.calculaTotalMensual(this.detalleUnidadesAcumulado, nombreMes);

          // Se actualiza el valor del mes correspondiente
          totales[nombreMes] = totalMensual;

          // Se calculan porcentajes del mes correspondiente
          this.detalleUnidadesAcumulado.forEach(dua => {
            dua[nombreMes + 'Perc'] = dua[nombreMes] / totalMensual * 100;
            dua.totalAnual = dua.enero + dua.febrero + dua.marzo + dua.abril + dua.mayo + dua.junio + dua.julio +
                             dua.agosto + dua.septiembre + dua.octubre + dua.noviembre + dua.diciembre;
            dua.totalAnualPerc = 0;
          });
        }

        // Se actualiza el total anual de todas las autoLineas
        totales.totalAnual = this.calculaTotalMensual(this.detalleUnidadesAcumulado, 'totalAnual');

        // Se calculan los porcentajes de totales
        this.detalleUnidadesAcumulado.forEach(dua => {
          dua.totalAnualPerc = dua.totalAnual / totales.totalAnual * 100;
        });

        // Se agregan totales al objeto
        this.detalleUnidadesAcumulado.push(totales);
      }
    );
  }

  getDetalleUnidadesAcumuladoFlotillas(): void {
    this.duaSubscription = this._service.getDetalleUnidadesAcumuladoFlotillas({
      idCompania: this.selectedIdSucursal > 0 ?  0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      idOrigen: this.idOrigen // Nuevas, usadas, etc.
    }).subscribe(
      dua => { this.detalleUnidadesAcumulado = dua; },
      error => { console.log(JSON.stringify(error)); },
      () => {
        const totales: IDetalleUnidadesAcumulado = {
          'departamento': '',
          'descripcion': '',
          'IdAutoLinea': -1,
          'autoLinea': 'Total',
          'enero': 0,
          'eneroPerc': 100,
          'febrero': 0,
          'febreroPerc': 100,
          'marzo': 0,
          'marzoPerc': 100,
          'abril': 0,
          'abrilPerc': 100,
          'mayo': 0,
          'mayoPerc': 100,
          'junio': 0,
          'junioPerc': 100,
          'julio': 0,
          'julioPerc': 100,
          'agosto': 0,
          'agostoPerc': 100,
          'septiembre': 0,
          'septiembrePerc': 100,
          'octubre': 0,
          'octubrePerc': 100,
          'noviembre': 0,
          'noviembrePerc': 100,
          'diciembre': 0,
          'diciembrePerc': 100,
          'totalAnual': 0,
          'totalAnualPerc': 100,
          'idOrden': 0,
          'idEstadoResultadosI': 0
        };

        // Ciclo de 12 meses
        for (let mes = 1; mes <= 12; mes++) {
          const nombreMes = this.toLongMonth(mes);

          // Se calcula el total
          const totalMensual: number = this.calculaTotalMensual(this.detalleUnidadesAcumulado, nombreMes);

          // Se actualiza el valor del mes correspondiente
          totales[nombreMes] = totalMensual;

          // Se calculan porcentajes del mes correspondiente
          this.detalleUnidadesAcumulado.forEach(dua => {
            dua[nombreMes + 'Perc'] = dua[nombreMes] / totalMensual * 100;
            dua.totalAnual = dua.enero + dua.febrero + dua.marzo + dua.abril + dua.mayo + dua.junio + dua.julio +
                             dua.agosto + dua.septiembre + dua.octubre + dua.noviembre + dua.diciembre;
            dua.totalAnualPerc = 0;
          });
        }

        // Se actualiza el total anual de todas las autoLineas
        totales.totalAnual = this.calculaTotalMensual(this.detalleUnidadesAcumulado, 'totalAnual');

        // Se calculan los porcentajes de totales
        this.detalleUnidadesAcumulado.forEach(dua => {
          dua.totalAnualPerc = dua.totalAnual / totales.totalAnual * 100;
        });

        // Se agregan totales al objeto
        this.detalleUnidadesAcumulado.push(totales);
      }
    );
  }

  calculaTotalMensual(items, prop) {
    return items.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  }

  // Convierte mes numerico a nombre del mes
  toLongMonth(mes: number) {
    let mesStr = mes.toString();

    if (mes < 10) {
      mesStr = '0' + mesStr;
    }

    const objDate = new Date(mes + '/01/2000'),
      locale = 'es-mx',
      month = objDate.toLocaleString(locale, { month: 'long' });
    return month;
  }

  onClickDetalleUnidadesMensual(idAutoLinea: number, carLine: string, mes: string = '', idDepartamento: string = '') {
  
      if (this.isUnidadesDepto) {
        this.showUnidadesDepartamentoByLevel.emit(3);
      } else {
        this.showUnidades.emit(false);
        this.showDetalleUnidadesPrimerNivel.emit(false);
        this.showDetalleUnidadesSegundoNivel.emit(true);
      }

      this.detalleUnidadesNameSegundoNivel.emit(mes);
      this.detalleUnidadesValueSegundoNivel.emit(carLine); // Revisar ya que son 3 que usan el mismo valor
      this.detalleUnidadesConceptoSegundoNivel.emit(carLine);
      this.carLine.emit(carLine);
      this.mesAcumulado.emit(mes);
      this.idAutoLinea.emit(idAutoLinea);
      this.idDepartamento.emit(idDepartamento);
  }

  // Ordenamiento de tabla
  onSorted(event: ColumnSortedEvent, obj: Object[]) {
    // Se pasa como referencia el objeto que se quiere ordenar
    obj.sort(function (a, b) {
      if (event.sortDirection === 'asc') {
        return a[event.sortColumn] - b[event.sortColumn];
      } else {
        return b[event.sortColumn] - a[event.sortColumn];
      }
    });
  }
}
