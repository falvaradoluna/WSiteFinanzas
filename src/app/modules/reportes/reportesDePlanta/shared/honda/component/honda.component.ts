import { Component, OnInit, Input } from '@angular/core';
import { IPlantillaDetalle } from '../../../../../../models/reports/reportePlantillaPlantaDetalle';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IPlanta } from '../../planta';


@Component({
  selector: 'wsf-honda',
  templateUrl: './honda.component.html',
  styleUrls: ['./honda.component.scss']
})
export class HondaComponent extends IPlanta implements OnInit {
  @Input() modelEtiqueta: any = [];
  @Input() modalReference: NgbModalRef;
  @Input() selectedPlantillaDetalle: any[];
  @Input() dataDetails: IPlantillaDetalle[] = [];
  @Input() rowName : string;
  tipoReportes: any[];
  plantillaDetalle = {} as IPlantillaDetalle;
  
  constructor() { super(); }


  ngOnInit() {
    this.loadType();
    this.loadPartial();
  }
  
  loadType(): void {
    this.tipoReportes = [
      {id: "1",Nombre:"Clasificación HONDA"},
      {id: "2",Nombre:"Contabilidad"}
     ]
  }

  saveDetailsConfigurationTemplate(): void{
    if(!(this.isValid()))
      return;
    
    this.saveConfigTemplate(this.dataDetails,
                            this.plantillaDetalle,
                            this.selectedPlantillaDetalle,
                            undefined, //this.selectedER,
                            undefined,//this.selectedDeptos,
                            this.modelEtiqueta
                            ,this.modalReference)
  }

  private loadPartial(): void {
    this.loadPartials(this.rowName,this.dataDetails,this.plantillaDetalle,this.selectedPlantillaDetalle,this.modelEtiqueta);
  }

  private isValid(): boolean{
    let valid = true;
    if(!this.plantillaDetalle.valorEtiquetaDetalle)
        return false;

      switch (+this.plantillaDetalle.idSeccionReporte)
      {
          case 1: 
            break;
          case 2: 
            break;
          case 3: 
            break;
          case 4: 
            break;
          default:
            valid = false;
              break;
      }
      return valid;
  }
}
