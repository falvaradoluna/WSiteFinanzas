import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../../services/Reportes.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportePlantaSheet } from '../../../../models/reports/reportePlantaSheet';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IData, IReportePlantaConfigSheet } from '../../../../models/reports/reportePlantaConfigExcel';
import { IReportePlantaConfigExcel } from '../../../../models/reports/reportePlantaConfigExcel'
import swal from 'sweetalert2';
import { ICompania } from '../../../../models/catalog/compania';
import { IPlantillaDetalle } from '../../../../models/reports/reportePlantillaPlantaDetalle'
import { IReportePlantaTextAlign } from '../../../../models/reports/reportePlantaTextAlign';
import { CatalogoService } from '../../../../services/catalogo.service';
import { IDepartamentoUnidad } from '../../../../models/catalog/departamentoUnidad';
import { IClasificacion } from '../../../../models/reports/reportePlantaClasificacion';
// import { IConceptoEstadoResultado } from '../../../../models/administracion/conceptoEstadoResultado';
import { IDepartamento } from '../../../../models/catalog/departamento';
import { IConceptoEstadoResultado } from '../../../../models/reports/ConceptoEstadoDeResultado';

@Component({
  selector: 'wsf-configuracion-plantilla',
  templateUrl: './configuracion-plantilla.component.html',
  styleUrls: ['./configuracion-plantilla.component.scss']
})
export class ConfiguracionPlantillaComponent implements OnInit {
  modalReference: NgbModalRef;
  errorMessage: any;
  rowsTemplate: Array<IReportePlantaConfigExcel> = [];
  // confTemplate: IReportePlantaConfigSheet;
  sheets: Array<IReportePlantaSheet> = [];
  dataSheet: Array<IData> =[];
  reportePlantaTextAlign: IReportePlantaTextAlign[]=[];
  plantillaDetalle = {} as IPlantillaDetalle;
  selectedPlantillaDetalle:any = [];
  companies:ICompania[] = [];
  modelEtiqueta: any= [];//any = {}
  selectedHoja = 0;
  selectedCompany = 0;
  fileToUpload: File;
  nameTemplate: string;
  detailsFile: any = [];
  archivoTemp: string;
  tipoReportes: any[];
  selectedTipoReporte = "0";
  periodType:any[];
  selectPeriodType = "0"
  idTemplate: number = 0;
  dataDetails: IPlantillaDetalle[] = [];
  departmentsUnit: IDepartamentoUnidad[] = [];
  reporteClasificacion: IClasificacion[]=[];
  conceptOfResults: IConceptoEstadoResultado[]=[];
  departamentos:IDepartamento[] =[]

  //#region C O N T R U C T O R
  constructor(private _reportesService: ReportesService, 
    private _catalogoService: CatalogoService,
    private _spinnerService: NgxSpinnerService,
    private _modal: NgbModal) { }
  //#endregion
  
  //#region E V E N T O S
  ngOnInit() {
    this.loadCompany();
    this.loadTypeReport();
    this.loadTextAlign();
    this.loadDepartmentUnit();
    this.loadClassification();
    this.loadPeriodType();
    this.loadConceptOfResults();
    // this.loadDepartment();
  }

  loadCompany() :void {
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._reportesService.getCompanias({ idUsuario: usuario.id }).subscribe(company  => {
      this.companies = company;
    },error => this.errorMessage = <any>error);
  }

  loadTypeReport(): void{
    this.tipoReportes = [
      {id: "1",Nombre:"N/A"},
      {id: "2",Nombre:"Unidades"},
      {id: "3",Nombre:"Contabilidad"},
      {id: "4",Nombre:"Clasificación"}
     ]
     this.selectedTipoReporte = "0";
  }

  loadDepartmentUnit(): void {
    this._catalogoService.getDepartamentoUnidad().subscribe(departments  => {
      this.departmentsUnit = departments;
    },error => this.errorMessage = <any>error);
  }

  loadTextAlign() :void {
    this._reportesService.getAlineacionTextReportePlanta().subscribe(textAlign  => {
      this.reportePlantaTextAlign = textAlign;
    },error => this.errorMessage = <any>error);
  }

  loadClassification(): void {
    this._reportesService.getClasificacion().subscribe(calsificaciones  => {
      this.reporteClasificacion = calsificaciones;
    },error => this.errorMessage = <any>error);
  }

  loadPeriodType(): void {
    this.periodType = [
      {id: "1",Nombre:"MENSUAL"},
      {id: "2",Nombre:"ACUMULADO"}
     ]
     this.plantillaDetalle.idTipoPeriodo = 0;
  }

