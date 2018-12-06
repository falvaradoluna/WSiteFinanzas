import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../../services/Reportes.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportePlantaSheet } from '../../../../models/reports/reportePlantaSheet';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IData } from '../../../../models/reports/reportePlantaConfigExcel';
import { IReportePlantaConfigExcel } from '../../../../models/reports/reportePlantaConfigExcel'
import swal from 'sweetalert2';
import { ICompania } from '../../../../models/catalog/compania';
import { IPlantillaDetalle } from '../../../../models/reports/reportePlantillaPlantaDetalle'
import { IReportePlantaTextAlign } from '../../../../models/reports/reportePlantaTextAlign';
import { CatalogoService } from '../../../../services/catalogo.service';
import { IDepartamentoUnidad } from '../../../../models/catalog/departamentoUnidad';
import { IClasificacion } from '../../../../models/reports/reportePlantaClasificacion';
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
  companies:ICompania[] = [];
  modelEtiqueta: any= [];//any = {}
  selectedHoja = 0;
  selectedCompany = 0;
  fileToUpload: File;
  nameTemplate: string;
  detailsFile: any = [];
  archivoTemp: string;
  sheets: Array<IReportePlantaSheet> = [];
  dataSheet: Array<IData> =[];
  plantillaDetalle = {} as IPlantillaDetalle;
  selectPeriodType = "0"
  idTemplate: number = 0;
  dataDetails: IPlantillaDetalle[] = [];
  departmentsUnit: IDepartamentoUnidad[] = [];
  departamentos:IDepartamento[] =[]
  reporteClasificacion: IClasificacion[]=[];
  conceptOfResults: IConceptoEstadoResultado[]=[];
  reportePlantaTextAlign: IReportePlantaTextAlign[]=[];
  selectedPlantillaDetalle:any[] = [];
  rowName : String;
  templateExcel : String;
  templateDepto : String;
  templateEr: String;
  
  
  //#region C O N T R U C T O R
  constructor(private _reportesService: ReportesService, 
    private _catalogoService: CatalogoService,
    private _spinnerService: NgxSpinnerService,
    private _modal: NgbModal) { }
  //#endregion
  
  // Load
  ngOnInit() {
    this.loadCompany();
  }

  //load company
  loadCompany() :void {
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._reportesService.getCompanias({ idUsuario: usuario.id }).subscribe(company  => {
      this.companies = company;
    },error => this.errorMessage = <any>error);
  }

  //change company
  onFileChanged(archivo): void {
    this.nameTemplate = "";
    if(this.selectedCompany == 0){
      this.crearForm();
      return;
    }
     
    switch(+this.selectedCompany) { 
      case 2: //NISSAN
          this.loadDepartmentUnit();
          this.loadDepartment();
          this.loadClassification();
          this.loadConceptOfResults();
          this.loadTextAlign();
         break; 
     
    } 

    this._spinnerService.show();
    if(archivo != null){
      this.nameTemplate = archivo.name;
      this.fileToUpload = archivo;
      archivo = null;
    }
    // this.loadDepartment();
    this._reportesService.getTemplateForBrand(String(this.selectedCompany))
    .subscribe(x => {
      if(x.length > 0)
        this.nameTemplate = x[0].nombrePlatilla;
        this._spinnerService.hide();
        this.changeTemplateWords();
      },error => {
      this.errorMessage = <any>error
    });
  }

  //change  sheet
  changeSheet():void {
    this.getDataTemplate();
  }

  changeTemplateWords(): void {
    this.rowsTemplate = [];
    this.loadTemplateWords();
    this.getDataTemplate();
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
      this.fileToUpload = null;
      swal('La platilla se guardo correctamente','','success')
      setTimeout(() => {
        this.loadTemplateWords();
      },1000);
      
      this._spinnerService.hide();
    }); 
  }

  showModal(modalDetails,rowTemplate): void{
    this.rowName = String(rowTemplate.nameColumn);
    this.modalReference =  this._modal.open(modalDetails);
  }

  loadDepartmentUnit(): void {
    this._catalogoService.getDepartamentoUnidad().subscribe(departments  => {
      this.departmentsUnit = departments;
    },error => this.errorMessage = <any>error);
  }

  loadDepartment(): void {
    
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._reportesService.getDepartamentoxCompaniayUsuario({
      idCompania: this.selectedCompany,
      idUsuario: usuario.id
    }).subscribe(depa => { 
      this.departamentos = depa;
    }, error => this.errorMessage = <any>error);
  }

  loadClassification(): void {
    this._reportesService.getClasificacion().subscribe(calsificaciones  => {
      this.reporteClasificacion = calsificaciones;
    },error => this.errorMessage = <any>error);
  }

  loadConceptOfResults(): void {
    this._reportesService.getEstadoResultadosConcepto().subscribe(conceptos  => {
      this.conceptOfResults = conceptos;
    },error => this.errorMessage = <any>error);
  }

  loadTextAlign() :void {
    this._reportesService.getAlineacionTextReportePlanta().subscribe(textAlign  => {
      this.reportePlantaTextAlign = textAlign;
    },error => this.errorMessage = <any>error);
  }

  saveConfigurationTemplate(): void {
    
    
    var xml  = this.getXML();
    if(!xml) 
      return;
    
    this._spinnerService.show();  
    this._reportesService.getSaveConfigurationTemplate({
        idHoja : this.selectedHoja
      , idPlantilla: this.idTemplate
      , xmlTemplate : this.templateExcel
      , xmlDepartamento : this.templateDepto
      , xmlEstadoResultado: this.templateEr
      })
    .subscribe(x => {
      var nameSheet = this.sheets.filter(sheet=>sheet.id == this.selectedHoja)[0].sheet
      swal('La configuración de la hoja '+ nameSheet +' se guardo correctamente','','success')
      this._spinnerService.hide();
      },error => {
      this.errorMessage = <any>error
    });
    
  }

  private loadTemplateWords(): void  {
    
    this._reportesService.getReportPlant(String(this.selectedCompany)).subscribe(confTemplate  => {
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

  private getDataTemplate(): void{
    this.rowsTemplate = [];
    this.modelEtiqueta = [];
    this.dataSheet.filter(sheet=> sheet.idHoja == this.selectedHoja).forEach(row =>{
      if(row.Etiqueta != "" && this.rowsTemplate.findIndex(x=> x.nameColumn == row.Etiqueta) == -1) {
         
          this.rowsTemplate.push({nameColumn : row.Etiqueta})
          this.modelEtiqueta[row.Etiqueta] = [{"etiqueta":row.ValorEtiqueta, "idHoja": row.idHoja, "id": row.id, "etiquetaDetalle" : row.etiquetaDetalle }];
        }
    })
  }

  private crearForm(): void{
    this.sheets = [];
    this.rowsTemplate = [];
    this.selectedHoja = 0;
  }

  private getXML(): boolean {

    try {
      let selectForm = this.selectedPlantillaDetalle.length > 0? this.selectedPlantillaDetalle : this.dataDetails;
    let valueCompleted = true;
    let detailsValueCompleted = true;
      this.templateExcel = "<template>"
      this.templateDepto = "<templateDepa>"
      this.templateEr = "<templateER>"
      Object.getOwnPropertyNames(this.modelEtiqueta).forEach(column => {
      if(column != "length"){
          if(!this.modelEtiqueta[column][0].etiqueta && valueCompleted)
            valueCompleted  = false;

        

        this.templateExcel += "<row>";
        this.templateExcel += "<idHoja>" + this.modelEtiqueta[column][0].idHoja + "</idHoja>";
        this.templateExcel += "<idPlantilla>" + this.dataSheet[0].idPlantilla+ "</idPlantilla>";
        this.templateExcel += "<etiqueta>" + column + "</etiqueta>";
        this.templateExcel += "<valor>" + this.modelEtiqueta[column][0].etiqueta + "</valor>";
        let details = selectForm.find(x=> x.etiqueta == column); 
        if (details != undefined) {

          if(details.idDepartamento != undefined) {
            details.idDepartamento.forEach(d => {
              this.templateDepto += "<row>"
              this.templateDepto += "<idDepartamento>" + d.idDepartamento + "</idDepartamento>";
              this.templateDepto += "<etiqueta>" + column + "</etiqueta>";
              this.templateDepto += "</row>"
            });
          }
        
            
          if(details.idEstadoResultadosI != undefined) {
            details.idEstadoResultadosI.forEach(er => {
              this.templateEr += "<row>"
              this.templateEr += "<idEstadoResultadosI>" + er.idEstadoResultadosI + "</idEstadoResultadosI>";
              this.templateEr += "<etiqueta>" + column + "</etiqueta>";
              this.templateEr += "</row>"
            });
          }

          this.templateExcel += "<valorEtiquetaDetalle>" + 
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
            this.templateExcel += "<idSeccionReporte>" + 
                              (details.idSeccionReporte != undefined?
                                ((!details.idSeccionReporte)? 
                                    ""
                                  : 
                                    details.idSeccionReporte
                                ) 
                              :
                                "")
                          + "</idSeccionReporte>"
            this.templateExcel += "<idOrigen>" + 
                              (details.idOrigen != undefined?
                                ((!details.idOrigen)? 
                                  ""
                                : 
                                  details.idOrigen 
                                )
                              :
                                "")
                          + "</idOrigen>"
            this.templateExcel += "<idClasificacionPlanta>" + 
                              (details.idClasificacionPlanta != undefined?
                                ((!details.idClasificacionPlanta)? 
                                  ""
                                : 
                                  details.idClasificacionPlanta 
                                )
                              :
                                "")
                          + "</idClasificacionPlanta>"
            this.templateExcel += "<idAlieacionText>" + 
                              (details.idAlieacionText != undefined?
                                ((!details.idAlieacionText)? 
                                  ""
                                : 
                                  details.idAlieacionText 
                                )
                              :
                                "")
                          + "</idAlieacionText>"
            this.templateExcel += "<idTipoPeriodo>" + 
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
          this.templateExcel += "</row>";
        }  
      });
      this.templateExcel += "</template>"
      this.templateDepto += "</templateDepa>"
      this.templateEr += "</templateER>"
      return (valueCompleted && detailsValueCompleted) ? true : false;
    }
    catch(x) {
      return false;
    }
  }
}
