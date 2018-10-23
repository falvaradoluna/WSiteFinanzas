import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IMarca } from '../models/catalog/marca';
import { IDepartamentoUnidad } from '../models/catalog/departamentoUnidad';

@Injectable()
export class CatalogoService {
    private _urlMarca = 'api/catalogos/marca';
    private _urlDepartamentoUnidad = 'api/catalogos/departamentoUnidad';
    constructor(private _http: HttpClient) { }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

    getMarca(): Observable<IMarca[]> {
        return this._http.get<IMarca[]>(this._urlMarca, { })
        .catch(this.handleError);
    }

    getDepartamentoUnidad(): Observable<IDepartamentoUnidad[]> {
        return this._http.get<IDepartamentoUnidad[]>(this._urlDepartamentoUnidad, { })
        .catch(this.handleError);
    }
}