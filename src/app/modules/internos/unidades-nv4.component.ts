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
  @Input() anio: string;
  @Input() mes: string;
  @Input() mesAcumuladoNv3: string;
  @Input() selectedCompania: number;
  @Input() selectedSucursal: string;
  @Input() tipoAuto: string;
  @Input() idReporte: string;
  @Input() deptoFlotillas: string;

  detalleUnidadesSeries: Observable<ISeries[]>;

  constructor(private _service: InternosService) { }

  ngOnInit() {
    this.detalleUnidadesSeries = this.getDetalleUnidadesSeries();
  }

  getDetalleUnidadesSeries(): Observable<ISeries[]> {
    // Se usa como parametro de departamento el texto de Concepto del primer nivel,
    // sin las letras N o S que se le agregan al inicio
    let concepto = this.detalleUnidadesConcepto;

    if (concepto.startsWith('N ')) {
      concepto = concepto.substr(2);
    } else if (concepto.startsWith('S ')) {
      concepto = concepto.substr(2);
    }

    return this._service.getDetalleUnidadesSeries({
      idAgencia: this.selectedCompania,
      mSucursal: this.selectedSucursal,
      anio: this.anio,
      // Cuando se manda a llamar desde acumulado (lado verde) contiene el parametro de mes
      mes: this.mesAcumuladoNv3 === '' ? this.mes : this.mesAcumuladoNv3,
      departamento: concepto === 'FLOTILLAS' ? this.deptoFlotillas : concepto,
      idEstadoDeResultado: 1, // QUITAR HARD CODE CUANDO TIBERIO COMPLETE EL SP
      idReporte: this.idReporte,
      carLine: this.detalleUnidadesConceptoSegundoNivel,
      tipoAuto: this.tipoAuto
    });
  }
}
