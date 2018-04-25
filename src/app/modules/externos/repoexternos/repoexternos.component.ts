import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { RepoexternosService } from './repoexternos.service';
import { IResponse } from './models/response';

@Component({
	selector: 'wsf-repoexternos',
	templateUrl: './repoexternos.component.html',
	styleUrls: ['./repoexternos.component.scss'],
	animations: [routerTransition()]
})
export class RepoexternosComponent implements OnInit {
	errorMessage:   any;
	constructor(private _servviceExternos: RepoexternosService) { }

	respuesta: IResponse[];

	ngOnInit() {
	}

	createExcel(): void {
		console.log("Hola createExcel");
		this._servviceExternos.createExcel()
		.subscribe(respuesta =>{
			this.respuesta = respuesta;
			// window.open('excel/' + respuesta.Name);
			// console.log( 'respuesta', respuesta.Name );
		},
		error => this.errorMessage = <any>error);
	}
}
