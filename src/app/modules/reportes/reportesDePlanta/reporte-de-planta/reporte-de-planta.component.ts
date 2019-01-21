import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../../services/Reportes.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { ICompania } from '../../../../models/catalog/compania';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DualListComponent } from 'angular-dual-listbox';



@Component({

  selector: 'wsf-reporte-de-planta',
  templateUrl: './reporte-de-planta.component.html',
  styleUrls: ['./reporte-de-planta.component.scss']
})
export class ReporteDePlantaComponent implements OnInit {
  modalReference: NgbModalRef;
  errorMessage: any;
  selectedCompany = 0;
  selectedPeriodoMes = 0;
  selectedPeriodoYear= 0;
  companies:ICompania[] = [];
  periodosYear:any[] = [];
  constructor(private _reportesService: ReportesService,
			  private _spinnerService: NgxSpinnerService,
        private _modal: NgbModal) { }
        
  ngOnInit() {
    this.loadCompany();
    this.loadPeriodYear();
  }

  loadCompany() :void {
    const usuario = JSON.parse(localStorage.getItem('userLogged'));
    this._reportesService.getCompanias({ idUsuario: usuario.id }).subscribe(company  => {
      this.companies = company;
    },error => this.errorMessage = <any>error);
  }
  
  loadPeriodYear() :void{

    for (var i = 2012; i <= (new Date()).getFullYear(); i++) { 
      var obj = {}
      obj = {id: i, Nombre: i}
        this.periodosYear.push(obj);
    }
    var x= 0;
  }

  createExcel(): void {

    this._spinnerService.show();
    this._reportesService.createExcel({
      idCompania: this.selectedCompany,
      periodoMes: this.selectedPeriodoMes,
      periodoYear: this.selectedPeriodoYear
    })
    .subscribe(reporte => {
      window.open(String(reporte),"_blank");
      this._spinnerService.hide();
      },error => {
      this.errorMessage = <any>error
    });
  }

  showModal(modal): void{
    this.modalReference =  this._modal.open(modal);
  }
}
