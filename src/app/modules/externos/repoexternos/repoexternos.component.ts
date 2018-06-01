import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { RepoexternosService } from './repoexternos.service';
import {
	trigger,
	style,
	transition,
	animate,
	keyframes,
	query,
	stagger,
	group,
	state,
	animateChild
} from '@angular/animations';
import {
	ReactiveFormsModule,
	FormsModule,
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
	NgForm,
} from '@angular/forms';
//Importamos las librerias
import { ICompania } from '../../../models/catalog/compania';
import { IResponse } from './models/response';

@Component({
	selector: 'wsf-repoexternos',
	templateUrl: './repoexternos.component.html',
	styleUrls: ['./repoexternos.component.scss'],
	animations: [
		trigger('ngIfAnimation', [
			transition('void => *', [
				query('*', stagger('5ms', [
					animate('0.3s ease-in', keyframes([
						style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
						style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
						style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
					]))]), { optional: true }),
			]),
			transition('* => void', [
				query('*', stagger('5ms', [
					animate('0.4s ease-in', keyframes([
						style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
						style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
						style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
					]))]), { optional: true }),
			])
		]),
		routerTransition()
	]
})
export class RepoexternosComponent implements OnInit {

	errorMessage: any;
	showFilters = true;
	selectedCompania = 0;
	periodoSelect = 0;
	anioSelect = 0;
	mesSelect = 0;
	disabledAnio = true;
	disabledMes = true;

	//Forms
	form: FormGroup;
	selectCompania = new FormControl(0);
	selectPeriodo = new FormControl(0);
	selectAnio = new FormControl({ value: 0, disabled: true });
	selectMes = new FormControl({ value: 0, disabled: true });

	constructor(private _serviceExternos: RepoexternosService, public fb: FormBuilder) {
		this.form = fb.group({
			"selectCompania": this.selectCompania,
			"selectPeriodo": this.selectPeriodo,
			"selectAnio": this.selectAnio,
			"selectMes": this.selectMes
		});
	}

	respuesta: IResponse[];
	companias: ICompania[];

	anios = [
		{ anio: 2001, value: 2001 }, { anio: 2002, value: 2002 }, { anio: 2003, value: 2003 }, { anio: 2004, value: 2004 }, { anio: 2005, value: 2005 },
		{ anio: 2006, value: 2006 }, { anio: 2007, value: 2007 }, { anio: 2008, value: 2008 }, { anio: 2009, value: 2009 }, { anio: 2010, value: 2010 },
		{ anio: 2011, value: 2011 }, { anio: 2012, value: 2012 }, { anio: 2013, value: 2013 }, { anio: 2014, value: 2014 }, { anio: 2015, value: 2015 },
		{ anio: 2016, value: 2016 }, { anio: 2017, value: 2017 }, { anio: 2018, value: 2018 }
	];

	meses = [
		{ mes: 'Enero', value: 1 }, { mes: 'Febrero', value: 2 }, { mes: 'Marzo', value: 3 },
		{ mes: 'Abril', value: 4 }, { mes: 'Mayo', value: 5 }, { mes: 'Junio', value: 6 },
		{ mes: 'Julio', value: 7 }, { mes: 'Agosto', value: 8 }, { mes: 'Septiembre', value: 9 },
		{ mes: 'Octubre', value: 10 }, { mes: 'Nomviemvre', value: 11 }, { mes: 'Diciembre', value: 12 }
	]

	ngOnInit() {
		this.getCompanias();
	};

	//Llenar el combo de las compañias
	getCompanias(): void {
		console.log('Companias');
		const usuario = JSON.parse(localStorage.getItem('userLogged'));
		this._serviceExternos.getCompanias({ idUsuario: usuario.id })
			.subscribe(
				companias => {
					this.companias = companias;
				},
				error => this.errorMessage = <any>error);
	};

	//Funcion para mostrar los filtras
	toggleFilters(): void {
		this.showFilters = !this.showFilters;
	};

	onChangeCompania(newValue: number): void {
		this.selectedCompania = newValue;
	};

	onChangePeriodo(newValue: number): void {
		this.periodoSelect = newValue;
		if (this.periodoSelect == 1) {
			this.form.controls['selectAnio'].enable();
			this.form.controls['selectMes'].disable();
			this.form.controls['selectMes'].setValue(0);
		} else if (this.periodoSelect == 2) {
			this.form.controls['selectAnio'].enable();
			this.form.controls['selectMes'].enable();
		} else {
			this.form.controls['selectAnio'].disable();
			this.form.controls['selectMes'].disable();
		}
	};

	createExcel(): void {
		/*this._serviceExternos.createExcel({
			idCompania: this.form.value.selectCompania,
			periodoYear: this.form.value.selectAnio,
			periodoMes: this.form.value.selectMes
		})
			.subscribe(respuesta => {
				this.downloadFile(respuesta);
				console.log(respuesta);
				//this.respuesta = respuesta;
			},
				error => this.errorMessage = <any>error);*/
	};
}
