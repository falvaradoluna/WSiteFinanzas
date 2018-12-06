import { Input,Component, OnInit } from '@angular/core';
import { IPlantillaDetalle } from '../../../../../models/reports/reportePlantillaPlantaDetalle';
// import { CatalogoService } from '../../../../../services/catalogo.service';
import { IDepartamentoUnidad } from '../../../../../models/catalog/departamentoUnidad';
// import { ReportesService } from '../../../../../services/Reportes.service';
import { IDepartamento } from '../../../../../models/catalog/departamento';
import { IClasificacion } from '../../../../../models/reports/reportePlantaClasificacion';
import { IConceptoEstadoResultado } from '../../../../../models/reports/ConceptoEstadoDeResultado';
import { IReportePlantaTextAlign } from '../../../../../models/reports/reportePlantaTextAlign';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IPlanta } from '../planta';
import { by } from 'protractor';
@Component({
  selector: 'wsf-nissan',
  templateUrl: './nissan.component.html',
  styleUrls: ['./nissan.component.scss']
})
export class NissanComponent extends IPlanta implements OnInit {

  @Input() selectedCompany:      number;
  @Input() rowName : string;
  @Input() modelEtiqueta: any = [];
  @Input() departmentsUnit: IDepartamentoUnidad[] = [];
  @Input() departamentos:IDepartamento[] = []
  @Input() reporteClasificacion: IClasificacion[] = [];
  @Input() conceptOfResults: IConceptoEstadoResultado[] = [];
  @Input() reportePlantaTextAlign: IReportePlantaTextAlign[] = [];
  @Input() dataDetails: IPlantillaDetalle[] = [];
  @Input() modalReference: NgbModalRef;
  @Input() selectedPlantillaDetalle: any[];

  plantillaDetalle = {} as IPlantillaDetalle;
  tipoReportes: any[];
  periodType: any[];
  selectedTipoReporte = "0";
  dropdownList = [];
  selectedDeptos = [];
  selectedER = [];
  dropdownSettings = {};
  dropdownSettingsEr = {};

