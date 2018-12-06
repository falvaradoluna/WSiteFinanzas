import { IPlantillaDetalle } from "../../../../models/reports/reportePlantillaPlantaDetalle";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

export class IPlanta {
  //#region C O N S T R U C T O R
    constructor(){}
  //#endregion

  //#region M E T O D O S   P U B L I C O S
  saveConfigTemplate(dataDetails: IPlantillaDetalle[],
                        plantillaDetalle = {} as IPlantillaDetalle,
                        selectedPlantillaDetalle: any[],
                        selectedER: any[],
                        selectedDeptos: any[],
                        modelEtiqueta: any[],
                        modalReference: NgbModalRef
                                     ): void{
        modelEtiqueta[plantillaDetalle.etiqueta][0].etiquetaDetalle = false;
        if(dataDetails.length > 0) {
          var details = dataDetails.find(x=> x.etiqueta == plantillaDetalle.etiqueta)
          if(details != undefined) {
            details.ValorEtiqueta = plantillaDetalle.ValorEtiqueta;
            details.valorEtiquetaDetalle = plantillaDetalle.valorEtiquetaDetalle;
            details.idSeccionReporte = plantillaDetalle.idSeccionReporte;
            details.idOrigen = plantillaDetalle.idOrigen;
            details.idDepartamento = plantillaDetalle.idDepartamento;
            details.idEstadoResultadosI = plantillaDetalle.idEstadoResultadosI;
            details.idClasificacionPlanta = plantillaDetalle.idClasificacionPlanta;
            details.idAlieacionText = plantillaDetalle.idAlieacionText;
            details.idTipoPeriodo = plantillaDetalle.idTipoPeriodo;
        } else {
          dataDetails.push({

                                  idEtiqueta: plantillaDetalle.idEtiqueta,
                                  etiqueta: plantillaDetalle.etiqueta,
                                  ValorEtiqueta: plantillaDetalle.ValorEtiqueta,
                                  valorEtiquetaDetalle: plantillaDetalle.valorEtiquetaDetalle,
                                  idSeccionReporte: plantillaDetalle.idSeccionReporte,
                                  idOrigen: plantillaDetalle.idOrigen,
                                  idDepartamento: plantillaDetalle.idDepartamento,
                                  idEstadoResultadosI: plantillaDetalle.idEstadoResultadosI,
                                  idClasificacionPlanta: plantillaDetalle.idClasificacionPlanta,
                                  idAlieacionText: plantillaDetalle.idAlieacionText,
                                  idTipoPeriodo: plantillaDetalle.idTipoPeriodo,
                                  idEstadoDePerdidaYGanancia: null,
                                  otro: null
                              });
          }
        }else { //local
      
          let select = selectedPlantillaDetalle.find(x=>x.etiqueta == plantillaDetalle.etiqueta);
          if(select != undefined){
            select.ValorEtiqueta = plantillaDetalle.ValorEtiqueta;
            select.valorEtiquetaDetalle = plantillaDetalle.valorEtiquetaDetalle;
            select.idSeccionReporte = plantillaDetalle.idSeccionReporte;
            select.idOrigen = plantillaDetalle.idOrigen;
            select.idDepartamento = plantillaDetalle.idDepartamento;
            select.idEstadoResultadosI = plantillaDetalle.idEstadoResultadosI;
            select.idClasificacionPlanta = plantillaDetalle.idClasificacionPlanta;
            select.idAlieacionText = plantillaDetalle.idAlieacionText;
            select.idTipoPeriodo = plantillaDetalle.idTipoPeriodo;
          } else {
            var obj = {}
            obj =
            {
              "etiqueta" : plantillaDetalle.etiqueta,
              "valorEtiquetaDetalle": plantillaDetalle.valorEtiquetaDetalle,
              "idSeccionReporte": plantillaDetalle.idSeccionReporte,
              "idDepartamento": selectedDeptos,
              "idOrigen": plantillaDetalle.idOrigen,
              "idEstadoResultadosI": selectedER,
              "idClasificacionPlanta": plantillaDetalle.idClasificacionPlanta,
              "idAlieacionText": plantillaDetalle.idAlieacionText,
              "idTipoPeriodo": plantillaDetalle.idTipoPeriodo
            }
            selectedPlantillaDetalle.push(obj);
          } 
        }
        modelEtiqueta[plantillaDetalle.etiqueta][0].etiquetaDetalle = true;
        modalReference.close();
    }

