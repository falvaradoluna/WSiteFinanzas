import { Component, OnInit, DoCheck  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ICompania } from '../../../models/catalog/compania';
import { MonitoreoService } from '../servicios/monitoreo.service';
import { IRubro } from '../../../models/administracion/rubro';
import { ICatalogo } from '../../../models/catalog/catalogo';

@Component({
  selector: 'wsf-monitoreo-monto-balanza',
  templateUrl: './monitoreo-monto-balanza.component.html',
  styleUrls: ['./monitoreo-monto-balanza.component.scss']
})
export class MonitoreoMontoBalanzaComponent implements OnInit, DoCheck  {

  public errorMessage: any;
  public companias: ICompania[];	
  public rubros: IRubro[];
  public cuentas: IRubro[];
  public tipos: ICatalogo[];
  public selectedCompania: number = 0;
  public selectedTipo: number = 0;

  constructor(private _serviceMonitoreo: MonitoreoService,  private _spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getTiposDiferencia();
    /*this.tipos = [
      { id: 1, descripcion: 'Interno Vs Externo' }
      ,{ id: 2, descripcion: 'Externo Activo Vs Pasivo' }
      ,{ id: 3, descripcion: 'Cuentas Faltantes' }
    ]*/
  }

  ngDoCheck(){
    //console.log('Método DoCheck lanzado');
}

  // ==========================================
  //  Llenar el combo de companias
	// ==========================================
	getTiposDiferencia(): void {
		this._serviceMonitoreo.getTipoDiferencia()
			.subscribe(
				tipos => { this.tipos = tipos; },
        error => this.errorMessage = <any>error);
  };

  // ==========================================
  //  Llenar el combo de companias
	// ==========================================
	getCompanias(): void {
		this._serviceMonitoreo.getCompanias({ idTipo: this.selectedTipo })
			.subscribe(
				companias => { 
          this.companias = companias; 
          this._spinnerService.hide();
        },
        error => this.errorMessage = <any>error);
  };

  // ==========================================
  //  Evento de companias
	// ==========================================
  onChangeTipo(idTipo): void {
    this.companias = [];
    this.selectedTipo = idTipo;    
    this.selectedCompania = 0;
    if(idTipo > 0) {
      this._spinnerService.show(); 
      setTimeout(() => { this._spinnerService.hide(); }, 3000);
      this.getCompanias();
    }
  }

  // ==========================================
  //  Evento de companias
	// ==========================================
  onChangeCompania(idCompania): void {
    this.rubros = [];
    this.selectedCompania = idCompania;  
    if(idCompania > 0) {
      this._spinnerService.show(); 
      setTimeout(() => { this._spinnerService.hide(); }, 5000);
      if(this.selectedTipo == 1) {
        this.getRubros();
      } else if(this.selectedTipo == 2) {
        this.getAnioMesActivoPasivo();
      } else if(this.selectedTipo == 3) {
        this.getCuentas();
      }
    }
  }

  // ==========================================
  //  Carga los rubros
	// ==========================================
	getRubros(): void {
		this._serviceMonitoreo.getRubroPorCompania({ idCompania: this.selectedCompania })
			.subscribe(
				rubros => { 
          this.rubros = rubros; 
          this._spinnerService.hide();
        },
				error => this.errorMessage = <any>error);
  };

  // ==========================================
  //  carga las cuentas
	// ==========================================
	getCuentas(): void {
		this._serviceMonitoreo.getCuentasPorCompania({ idCompania: this.selectedCompania })
			.subscribe(
				cuentas => { 
          this.cuentas = cuentas; 
          this._spinnerService.hide();
        },
				error => this.errorMessage = <any>error);
  };

// ==========================================
  //  Carga los rubros
	// ==========================================
	getAnioMesActivoPasivo(): void {
		this._serviceMonitoreo.getAnioMesActivoVsPasivo({ idCompania: this.selectedCompania })
			.subscribe(
				rubros => { 
          this.rubros = rubros; 
          this._spinnerService.hide();
        },
				error => this.errorMessage = <any>error);
  };
}