  errorMessage: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.loadTypeReport();
    this.loadPeriodType();
    this.dropdownlist();
    this.loadPartial();
  }

  loadTypeReport(): void{
    if(this.tipoReportes== undefined) {
      this.tipoReportes = [
      {id: "1",Nombre:"N/A"},
      {id: "2",Nombre:"Unidades"},
      {id: "3",Nombre:"Contabilidad"},
      {id: "4",Nombre:"Clasificación"}
     ]
  }
     this.selectedTipoReporte = "0";
  }

  loadPeriodType(): void {
    this.periodType = [
      {id: "1",Nombre:"MENSUAL"},
      {id: "2",Nombre:"ACUMULADO"}
     ]
     this.plantillaDetalle.idTipoPeriodo = 0;
  }

  onItemSelect (item:any) {
    console.log(item);
  }

  onSelectAll (items: any) {
    console.log(items);
  }

  saveDetailsConfigurationTemplate(): void{
    if(!(this.isValid()))
    return;
    // this.modelEtiqueta[this.plantillaDetalle.etiqueta][0].etiquetaDetalle = false;

    this.saveConfigTemplate(this.dataDetails,
                            this.plantillaDetalle,
                            this.selectedPlantillaDetalle,
                            this.selectedER,
                            this.selectedDeptos,
                            this.modelEtiqueta
                            ,this.modalReference
                            )
    //Informacion BD
    // if(this.dataDetails.length > 0) {
    //     var details = this.dataDetails.find(x=> x.etiqueta == this.plantillaDetalle.etiqueta)
    //     if(details != undefined) {
    //       details.ValorEtiqueta = this.plantillaDetalle.ValorEtiqueta;
    //       details.valorEtiquetaDetalle = this.plantillaDetalle.valorEtiquetaDetalle;
    //       details.idSeccionReporte = this.plantillaDetalle.idSeccionReporte;
    //       details.idOrigen = this.plantillaDetalle.idOrigen;
    //       details.idDepartamento = this.plantillaDetalle.idDepartamento;
    //       details.idEstadoResultadosI = this.plantillaDetalle.idEstadoResultadosI;
    //       details.idClasificacionPlanta = this.plantillaDetalle.idClasificacionPlanta;
    //       details.idAlieacionText = this.plantillaDetalle.idAlieacionText;
    //       details.idTipoPeriodo = this.plantillaDetalle.idTipoPeriodo;
    //     } else {
    //       this.dataDetails.push({

    //                               idEtiqueta: this.plantillaDetalle.idEtiqueta,
    //                               etiqueta: this.plantillaDetalle.etiqueta,
    //                               ValorEtiqueta: this.plantillaDetalle.ValorEtiqueta,
    //                               valorEtiquetaDetalle: this.plantillaDetalle.valorEtiquetaDetalle,
    //                               idSeccionReporte: this.plantillaDetalle.idSeccionReporte,
    //                               idOrigen: this.plantillaDetalle.idOrigen,
    //                               idDepartamento: this.plantillaDetalle.idDepartamento,
    //                               idEstadoResultadosI: this.plantillaDetalle.idEstadoResultadosI,
    //                               idClasificacionPlanta: this.plantillaDetalle.idClasificacionPlanta,
    //                               idAlieacionText: this.plantillaDetalle.idAlieacionText,
    //                               idTipoPeriodo: this.plantillaDetalle.idTipoPeriodo,
    //                               idEstadoDePerdidaYGanancia: null,
    //                               otro: null
    //                           });
    //     }
    // }else { //local

    //   let select = this.selectedPlantillaDetalle.find(x=>x.etiqueta == this.plantillaDetalle.etiqueta);
    //   if(select != undefined){
    //     select.ValorEtiqueta = this.plantillaDetalle.ValorEtiqueta;
    //     select.valorEtiquetaDetalle = this.plantillaDetalle.valorEtiquetaDetalle;
    //     select.idSeccionReporte = this.plantillaDetalle.idSeccionReporte;
    //     select.idOrigen = this.plantillaDetalle.idOrigen;
    //     select.idDepartamento = this.plantillaDetalle.idDepartamento;
    //     select.idEstadoResultadosI = this.plantillaDetalle.idEstadoResultadosI;
    //     select.idClasificacionPlanta = this.plantillaDetalle.idClasificacionPlanta;
    //     select.idAlieacionText = this.plantillaDetalle.idAlieacionText;
    //     select.idTipoPeriodo = this.plantillaDetalle.idTipoPeriodo;
    //   } else {
    //     var obj = {}
    //     obj =
    //     {
    //       "etiqueta" : this.plantillaDetalle.etiqueta,
    //       "valorEtiquetaDetalle": this.plantillaDetalle.valorEtiquetaDetalle,
    //       "idSeccionReporte": this.plantillaDetalle.idSeccionReporte,
    //       "idDepartamento": this.selectedDeptos,
    //       "idOrigen": this.plantillaDetalle.idOrigen,
    //       "idEstadoResultadosI": this.selectedER,
    //       "idClasificacionPlanta": this.plantillaDetalle.idClasificacionPlanta,
    //       "idAlieacionText": this.plantillaDetalle.idAlieacionText,
    //       "idTipoPeriodo": this.plantillaDetalle.idTipoPeriodo
    //     }
    //     this.selectedPlantillaDetalle.push(obj);
    //   }
    // }

    // this.modelEtiqueta[this.plantillaDetalle.etiqueta][0].etiquetaDetalle = true;
    // this.modalReference.close();
  }

  private loadPartial(): void {
      this.loadPartials(this.rowName,this.dataDetails,this.plantillaDetalle,this.selectedPlantillaDetalle,this.modelEtiqueta);
      // this.defaultDetailsExcel();
      // let details = this.dataDetails.find(x=> x.idEtiqueta == this.modelEtiqueta[this.rowName][0].id);
      // if(details != undefined){ //se verifica el valor de la BD
      //     if(details.idEtiqueta == 0){
      //       let detailsForLabel = this.dataDetails.find(x=> x.etiqueta == this.rowName);
      //       if(detailsForLabel != undefined) {
      //         this.plantillaDetalle.ValorEtiqueta = detailsForLabel.etiqueta
      //         this.loadInfo(detailsForLabel);
      //       }
      //     } else {
      //       this.plantillaDetalle.ValorEtiqueta = details.etiqueta
      //       this.loadInfo(details);
      //     }
      // } else { // valor local
      //   let configurationLabel = this.selectedPlantillaDetalle.find(x=> x.etiqueta == this.rowName);
      //   if(configurationLabel != undefined) {
      //     configurationLabel.idEtiqueta = this.modelEtiqueta[this.rowName][0].id;
      //     configurationLabel.etiqueta = this.rowName;
      //     this.loadInfo(configurationLabel);
      //   }//else // valor de cero

      // }
  }

  private dropdownlist(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'idDepartamento',
      textField: 'descripcion',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownSettingsEr = {
      singleSelection: false,
      idField: 'idEstadoResultadosI',
      textField: 'titulo',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  // private loadInfo(dataSource: IPlantillaDetalle): void{
  //   this.plantillaDetalle.idEtiqueta = dataSource.idEtiqueta;
  //   if(dataSource.ValorEtiqueta != undefined)
  //     this.plantillaDetalle.ValorEtiqueta = dataSource.ValorEtiqueta;
  //   this.plantillaDetalle.valorEtiquetaDetalle = dataSource.valorEtiquetaDetalle;

  //   this.plantillaDetalle.idSeccionReporte = dataSource.idSeccionReporte;
  //   this.plantillaDetalle.idOrigen = dataSource.idOrigen;
  //   this.plantillaDetalle.idDepartamento = dataSource.idDepartamento;
  //   this.plantillaDetalle.idEstadoResultadosI = dataSource.idEstadoResultadosI;
  //   this.plantillaDetalle.idClasificacionPlanta = dataSource.idClasificacionPlanta;
  //   this.plantillaDetalle.idAlieacionText = dataSource.idAlieacionText;
  //   this.plantillaDetalle.idTipoPeriodo = dataSource.idTipoPeriodo;
  // }

  // private defaultDetailsExcel(): void {
  //   this.plantillaDetalle.idEtiqueta = this.modelEtiqueta[this.rowName][0].id;
  //   this.plantillaDetalle.etiqueta = this.rowName;
  //   this.plantillaDetalle.valorEtiquetaDetalle = '@Valor' +  String(this.rowName).replace("DosPuntos","");
  //   this.plantillaDetalle.idSeccionReporte = 0;
  //   this.plantillaDetalle.idOrigen = 0;
  //   this.plantillaDetalle.idDepartamento = [];
  //   this.plantillaDetalle.idEstadoResultadosI = [];
  //   this.plantillaDetalle.idClasificacionPlanta = 0;
  //   this.plantillaDetalle.idAlieacionText = 0;
  //   this.plantillaDetalle.idTipoPeriodo = 0;
  // }

  private isValid(): boolean{
    let valid = true;
    if(!this.plantillaDetalle.valorEtiquetaDetalle)
      valid = false;

      switch (+this.plantillaDetalle.idSeccionReporte)
      {
          case 1: //N/A
            break;
          case 2: //Unidades
             if(this.plantillaDetalle.idTipoPeriodo == 0 || this.plantillaDetalle.idOrigen == 0 || this.plantillaDetalle.idAlieacionText == 0)
                  valid = false;
            break;
          case 3: //Contabilidad
              if(this.plantillaDetalle.idDepartamento.length == 0 || this.plantillaDetalle.idEstadoResultadosI.length == 0 || this.plantillaDetalle.idTipoPeriodo == 0 || this.plantillaDetalle.idAlieacionText == 0)
                valid = false;
            break;
          case 4: //Clasificación
              if(this.plantillaDetalle.idTipoPeriodo == 0 || this.plantillaDetalle.idOrigen == 0 ||
                 this.plantillaDetalle.idClasificacionPlanta == 0 || this.plantillaDetalle.idAlieacionText == 0)
                  valid = false;
            break;
          default:
          valid = false;
              break;
      }
      return valid;
  }
}