  loadConceptOfResults(): void {
    this._reportesService.getEstadoResultadosConcepto().subscribe(conceptos  => {
      this.conceptOfResults = conceptos;
    },error => this.errorMessage = <any>error);
  }

  loadDepartment(): void {
    
      const usuario = JSON.parse(localStorage.getItem('userLogged'));
      this._reportesService.getDepartamentoxCompaniayUsuario({
        idCompania: this.selectedCompany,
        idUsuario: usuario.id
      }).subscribe(departamentos => { 
        this.departamentos = departamentos; 
      }, error => this.errorMessage = <any>error);
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
                                    idCompania: this.selectedCompany,
                                    nombrePlatilla: this.nameTemplate,
                                    usuarioID: JSON.parse(localStorage.getItem('userLogged')).id
                                  }).subscribe(x => { 
      // this.nameTemplate = "";
      this.fileToUpload = null;
      swal('La platilla se guardo correctamente','','success')
      setTimeout(() => {
        this.loadTemplateWords();
      },1000);
      
      this._spinnerService.hide();
    }); 
  }

  onFileChanged(archivo): void {
    this.nameTemplate = "";
    if(this.selectedCompany == 0){
      this.crearForm();
      return;
    }
      
    this._spinnerService.show();
    if(archivo != null){
      this.nameTemplate = archivo.name;
      this.fileToUpload = archivo;
      archivo = null;
    }
    this.loadDepartment();
    this._reportesService.getTemplateForBrand(String(this.selectedCompany))
    .subscribe(x => {
      if(x.length > 0)
        this.nameTemplate = x[0].nombrePlatilla;
        this.changeTemplateWords();
      },error => {
      this.errorMessage = <any>error
    });
  }

  changeSheet():void {
    this.getDataTemplate();
  }

  changeTemplateWords(): void {
    this.rowsTemplate = [];
    this.modelEtiqueta = {};
    this.loadTemplateWords();
    this.getDataTemplate();
  }

  saveConfigurationTemplate(): void {
    
    var xml  = this.getXML();
    if(!xml) 
      return;
    
    this._spinnerService.show();  
    this._reportesService.getSaveConfigurationTemplate({idPlantilla: this.idTemplate, xmlTemplate : xml, idHoja : this.selectedHoja})
    .subscribe(x => {
      var nameSheet = this.sheets.filter(sheet=>sheet.id == this.selectedHoja)[0].sheet
      swal('La configuración de la hoja '+ nameSheet +' se guardo correctamente','','success')
      this._spinnerService.hide();
      },error => {
      this.errorMessage = <any>error
    });
    
  }

  saveDetailsConfigurationTemplate(): void{
    if(!(this.isValid()))
    return;

    this.modelEtiqueta[this.plantillaDetalle.ValorEtiqueta][0].etiquetaDetalle = false;
    if(!(this.plantillaDetalle.idEtiqueta > 0)) {
      let select = this.selectedPlantillaDetalle.find(x=>x.ValorEtiqueta == this.plantillaDetalle.ValorEtiqueta)   
      if(select != undefined){
        select.idEtiqueta = this.plantillaDetalle.idEtiqueta;
        select.ValorEtiqueta = this.plantillaDetalle.ValorEtiqueta;
        select.valorEtiquetaDetalle = this.plantillaDetalle.valorEtiquetaDetalle;
        select.idSeccionReporte = this.plantillaDetalle.idSeccionReporte;
        select.idOrigen = this.plantillaDetalle.idOrigen;
        select.idDepartamento = this.plantillaDetalle.idDepartamento;
        select.idEstadoResultadosI = this.plantillaDetalle.idEstadoResultadosI;
        select.idClasificacionPlanta = this.plantillaDetalle.idClasificacionPlanta;
        select.idAlieacionText = this.plantillaDetalle.idAlieacionText;
      }else
        this.selectedPlantillaDetalle.push(this.plantillaDetalle);
      // this.plantillaDetalle = {} as IPlantillaDetalle
    } else {
      var details = this.dataDetails.find(x=> x.idEtiqueta == this.plantillaDetalle.idEtiqueta)
      details.valorEtiquetaDetalle = this.plantillaDetalle.valorEtiquetaDetalle;
      details.idAlieacionText = this.plantillaDetalle.idAlieacionText;
      details.idOrigen = this.plantillaDetalle.idOrigen;
      details.idSeccionReporte = this.plantillaDetalle.idSeccionReporte;
      details.idEstadoResultadosI = this.plantillaDetalle.idEstadoResultadosI;
      details.idDepartamento = this.plantillaDetalle.idDepartamento;
     }
     this.modelEtiqueta[this.plantillaDetalle.ValorEtiqueta][0].etiquetaDetalle = true;
    this. modalReference.close();
  } 
  //#endregion
  
  //#region M E T O D O S
  showModal(modalDetails,rowTemplate): void{

  let details = this.dataDetails.find(x=> x.idEtiqueta == this.modelEtiqueta[rowTemplate.nameColumn][0].id);
    if(details != undefined){ //se verifica el valor de la BD
        this.plantillaDetalle.ValorEtiqueta = details.ValorEtiqueta
        this.loadInfo(details);
    } else { // valor local
      let configurationLabel = this.selectedPlantillaDetalle.find(x=> x.ValorEtiqueta == rowTemplate.nameColumn);
      if(configurationLabel != undefined) {
        configurationLabel.idEtiqueta = this.modelEtiqueta[rowTemplate.nameColumn][0].id;
        configurationLabel.ValorEtiqueta = rowTemplate.nameColumn;
        this.loadInfo(configurationLabel);
      }else // valor de cero
        this.defaultDetailsExcel(rowTemplate);
    }
    this.modalReference =  this._modal.open(modalDetails);
  }

  private loadTemplateWords(): void  {
    
    this._reportesService.getReportPlant(String(this.selectedCompany)).subscribe(confTemplate  => {
      // this.confTemplate = confTemplate
      if(confTemplate != null){
        this.sheets = confTemplate.sheet;
        this.dataSheet = confTemplate.data,
        this.idTemplate = confTemplate.idTemplate,
        this.dataDetails = confTemplate.dataDetails
        this.getDataTemplate();
      }else{
        // swal('No tiene una plantilla configurada','','warning')
       this.crearForm();
      }
      this._spinnerService.hide();
   },error => this.errorMessage = <any>error);
  }  

  private loadInfo(dataSource): void{
    this.plantillaDetalle.idEtiqueta = dataSource.idEtiqueta;
    this.plantillaDetalle.ValorEtiqueta = dataSource.ValorEtiqueta;
    this.plantillaDetalle.valorEtiquetaDetalle = dataSource.valorEtiquetaDetalle;

    this.plantillaDetalle.idSeccionReporte = dataSource.idSeccionReporte;
    this.plantillaDetalle.idOrigen = dataSource.idOrigen;
    this.plantillaDetalle.idDepartamento = dataSource.idDepartamento;
    this.plantillaDetalle.idEstadoResultadosI = dataSource.idEstadoResultadosI;
    this.plantillaDetalle.idClasificacionPlanta = dataSource.idClasificacionPlanta;
    this.plantillaDetalle.idAlieacionText = dataSource.idAlieacionText;
    this.plantillaDetalle.idTipoPeriodo = dataSource.idTipoPeriodo;;
  }

  private getDataTemplate(): void{
    this.rowsTemplate = [];
    this.modelEtiqueta = [];
    this.dataSheet.filter(sheet=> sheet.idHoja == this.selectedHoja).forEach(row =>{
      if(row.Etiqueta != "" && this.rowsTemplate.findIndex(x=> x.nameColumn == row.Etiqueta) == -1) {
          this.rowsTemplate.push({nameColumn : row.Etiqueta})
          this.modelEtiqueta[row.Etiqueta] = [{"ValorEtiqueta":row.ValorEtiqueta, "idHoja": row.idHoja, "id": row.id, "etiquetaDetalle" : row.etiquetaDetalle }];
        }
    })
  }

  private crearForm(): void{
    this.sheets = [];
    this.rowsTemplate = [];
    this.modelEtiqueta = [];
    this.selectedHoja = 0;
  }

  private defaultDetailsExcel(rowTemplate): void {
    this.plantillaDetalle.idEtiqueta = this.modelEtiqueta[rowTemplate.nameColumn][0].id;
    this.plantillaDetalle.ValorEtiqueta = rowTemplate.nameColumn;
    this.plantillaDetalle.valorEtiquetaDetalle = '@Valor' +  String(rowTemplate.nameColumn).replace("DosPuntos","");

    this.plantillaDetalle.idSeccionReporte = 0;
    this.plantillaDetalle.idOrigen = 0;
    this.plantillaDetalle.idDepartamento = 0;
    this.plantillaDetalle.idEstadoResultadosI = 0;
    this.plantillaDetalle.idClasificacionPlanta = 0;
    this.plantillaDetalle.idAlieacionText = 0;
    this.plantillaDetalle.idTipoPeriodo = 0;
  }
  //#endregion
  
  //#region F U N C I O N E S
  private getXML(): String {
    let selectForm = this.selectedPlantillaDetalle;
    let valueCompleted = true;
    let detailsValueCompleted = true;
    var templateExcel = "<template>"
    Object.getOwnPropertyNames(this.modelEtiqueta).forEach(column => {
      if(column != "length"){


      if(!this.modelEtiqueta[column][0].ValorEtiqueta || !valueCompleted)
        valueCompleted  = false;



      templateExcel += "<row>";
      templateExcel += "<idHoja>" + this.modelEtiqueta[column][0].idHoja + "</idHoja>";
      templateExcel += "<idPlantilla>" + this.dataSheet[0].idPlantilla+ "</idPlantilla>";
      templateExcel += "<etiqueta>" + column + "</etiqueta>";
      templateExcel += "<valor>" + this.modelEtiqueta[column][0].ValorEtiqueta + "</valor>";

      let details = selectForm.find(x=> x.ValorEtiqueta == column); 


      if (details != undefined) {
        templateExcel += "<valorEtiquetaDetalle>" + 
                            (details.valorEtiquetaDetalle != undefined?
                              (
                                (!details.valorEtiquetaDetalle)? 
                                    ""
                                  : 
                                    details.valorEtiquetaDetalle 
                                ) 
                            : 
                              "")
                      + "</valorEtiquetaDetalle>";
        templateExcel += "<idSeccionReporte>" + 
                          (details.idSeccionReporte != undefined?
                            ((!details.idSeccionReporte)? 
                                ""
                              : 
                                details.idSeccionReporte
                            ) 
                          :
                            "")
                      + "</idSeccionReporte>"
        templateExcel += "<idOrigen>" + 
                          (details.idOrigen != undefined?
                            ((!details.idOrigen)? 
                              ""
                            : 
                              details.idOrigen 
                            )
                          :
                            "")
                      + "</idOrigen>"
        templateExcel += "<idDepartamento>" + 
                          (details.idDepartamento != undefined?
                            ((!details.idDepartamento)? 
                              ""
                            : 
                              details.idDepartamento 
                            )
                          :
                            "")
                      + "</idDepartamento>"
        templateExcel += "<idEstadoResultadosI>" + 
                          (details.idEstadoResultadosI != undefined?
                            ((!details.idEstadoResultadosI)? 
                              ""
                            : 
                              details.idEstadoResultadosI 
                            )
                          :
                            "")
                      + "</idEstadoResultadosI>"
        templateExcel += "<idClasificacionPlanta>" + 
                          (details.idClasificacionPlanta != undefined?
                            ((!details.idClasificacionPlanta)? 
                              ""
                            : 
                              details.idClasificacionPlanta 
                            )
                          :
                            "")
                      + "</idClasificacionPlanta>"
        templateExcel += "<idAlieacionText>" + 
                          (details.idAlieacionText != undefined?
                            ((!details.idAlieacionText)? 
                              ""
                            : 
                              details.idAlieacionText 
                            )
                          :
                            "")
                      + "</idAlieacionText>"
        templateExcel += "<idTipoPeriodo>" + 
                          (details.idTipoPeriodo != undefined?
                            ((!details.idTipoPeriodo)? 
                              ""
                            : 
                              details.idTipoPeriodo 
                            )
                          :
                            "")
                      + "</idTipoPeriodo>"
      } else {
        if(detailsValueCompleted)
          detailsValueCompleted= false;
      }
      templateExcel += "</row>";
      }  
    });
    templateExcel += "</template>"
    return (valueCompleted && detailsValueCompleted) ?templateExcel : "";
  }

  private isValid(): boolean{
    if(!this.plantillaDetalle.valorEtiquetaDetalle)
      return false;

    if(this.plantillaDetalle.idSeccionReporte == 0)
      return false;

    if(this.plantillaDetalle.idOrigen == 0 && (this.plantillaDetalle.idSeccionReporte == 2 || this.plantillaDetalle.idSeccionReporte == 4))
      return false;

    if(this.plantillaDetalle.idTipoPeriodo == 0 && (this.plantillaDetalle.idSeccionReporte == 4 || this.plantillaDetalle.idSeccionReporte == 3))
      return false;

    if(this.plantillaDetalle.idClasificacionPlanta == 0 && this.plantillaDetalle.idSeccionReporte == 4)
      return false;

    if(this.plantillaDetalle.idAlieacionText == 0 && this.plantillaDetalle.idSeccionReporte > 1)
      return false;

    if(this.plantillaDetalle.idEstadoResultadosI == 0 && this.plantillaDetalle.idSeccionReporte == 3)
      return false;

    return true;
  }

  //#endregion
}
