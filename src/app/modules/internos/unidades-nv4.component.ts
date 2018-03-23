import { Component, OnInit, Input } from '@angular/core';
import { InternosService } from './internos.service';
import { ISeries } from './series';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'int-unidades-nv4',
  templateUrl: './unidades-nv4.component.html',
  styleUrls: ['./internos.component.scss']
})
export class UnidadesNv4Component implements OnInit {

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
  @Input() selectedIdDepartamento: number;


  detalleUnidadesSeries: Observable<ISeries[]>;

  constructor(private _service: InternosService) { }

  ngOnInit() {
    this.detalleUnidadesSeries = this.getDetalleUnidadesSeries();
  }

  getDetalleUnidadesSeries(): Observable<ISeries[]> {
    return this._service.getDetalleUnidadesSeries({
      idCompania: this.selectedIdSucursal > 0 ? 0 : this.selectedCompania,
      idSucursal: this.selectedIdSucursal > 0 ? this.selectedIdSucursal : 0,
      idOrigen: this.idOrigen,
      idPestana: this.selectedIdDepartamento,
      periodoYear: +this.anio,
      periodoMes: +this.mes,
      unidadDescripcion: this.tipoAuto,
      isUnidadesDepto: this.isUnidadesDepto
    });
  }
}
