import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IResponse } from './models/response';

@Injectable()
export class RepoexternosService {

    //Url´s peticiones a Apis
    private _urlcreateExcle = 'api/externos/createExcel';

    constructor(private _http: HttpClient) { }

    createExcel(): Observable<IResponse[]>{
        //Inicializamos un nuevo onjeto de tipo HttpParams
        let Params = new HttpParams();
        console.log( 'Service createExcel.' );
        return this._http.get<IResponse[]>(this._urlcreateExcle, {params: Params})
        .catch(this.handleError);
    };

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    };
};
