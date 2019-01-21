import { Component, OnInit, Input } from '@angular/core';
import { ReportesService } from '../../../../../../services/Reportes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'wsf-clasificacion-honda',
  templateUrl: './clasificacion-honda.component.html',
  styleUrls: ['./clasificacion-honda.component.scss']
})
export class ClasificacionHondaComponent implements OnInit {
  format:any = { add: 'Remover', remove: 'Agregar', all: 'Todos', none: 'Ninguno', direction: 'left-to-right', draggable: true, locale: undefined };//DualListComponent.DEFAULT_FORMAT;
  key:string;
  display:any;
  keepSorted = true;
  source:Array<any>;
	confirmed:Array<any>;
	idAutoLinea:Array<any>
	dropdownSettings = {};
	errorMessage: any;
  idAutoLineaSelected: number;
  private sourceCarLine:Array<any>;
  private confirmedCarLinea:Array<any>;
  @Input() selectedPeriodoYear : number;
  @Input() selectedIdAutoLinea : number;
  @Input() modalReference: NgbModalRef;
  constructor(private _reportesService: ReportesService,
              private _spinnerService: NgxSpinnerService) { }

  ngOnInit() {
		this.dropdownlist();
    this.getClasificacionAutolinea();
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
