import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import { IResultadoInternos } from './resultado-internos';
import { InternosService } from './internos.service';
import { ISucursal } from './sucursal';
import { ICompania } from './compania';
import { IDepartamento } from './departamento';
import { ITipoReporte } from './tipo-reporte';


@Component({
  selector: 'app-internos',
  templateUrl: './internos.component.html',
  styleUrls: ['./internos.component.scss'],
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
export class InternosComponent implements OnInit {
  errorMessage: any;

  constructor(private _service: InternosService) { }

  showFilters = true;
  showUnidades = true;
  showResultados = true;

  resultadoUnidadesService: IResultadoInternos[] = [];
  estadoResultados: IResultadoInternos[] = [];
  companias: ICompania[];
  sucursales: ISucursal[];
  departamentos: IDepartamento[];
  tipoReporte: ITipoReporte[];
  selectedCompania = 0;
  selectedTipoReporte = 1;
  selectedSucursal = 'AA';
  selectedDepartamento = 'Todos';
  mes: string;
  anio: string;
  periodo: string;

  resultadoUnidades: IResultadoInternos[] = [];

  ngOnInit() {
    this.setDefaultDate();
    this.setTipoReporte();
    this.getCompanias();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleUnidades(): void {
    this.showUnidades = !this.showUnidades;
  }

  toggleResultados(): void {
    this.showResultados = !this.showResultados;
  }

  procesar(): void {
    this.getResultadoUnidades();
    this.getEstadoResultados();
  }

  getResultadoUnidades(): void {
    this._service.getUnidades({
      idCia: this.selectedCompania,
      idSucursal: this.selectedSucursal,
      mes: this.mes,
      anio: this.anio
    })
      .subscribe(resultadoUnidades => {
        this.resultadoUnidades = resultadoUnidades;
      },
      error => this.errorMessage = <any>error);
  }

  getEstadoResultados(): void {
    this._service.getEstadoResultados({
      idCia: this.selectedCompania,
      idSucursal: this.selectedSucursal,
      departamento: this.selectedDepartamento,
      mes: this.mes,
      anio: this.anio
    })
      .subscribe(estadoResultados => {
        this.estadoResultados = estadoResultados;
      },
      error => this.errorMessage = <any>error);
  }

  getCompanias(): void {
    this._service.getCompanias({ idUsuario: 3 })
      .subscribe(companias => {
        this.companias = companias;
      },
      error => this.errorMessage = <any>error);
  }

  getSucursales(): void {
    this._service.getSucursales({
      idTipoReporte: this.selectedTipoReporte,
      idAgencia: this.selectedCompania
    })
      .subscribe(sucursales => {
        this.sucursales = sucursales;
      },
      error => this.errorMessage = <any>error);
  }

  getDepartamentos(): void {
    this._service.getDepartamentos({
      idReporte: this.selectedTipoReporte,
      idSucursal: this.selectedSucursal,
      idAgencia: this.selectedCompania,
      anio: this.anio,
      mes: this.mes
    })
      .subscribe(departamentos => {
        this.departamentos = departamentos;
      },
      error => this.errorMessage = <any>error);
  }

  setTipoReporte(): void {
    this.tipoReporte = [
      { Id: 1, Descripcion: 'Mensual' },
      { Id: 2, Descripcion: 'Acumulado Real' },
      { Id: 3, Descripcion: 'Acumulado Presupuestos' }
    ];
  }

  setDefaultDate(): void {
    let today = new Date();
    let mes = today.getMonth() + 1;
    let mesStr = mes.toString();
    let anio = today.getFullYear().toString();

    if (mes < 10) {
      mesStr = '0' + mesStr;
    }

    this.mes = mesStr;
    this.anio = anio;
    this.periodo = anio + '-' + mesStr;
    console.log(this.periodo);
  }

  onChangePeriodo(selectedDate): void {
    console.log(selectedDate);

    if (selectedDate) {
      const mesStr = selectedDate.substring(5,7);
      const fullYearStr = selectedDate.substring(0,4);

      this.mes = mesStr;
      this.anio = fullYearStr;

      console.log(this.mes);
      console.log(this.anio);

      if(this.mes && this.anio && this.selectedCompania !== 0 && this.selectedSucursal) {
        this.getDepartamentos();
      }
    }
  }

  onChangeCompania(newValue): void {
    this.selectedCompania = newValue;

    if (this.selectedCompania !== 0 && this.selectedTipoReporte) {
      //Llenar dropdown de sucursales
        this.getSucursales();
    }

    if(this.periodo && this.selectedCompania !== 0 && this.selectedSucursal) {
      this.getDepartamentos();
    }
  }

  onChangeSucursal(newValue): void {
    this.selectedSucursal = newValue;

    if(this.periodo && this.selectedCompania !== 0 && this.selectedSucursal) {
      this.getDepartamentos();
    }
  }

  onChangeDepartamento(newValue): void {
    this.selectedDepartamento = newValue;
    console.log(newValue);
  }

  onChangeTipoReporte(newValue): void {
    this.selectedTipoReporte = newValue;
    this.getSucursales();
  }

  //Multi Select
//   dropdownEnabled = true;
//   // values: number[];
//   config = TreeviewConfig.create({
//       hasAllCheckBox: false,
//       hasFilter: true,
//       hasCollapseExpand: false,
//       decoupleChildFromParent: false,
//       maxHeight: 400
//   });

//   buttonClass = 'btn-outline-secondary btn-sm';

//   itCategory = new TreeviewItem({
//             text: 'Programming', value: 91, children: [{
//                 text: 'Frontend', value: 911, children: [
//                     { text: 'Angular 1', value: 9111 },
//                     { text: 'Angular 2', value: 9112 },
//                     { text: 'ReactJS', value: 9113 }
//                 ]
//             }, {
//                 text: 'Backend', value: 912, children: [
//                     { text: 'C#', value: 9121 },
//                     { text: 'Java', value: 9122 },
//                     { text: 'Python', value: 9123, checked: false }
//                 ]
//             }]
//   });

//   // items = [this.itCategory];

//   items: TreeviewItem[];

//   onSelectedChange(event): void{

//  }
//   //

//   ngOnInit() {
//     this.items = [
//       new TreeviewItem({ text: 'ANDRADE UNIVERSIDAD SA DE CV', value: 91, children: [] }),
//       new TreeviewItem({ text: 'AUTOS JAPONESES SA DE CV', value: 92, children: [] }),
//       new TreeviewItem({ text: 'ANDRADE ZARAGOZA SA DE CV', value: 93, children: [] })
//     ]
//   }
}
