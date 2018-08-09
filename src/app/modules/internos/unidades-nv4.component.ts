import { Component, OnInit, Input } from '@angular/core';
import { ISeries } from '../../models/reports/series';

import { InternosService } from './internos.service';
import { Observable } from 'rxjs/Observable';
import { ColumnSortedEvent } from '../../shared/index';
import { NgxSpinnerService } from 'ngx-spinner';
import { ITipoUnidadOtros } from '../../models/reports/tipo-unidad-otros';

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
  detalleUnidadesServicioHyP: ITipoUnidadOtros[] = [];
  idDepartamento: number = 0;
  idCarline: number = 0;
  idOrdenTipo: number = 0;

  constructor(private _service: InternosService, private _spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    //this.detalleUnidadesSeries = this.getDetalleUnidadesSeries();
    this._spinnerService.show(); 
    setTimeout(() => { this._spinnerService.hide(); }, 5000);
    if( typeof this.idReporte !== "undefined" && (this.idReporte == '16' || this.idReporte == '742'))
    {
      this.idDepartamento = parseInt(this.idReporte);      
      this.idCarline = parseInt(this.mesAcumuladoNv3);
      this.idOrdenTipo = parseInt(this.tipoAuto);   
      this.getDetalleUnidadesServicioHyP();
    } else {
      this.getDetalleUnidadesSeries()
    }
  }

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

// ==========================================
//  Obtiene el detalle Nivel 4 HP y Servicios (Detalle)
// ==========================================
  getDetalleUnidadesServicioHyP(): void {
    this._service.getDetalleUnidadesServicioHyP({
      idCompania: this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      idDepartamento: this.idDepartamento,
      idCarline: this.idCarline,
      ordenTipoId: this.idOrdenTipo
    })
      .subscribe(detalleUnidadesSeries => {
        this.detalleUnidadesServicioHyP = detalleUnidadesSeries;
        this._spinnerService.hide();
      },
      error => this.errorMessage = <any>error);
  }

  //LAGP
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
