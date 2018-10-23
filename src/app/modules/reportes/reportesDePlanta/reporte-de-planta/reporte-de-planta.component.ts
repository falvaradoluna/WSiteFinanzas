import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../../services/Reportes.service'
import { CatalogoService } from '../../../../services/catalogo.service'
import { IMarca } from '../../../../models/catalog/marca';
import { ICompania } from '../../../../models/catalog/compania';

@Component({
  selector: 'wsf-reporte-de-planta',
  templateUrl: './reporte-de-planta.component.html',
  styleUrls: ['./reporte-de-planta.component.scss']
})
export class ReporteDePlantaComponent implements OnInit {
  errorMessage: any;
  selectedCompany = 0;
  selectedPeriodoMes = 0;
  selectedPeriodoYear= 0;
  companies:ICompania[] = [];
  periodosYear:any[] = [];
  constructor(private _reportesService: ReportesService,
              private _catalogoService: CatalogoService) { }

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


    this._reportesService.createExcel({
      idCompania: this.selectedCompany,
      periodoMes: this.selectedPeriodoMes,
      periodoYear: this.selectedPeriodoYear
    })
    .subscribe(x => {
      },error => {
      this.errorMessage = <any>error
    });
  }
}
