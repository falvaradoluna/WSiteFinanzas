import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
//Interfaces
import { IEfectivoSituacion } from '../efectivo-y-situacion-financiera';
import { IEstadoSituacion } from '../estado-Situacion-Financiera';
//Servicio
import { InternosService } from '../internos.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private _service: InternosService, private _spinnerService: NgxSpinnerService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.getEfectivoSituacion();
  }
  
  ngOnInit() {
  }

  getEfectivoSituacion(): void {
    this._spinnerService.show(); 
    if (this.selectedTipoReporte.toString() === '4') {
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
      this._service.get_EstadoSituacion({
        idTipoReporte: this.selectedTipoReporte,
        idAgencia: this.selectedCompania,
        anio: this.anio
      })
        .subscribe(estadoSituacion => {
          this.estadoSituacion = estadoSituacion;
          this.fixedHeader.emit('tableEstado');
          this._spinnerService.hide(); 
        },
        error => this.errorMessage.emit(error));
    }
  }

}
