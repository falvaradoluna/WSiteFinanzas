import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDetalleUnidadesMensual } from './detalle-unidades-mensual';
import { IDetalleUnidadesAcumulado } from './detalle-unidades-acumulado';
import { ColumnSortedEvent } from '../../shared/index';
import { ITipoUnidad } from './tipo-unidad';
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
export class UnidadesNv2Component implements OnInit, OnDestroy {
  @Input() idDetalleUnidades: number;
  @Input() mes: string;
  @Input() anio: string;
  @Input() selectedCompania: number;
  @Input() selectedIdSucursal: number;
  @Input() idDetalle: number;

  @Output() showUnidades = new EventEmitter<boolean>();
  @Output() showDetalleUnidadesPrimerNivel = new EventEmitter<boolean>();
  @Output() showDetalleUnidadesSegundoNivel = new EventEmitter<boolean>();
  @Output() detalleUnidadesNameSegundoNivel = new EventEmitter<string>();
  @Output() detalleUnidadesValueSegundoNivel = new EventEmitter<string>();
  @Output() detalleUnidadesConceptoSegundoNivel = new EventEmitter<string>();
  @Output() mesAcumulado = new EventEmitter<string>();
  @Output() carLine = new EventEmitter<string>();
  @Output() idAutoLinea = new EventEmitter<number>();
  @Output() errorMessage = new EventEmitter<string>();
  // @Output() fixedHeaderId = new EventEmitter<string>();

  detalleUnidadesMensual: IDetalleUnidadesMensual[];
  detalleUnidadesAcumulado: IDetalleUnidadesAcumulado[];

  dumSubscription: Subscription;
  duaSubscription: Subscription;

  constructor(private _service: InternosService) { }

  ngOnInit() {
    if (this.idDetalleUnidades === 1) { // Mensual
      this.getDetalleUnidadesMensual();
    } else if (this.idDetalleUnidades === 2) { // Acumulado
      this.getDetalleUnidadesAcumulado();
    }
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
      idDetalle: this.idDetalle // Nuevas, usadas, etc.
    }).subscribe(
      dum => { this.detalleUnidadesMensual = dum; },
      error => { console.log(error); },
      () => {
        // Se calcula el total y se inserta en el objeto
        const total: number = this.calculaTotalMensual(this.detalleUnidadesMensual, 'cantidad');
        const t: IDetalleUnidadesMensual = {
          'IdAutoLinea': -1,
          'AutoLinea': 'Total',
          'cantidad': total,
          'CantidadSelected': false,
          'Perc': 100
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
      idDetalle: this.idDetalle // Nuevas, usadas, etc.
    }).subscribe(
      dua => { this.detalleUnidadesAcumulado = dua; },
      error => { console.log(JSON.stringify(error)); },
      () => {
        // Se calcula el total y se inserta en el objeto
        let total: number = this.calculaTotalMensual(this.detalleUnidadesAcumulado, 'enero');

        let t: IDetalleUnidadesAcumulado = {
          'IdAutoLinea': -1,
          'autoLinea': 'Total',
          'enero': total,
          'eneroPerc': 100,
          'febrero': 0,
          'marzo': 0,
          'abril': 0,
          'mayo': 0,
          'junio': 0,
          'julio': 0,
          'agosto': 0,
          'septiembre': 0,
          'octubre': 0,
          'noviembre': 0,
          'diciembre': 0
        };
        this.detalleUnidadesAcumulado.push(t);

        // Se calculan porcentajes
        this.detalleUnidadesAcumulado.forEach(dua => dua['eneroPerc'] = dua['enero'] / total * 100);
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

  onClickDetalleUnidadesMensual(idAutoLinea: number, carLine: string, mes: string = '') {
    if (carLine.trim() !== 'Total') {
      // TODO: Ocultar Suma
      this.showUnidades.emit(false);
      this.showDetalleUnidadesPrimerNivel.emit(false);
      this.showDetalleUnidadesSegundoNivel.emit(true);
      this.detalleUnidadesNameSegundoNivel.emit(mes);
      this.detalleUnidadesValueSegundoNivel.emit(carLine); // Revisar ya que son 3 que usan el mismo valor
      this.detalleUnidadesConceptoSegundoNivel.emit(carLine);
      this.carLine.emit(carLine);
      this.mesAcumulado.emit(mes);
      this.idAutoLinea.emit(idAutoLinea);
    }
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
