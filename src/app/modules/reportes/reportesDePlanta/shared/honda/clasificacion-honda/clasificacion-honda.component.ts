import { query, stagger, keyframes, trigger, transition, animate, style } from '@angular/animations';
import { ReportesService } from '../../../../../../services/Reportes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../../../../../router.animations';
import { Component, OnInit, Input } from '@angular/core';
import { IDepartamento } from '../../../../../../models/catalog/departamento';
import { IEtiqueta } from '../../../../../../models/planta/etiqueta';
import { IDetalleResultadosMensual } from '../../../../../../models/reports/detalle-resultados-mensual';


@Component({
  selector: 'wsf-clasificacion-honda',
  templateUrl: './clasificacion-honda.component.html',
  styleUrls: ['./clasificacion-honda.component.scss'],
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
export class ClasificacionHondaComponent implements OnInit {
  format:any = { add: 'Remover'
                , remove: 'Agregar'
                , all: 'Todos'
                , none: 'Ninguno'
                , direction: 'left-to-right'
                , draggable: true
                , locale: undefined 
               };//DualListComponent.DEFAULT_FORMAT;
  key:string;
  display:any;
  keepSorted = true;
  source:Array<any>;
	confirmed:Array<any>;
	idAutoLinea:Array<any>
  dropdownSettings = {};
  labelDropdownSettings = {};
	errorMessage: any;
  idAutoLineaSelected: number;
  showPanel = true;
  showPaneHojaCuatro = true;
  showPaneDosTres = false;
  showPaneUno = false;
  departments = Array<IDepartamento>();
  labels = Array<IEtiqueta>();
  accounts= Array<IDetalleResultadosMensual>();
  selectedDepartments = new Array<any>();
  selectedLabels = new Array<any>();
  private sourceCarLine:Array<any>;
  private confirmedCarLinea:Array<any>;
  @Input() selectedPeriodoYear : number;
  @Input() selectedPeriodoMes : number;
  @Input() selectedIdAutoLinea : number;
  @Input() modalReference: NgbModalRef;
  constructor(private _reportesService: ReportesService,
              private _spinnerService: NgxSpinnerService) { }

  ngOnInit() {
		this.dropdownlist();
    this.getClasificacionAutolinea();
    this.loadDepartmentConfiguration();
    this.loadLabelConfiguration();
    this.loadUnclassifiedAccounts();
  }

	onItemSelect(selected){
    this.getClasificacionAutolineaHONDA(selected);
  }

  getClasificacionAutolineaHONDA(selected): void {
    let row = this.idAutoLinea.filter(x=>x.id == selected.id);
    this._reportesService.getClasificacionAutolineaHONDA({
                                                                          idAutoLineaPlanta: selected.id,
                                                                          periodoYear: +this.selectedPeriodoYear,
                                                                          idAutoLinea: row[0].idAutoLinea
     }).subscribe(carLinea => {
          this.sourceCarLine = carLinea;
          this.confirmedCarLinea = carLinea.filter(x=>x.idEstatusAutoLinea == 0);
          this.useCarLine();
      },error => {
        this.errorMessage = <any>error
      });
  }

  save(): void {
    this._spinnerService.show();
    var xmlAutoLinea = this.getXML();
    this._reportesService.getGurdarConfiguracionHonda({
                                                            idAutoLineaPlanta: this.idAutoLineaSelected[0].id,
                                                            xmlAutoLinea: xmlAutoLinea
    }).subscribe(result => {

        this._spinnerService.hide();
        this.modalReference.close();
        swal('Transacción realizada con éxito.','','success')
    },error => {
    this.errorMessage = <any>error
    });
  }

  saveSheetTwoThree(): void {
    let xml = this.getXmlThowThree();
    // return xmlConfiguration;
  }

  togglePanels(panelNumber: number): void {
    this.showPaneHojaCuatro = false;
    this.showPaneDosTres = false;
    this.showPaneUno = false;
    switch(panelNumber) { 
      case 4: { 
        this.showPaneHojaCuatro = true;
         break; 
      } 
      case 2: { 
        this.showPaneDosTres = true;
         break; 
      } 
      case 1: {
        this.showPaneUno = true;
        break;    
      } 
    }
  }

  loadUnclassifiedAccounts(): void { 
    
    this._reportesService.getCuentasSinClasificarHONDA({
                                                          periodoYear: this.selectedPeriodoYear,
                                                          periodoMes: this.selectedPeriodoMes,
                                                                          
                                                                          
     }).subscribe(accounts => {    
        this.accounts = accounts;
        this.accounts.forEach(x=>{ this.selectedDepartments[x.numeroCuenta] = "0"; });
      },error => {
        this.errorMessage = <any>error
      });
  }

  private getXmlThowThree(): string {
    let xmlConfiguration: string = "<cuentas>";
    this.accounts.forEach(element => {
      var idDepartamento = +this.selectedDepartments[element.numeroCuenta];
      var idLabel = 0;
      if(this.selectedLabels[element.numeroCuenta] != undefined)
        idLabel = this.selectedLabels[element.numeroCuenta][0].id;

        if(idDepartamento >  0 && idLabel > 0){
          xmlConfiguration +="<cuenta>"
          xmlConfiguration +="<numeroCuenta>" + element.numeroCuenta + "</numeroCuenta>"
          xmlConfiguration +="<idEtiqueta>" + idLabel + "</idEtiqueta>"
          xmlConfiguration +="<idDepartamento>" + idDepartamento + "</idDepartamento>"
          xmlConfiguration +="</cuenta>"
          
        }
    });
    xmlConfiguration +="</cuentas>"
    return xmlConfiguration;

  }

  private loadDepartmentConfiguration(): void {
    this._reportesService.getDepartamentoConfiguracionHonda()
    .subscribe(departments => {
      this.departments = departments;
      },error => {
      this.errorMessage = <any>error
    });
  }

  private loadLabelConfiguration(): void {
    this._reportesService.getEtiquetaConfiguracionHonda()
    .subscribe(labels => {
      this.labels = labels;
      },error => {
      this.errorMessage = <any>error
    });
  }

  private useCarLine() {
		this.key = 'id';
		this.display = 'autoLinea',
		this.keepSorted = true;
		this.source = this.sourceCarLine;
		this.confirmed = this.confirmedCarLinea;
  }
	
	private dropdownlist(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'autoLinea',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
    this.labelDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'descripcion',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
		};
	}

	private getClasificacionAutolinea(): void {
		this._reportesService.getClasificacionAutolinea()
    .subscribe(autoLinea => {
      this.idAutoLinea = autoLinea;
      },error => {
      this.errorMessage = <any>error
    });
  }

  private getXML(): string {
    let xmlAutoLinea = '<autoLineas>'
    this.sourceCarLine.forEach(source => {
        xmlAutoLinea += '<autoLinea>'
                      xmlAutoLinea += '<autoLinea>'
                                   +    source.autoLinea
                      xmlAutoLinea += '</autoLinea>'
      var row  =this.confirmedCarLinea.filter(inavtivo=>inavtivo.autoLinea == source.autoLinea)
      let idEstatusAutoLinea = 0
      if (!(row.length > 0)) {
        idEstatusAutoLinea = source.idEstatusAutoLinea = 1;
      }
      xmlAutoLinea += '<idEstatusAutoLinea>' 
                   + idEstatusAutoLinea
      xmlAutoLinea += '</idEstatusAutoLinea>'
      xmlAutoLinea += '</autoLinea>'
    });
    xmlAutoLinea += '</autoLineas>'

    return xmlAutoLinea;

  }
}