  loadPartials(rowName : string,
                dataDetails: IPlantillaDetalle[],
                plantillaDetalle = {} as IPlantillaDetalle,
                selectedPlantillaDetalle: any[],
                modelEtiqueta: any[]): void {
      this.defaultDetailsExcel(rowName,plantillaDetalle,modelEtiqueta); 
      let details = dataDetails.find(x=> x.idEtiqueta == modelEtiqueta[rowName][0].id);
      if(details != undefined){ //se verifica el valor de la BD
          if(details.idEtiqueta == 0){
            let detailsForLabel = dataDetails.find(x=> x.etiqueta == rowName);
            if(detailsForLabel != undefined) {
              plantillaDetalle.ValorEtiqueta = detailsForLabel.etiqueta
              this.loadInfo(detailsForLabel,plantillaDetalle);
            }
          } else {
            plantillaDetalle.ValorEtiqueta = details.etiqueta
            this.loadInfo(details,plantillaDetalle);
          }
      } else { // valor local
        let configurationLabel = selectedPlantillaDetalle.find(x=> x.etiqueta == rowName);
        if(configurationLabel != undefined) {
          configurationLabel.idEtiqueta = modelEtiqueta[rowName][0].id;
          configurationLabel.etiqueta = rowName;
          this.loadInfo(configurationLabel,plantillaDetalle);
        }//else // valor de cero
      }
    }
  //#endregion
  
  //#region  M E T O D O S   P R I V A D O S
  private defaultDetailsExcel(rowName : string, plantillaDetalle = {} as IPlantillaDetalle,modelEtiqueta: any[]): void {
    plantillaDetalle.idEtiqueta = modelEtiqueta[rowName][0].id;
    plantillaDetalle.etiqueta = rowName;
    plantillaDetalle.valorEtiquetaDetalle = '@Valor' +  rowName.replace("DosPuntos","");
    plantillaDetalle.idSeccionReporte = 0;
    plantillaDetalle.idOrigen = 0;
    plantillaDetalle.idDepartamento = [];
    plantillaDetalle.idEstadoResultadosI = [];
    plantillaDetalle.idClasificacionPlanta = 0;
    plantillaDetalle.idAlieacionText = 0;
    plantillaDetalle.idTipoPeriodo = 0;
  }

  private loadInfo(dataSource: IPlantillaDetalle, plantillaDetalle = {} as IPlantillaDetalle): void{
    plantillaDetalle.idEtiqueta = dataSource.idEtiqueta;
    if(dataSource.ValorEtiqueta != undefined)
      plantillaDetalle.ValorEtiqueta = dataSource.ValorEtiqueta;
    plantillaDetalle.valorEtiquetaDetalle = dataSource.valorEtiquetaDetalle;

    plantillaDetalle.idSeccionReporte = +dataSource.idSeccionReporte;
    plantillaDetalle.idOrigen = dataSource.idOrigen;
    plantillaDetalle.idDepartamento = dataSource.idDepartamento;
    plantillaDetalle.idEstadoResultadosI = dataSource.idEstadoResultadosI;
    plantillaDetalle.idClasificacionPlanta = dataSource.idClasificacionPlanta;
    plantillaDetalle.idAlieacionText = dataSource.idAlieacionText;
    plantillaDetalle.idTipoPeriodo = dataSource.idTipoPeriodo;
  }
  //#endregion
    
}