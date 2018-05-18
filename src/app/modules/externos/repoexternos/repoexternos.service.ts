import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

//Importamos las interfaces
import { ICompania } from '../../../models/catalog/compania';

import { IResponse } from './models/response';

@Injectable()
export class RepoexternosService {

    //Url´s peticiones a Apis
    //private _urlcreateExcel = 'api/externos/createExcel';
    private _urlCompanias = 'api/catalogos/companias';

    constructor(private _http: HttpClient) { }

    /*createExcel(params): Observable<any> {
        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();
        Params = Params.append( 'idCompania', params.idCompania );
        Params = Params.append( 'periodoYear', params.periodoYear );
        Params = Params.append( 'periodoMes', params.periodoMes );
        console.log( 'service', params );
        return this._http.get<any>(this._urlcreateExcel, { params: Params })
        //.do(data => console.log(data))
        .catch(this.handleError);
    };*/

    getCompanias(parameters): Observable<ICompania[]> {
        // Initialize Params Object
        let Params = new HttpParams();
        // Begin assigning parameters
        Params = Params.append('idusuario', parameters.idUsuario);

        return this._http.get<ICompania[]>(this._urlCompanias, { params: Params })
        .catch(this.handleError);
    };

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    };
};
