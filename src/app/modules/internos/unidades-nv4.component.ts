import { Component, OnInit, Input } from '@angular/core';
import { ISeries } from '../../models/reports/series';

import { InternosService } from './internos.service';
import { Observable } from 'rxjs/Observable';
import { ColumnSortedEvent } from '../../shared/index';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'int-unidades-nv4',
  templateUrl: './unidades-nv4.component.html',
  styleUrls: ['./internos.component.scss']
})
export class UnidadesNv4Component implements OnInit {

  errorMessage: any;

  @Input() detalleUnidadesConcepto: string;
  @Input() detalleUnidadesConceptoSegundoNivel: string;
  @Input() idOrigen: number;
  @Input() anio: string;
  @Input() mes: string;
  @Input() mesAcumuladoNv3: string;
  @Input() selectedCompania: number;
  @Input() selectedIdSucursal: number;
  @Input() tipoAuto: string;
  @Input() idReporte: string;
  @Input() deptoFlotillas: string;

  @Input() isUnidadesDepto: boolean;
  @Input() selectedIdDepartamento: string;


  //detalleUnidadesSeries: Observable<ISeries[]>;
  detalleUnidadesSeries: ISeries[] = [];

  constructor(private _service: InternosService, private _spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    //this.detalleUnidadesSeries = this.getDetalleUnidadesSeries();
    this._spinnerService.show(); 
    setTimeout(() => { this._spinnerService.hide(); }, 5000);
    this.getDetalleUnidadesSeries()
    //console.log( "detalleUnidadesSeries", this.detalleUnidadesSeries );
  }

  // getDetalleUnidadesSeries(): Observable<ISeries[]> {
  //   return this._service.getDetalleUnidadesSeries({
  //     idCompania: this.selectedIdSucursal > 0 ? 0 : this.selectedCompania,
  //     idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
  //     idOrigen: this.idOrigen,
  //     idPestana: this.selectedIdDepartamento,
  //     periodoYear: +this.anio,
  //     periodoMes: +this.mes,
  //     unidadDescripcion: this.tipoAuto,
  //     isUnidadesDepto: this.isUnidadesDepto,
  //     idDepartamento: this.idReporte,
  //   });
  // }

  getDetalleUnidadesSeries(): void {

    this._service.getDetalleUnidadesSeries({
      idCompania: this.selectedIdSucursal > 0 ? 0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      idOrigen: this.idOrigen,
      idPestana: this.selectedIdDepartamento,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      unidadDescripcion: this.tipoAuto,
      isUnidadesDepto: this.isUnidadesDepto,
      idDepartamento: this.idReporte,
    })
      .subscribe(detalleUnidadesSeries => {
        this.detalleUnidadesSeries = detalleUnidadesSeries;
        this._spinnerService.hide();
        //this.fixedHeader('tableAcumuladoRealNv2');
      },
      error => this.errorMessage = <any>error);
  }

  //LAGP
  // Ordenamiento de tabla
  onSorted(event: ColumnSortedEvent, obj: Object[]) {
    // Se pasa como referencia el objeto que se quiere ordenar
    // console.log( "event", event );
    // console.log( "obj", obj );
    obj.sort(function (a, b) {
      if (event.sortDirection === 'asc') {
        return a[event.sortColumn] - b[event.sortColumn];
      } else {
        return b[event.sortColumn] - a[event.sortColumn];
      }
    });
  }
}
