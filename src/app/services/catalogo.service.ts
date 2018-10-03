import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IMarca } from '../models/catalog/marca';

@Injectable()
export class CatalogoService {
    private _urlMarca = 'api/catalogos/marca';
    constructor(private _http: HttpClient) { }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

    getMarca(): Observable<IMarca[]> {
        // let Params = new HttpParams();
        // Params = Params.append('idCompania', parameters.idCompania);
        // Params = Params.append('idSucursal', parameters.idSucursal);
        // Params = Params.append('periodoYear', parameters.periodoYear);
        // Params = Params.append('periodoMes', parameters.periodoMes);

        return this._http.get<IMarca[]>(this._urlMarca, { })
        .catch(this.handleError);
    }
}