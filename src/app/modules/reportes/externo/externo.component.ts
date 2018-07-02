import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
  group,
  state,
  animateChild } from '@angular/animations';
import * as XLSX from 'xlsx';
import { ReportesService } from '../../../services/Reportes.service'
import { ICompania } from '../../../models/catalog/compania';
import {
	ReactiveFormsModule,
	FormsModule,
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
	NgForm,
} from '@angular/forms';
import xml2js from 'xml2js';
import { Iexterno } from '../../../models/reports/externo';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'wsf-externo',
  templateUrl: './externo.component.html',
  styleUrls: ['./externo.component.scss'],
  animations: [
    trigger('ngIfAnimation', [
      transition('void => *', [
          query('*', stagger('5ms', [
              animate('0.3s ease-in', keyframes([
                  style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                  style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
                  style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
                  ]))]), {optional: true}),
          ]),
      transition('* => void', [
          query('*', stagger('5ms', [
              animate('0.4s ease-in', keyframes([
                  style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                  style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
                  style({opacity: 0, transform: 'translateY(-75%)', offset: 1.0}),
                  ]))]), {optional: true}),
          ])
    ]),
    routerTransition()
  ]
})
export class ExternoComponent implements OnInit {
  errorMessage: any;
  companias: ICompania[];
  tipoReportes: any[];
  years = [];
  selectedCompania = "0";
  selectedTipoReporte = "0";
  selectedPeriodoYear = "0";
  selectedPeriodoMes = "0";
  
  constructor(private _reportesService : ReportesService, private _spinnerService: NgxSpinnerService) {   }
  externo : Iexterno[] =[]

  ngOnInit() {
    this.getCompanias();
    this.getTipoReporte();
    this.getPeriodoYear();
  }

  procesar(): void  {
    if (this.selectedCompania === "0")
      return;
    if (this.selectedTipoReporte === "0")
      return;
    if(this.selectedTipoReporte === "1") {
       if(this.selectedPeriodoYear === "0")
        return;
    }else if(this.selectedTipoReporte === "2") {
      if(this.selectedPeriodoYear === "0")
        return;
      if(this.selectedPeriodoMes === "0")
        return;
    }


  
  this._spinnerService.show();
  var reportDataSource = [];
  
  this._reportesService.getReportExternal(this.getParameters(4))
  .subscribe(externos => 
                {
                  var error = new String(externos);
                  if (error.indexOf("Error") != -1) {
                    this._spinnerService.hide();
                    swal("Error al generar el reporte", String(externos) , "error");

                  }else {
                    window.open(String(externos),"_blank");
                    this._spinnerService.hide();
                  }
                },error => this.errorMessage = <any>error
             );
  // this._reportesService.getReportMonth(this.getParameters(2))
  // .subscribe(externos => 
  //               {
  //                 reportDataSource[0] = this.getJSONReport(externos); 
  //                 this._reportesService.getReportMonth(this.getParameters(3))
  //                 .subscribe(externos => 
  //                               {
  //                                 reportDataSource[1] = this.getJSONReport(externos);
  //                                 this._reportesService.getReportMonth(this.getParameters(4))
  //                                 .subscribe(externos => 
  //                                               {
  //                                                 reportDataSource[2] = this.getJSONReport(externos);
  //                                                 this._reportesService.getReportMonth(this.getParameters(5))
  //                                                 .subscribe(externos => 
  //                                                               {
  //                                                                 reportDataSource[3] = this.getJSONReport(externos);
  //                                                                 this.exportAsExcelFile(reportDataSource,"persons")
  //                                                                 this._spinnerService.hide();
  //                                                               },error => this.errorMessage = <any>error
  //                                                           );
  //                                               },error => this.errorMessage = <any>error
  //                                            );
  //                               },error => this.errorMessage = <any>error
  //                            );
  //               },error => this.errorMessage = <any>error
  //            );
  }

  getCompanias(): void {
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._reportesService.getCompanias({ idUsuario: usuario.id })
      .subscribe(
        companias => {
          this.companias = companias;
        },
        error => this.errorMessage = <any>error);
  };

  getTipoReporte(): void{
    this.tipoReportes = [
                        {id: "1",Nombre:"Anual"},
                        {id: "2",Nombre:"Mensual"},
                       ]
                       this.selectedTipoReporte = "0";
  }

  getPeriodoYear() : void{

    var yearActual = (new Date()).getFullYear();
  
    for (let index = yearActual; index >= 2010; index--) {
      
      var obj = {
                    "id" : index,
                    "Nombre" : index
                };
      this.years.push(obj);
    } 
  }
  
  getParameters(idHoja : number): any  {
    return { 
      idHoja: idHoja,
      idCompania: this.selectedCompania,
      periodoYear: this.selectedPeriodoYear,
      periodoMes: this.selectedPeriodoMes,
      tipoReporte: this.selectedTipoReporte
    }
  }

  getJSONReport(externos : Iexterno[]): {} {
    let parseString = xml2js.parseString;
    let jsonReport: {};
    parseString(externos[0].Resultado, function (err, result) {
      jsonReport=  JSON.parse(JSON.stringify(result))
    });
    return jsonReport;
  }

  private exportAsExcelFile(json: any[], excelFileName: string): void {
    var sheetNames =[];
    var dataSorucesheet ={}
   json.forEach(function(data){
    sheetNames.push(data.EFE.ExcelNombre[0]);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
    
    dataSorucesheet[data.EFE.ExcelNombre[0]] = worksheet;
    
   })
   
   const workbook: XLSX.WorkBook = { Sheets: dataSorucesheet, SheetNames: sheetNames };
   
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    XLSX.writeFile(workbook,"test.xlsx",{cellStyles: true});
    
  }
}
