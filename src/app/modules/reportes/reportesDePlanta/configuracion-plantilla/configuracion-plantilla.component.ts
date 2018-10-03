import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../../services/Reportes.service'
import { CatalogoService } from '../../../../services/catalogo.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportePlantaSheet } from '../../../../models/reports/reportePlantaSheet';
import { IMarca } from '../../../../models/catalog/marca';
import { IData } from '../../../../models/reports/reportePlantaConfigExcel';
import { IReportePlantaConfigExcel } from '../../../../models/reports/reportePlantaConfigExcel'
import swal from 'sweetalert2';

@Component({
  selector: 'wsf-configuracion-plantilla',
  templateUrl: './configuracion-plantilla.component.html',
  styleUrls: ['./configuracion-plantilla.component.scss']
})
export class ConfiguracionPlantillaComponent implements OnInit {
  errorMessage: any;
  rowsTemplate: Array<IReportePlantaConfigExcel> = [];
  sheets: Array<IReportePlantaSheet> = [];
  dataSheet: Array<IData> =[];
  brands: IMarca[] = [];
  modelEtiqueta: any = {}
  selectedHoja = 0;
  selectedBrand = 0;
  fileToUpload: File;
  nameTemplate: string;
  detailsFile: any = [];
  archivoTemp: string;

  //#region C O N T R U C T O R
  constructor(private _reportesService: ReportesService, 
    private _spinnerService: NgxSpinnerService,
    private _catalogoService: CatalogoService) { }
  //#endregion
  
  //#region E V E N T O S
  ngOnInit() {
    this.loadBrand();
  }

  loadBrand() :void {
    this._catalogoService.getMarca().subscribe(brand  => {
      this.brands = brand;
    },error => this.errorMessage = <any>error);
  }

  saveFile(): void {
    if(!this.nameTemplate)
      return;
      

    if(!this.fileToUpload){
      swal('Debe seleccionar una plantilla para poder guardar','','warning')
      return;
    }
      
    this._spinnerService.show();

    this._reportesService.saveFile(this.fileToUpload,
                                  {
                                    idMarca: this.selectedBrand,
                                    nombrePlatilla: this.nameTemplate,
                                    usuarioID: JSON.parse(localStorage.getItem('userLogged')).id
                                  }).subscribe(x => { 
      this.nameTemplate = "";
      this.fileToUpload = null;
      swal('La platilla se guardo correctamente','','success')
      this._spinnerService.hide();
    }); 
  }

  onFileChanged(archivo): void {
    this.nameTemplate = "";
    if(this.selectedBrand == 0){
      return;
    }
      
    this._spinnerService.show();
    if(archivo != null){
      this.nameTemplate = archivo.name;
      this.fileToUpload = archivo;
      archivo = null;
    }
    
    this._reportesService.getTemplateForBrand(String(this.selectedBrand))
    .subscribe(x => {
      if(x.length > 0)
        this.nameTemplate = x[0].nombrePlatilla;
        this.changeTemplateWords();
      },error => {
      this.errorMessage = <any>error
    });
  }

  changeTemplateWords(): void {
    this.rowsTemplate = [];
    this.modelEtiqueta = {};
    this.loadTemplateWords();
  }

  saveConfigurationTemplate(): void {
    this._spinnerService.show();
    var xml  = this.getXML();
    if(!xml) {
      this._spinnerService.hide();
      return;
    }
      
    this._reportesService.getSaveConfigurationTemplate({xmlTemplate : xml})
    .subscribe(x => {
      var nameSheet = this.sheets.filter(sheet=>sheet.id == this.selectedHoja)[0].sheet
      swal('La configuración de la hoja '+ nameSheet +' se guardo correctamente','','success')
      this._spinnerService.hide();
      },error => {
      this.errorMessage = <any>error
    });
    
  }
  //#endregion
  

  
  //#region M E T O D O S
  private loadTemplateWords(): void  {
    this._reportesService.getReportPlant(String(this.selectedBrand)).subscribe(confTemplate  => {
      if(confTemplate != null){
        this.sheets = confTemplate.sheet;
        this.dataSheet = confTemplate.data
        this.getDataTemplate();
      }else{
        swal('No tiene una plantilla configurada','','warning')
        this.sheets = [];
        this.rowsTemplate = [];
        this.modelEtiqueta = [];
      }
      this._spinnerService.hide();
     
   },error => this.errorMessage = <any>error);
  }  

  private getDataTemplate(): void{
    
    this.dataSheet.filter(sheet=> sheet.idHoja == this.selectedHoja).forEach(row =>{
      if(row.Etiqueta != "" && this.rowsTemplate.findIndex(x=> x.nameColumn == row.Etiqueta) == -1) {
          this.rowsTemplate.push({nameColumn : row.Etiqueta})
          this.modelEtiqueta[row.Etiqueta] = [{"ValorEtiqueta":row.ValorEtiqueta, "idHoja": row.idHoja}];
        }
    })
  }
  //#endregion
  
  //#region F U N C I O N E S
  private getXML(): String {
    let valueCompleted = true;

    var templateExcel = "<template>"
    Object.getOwnPropertyNames(this.modelEtiqueta).forEach(column => {
      if(!this.modelEtiqueta[column][0].ValorEtiqueta || !valueCompleted)
        valueCompleted  = false;

      templateExcel += "<row>";
      templateExcel += "<idHoja>" + this.modelEtiqueta[column][0].idHoja + "</idHoja>";
      templateExcel += "<idPlantilla>" + this.dataSheet[0].idPlantilla+ "</idPlantilla>";
      templateExcel += "<etiqueta>" + column + "</etiqueta>";
      templateExcel += "<valor>" + this.modelEtiqueta[column][0].ValorEtiqueta + "</valor>";
      
      templateExcel += "</row>";
    });
    templateExcel += "</template>"
  return valueCompleted?templateExcel : "";
  }
  //#endregion






















  












 






 

  

  

 

  createExcel(): void {
    this._reportesService.createExcel()
    .subscribe(x => {
      },error => {
      this.errorMessage = <any>error
    });
  }

  



}
