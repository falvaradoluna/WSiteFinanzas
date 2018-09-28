import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

// Interfaces
import { ICompania } from '../../../models/catalog/compania';
import { IRubro } from '../../../models/administracion/rubro';
import { ICatalogo } from '../../../models/catalog/catalogo';


@Injectable()
export class MonitoreoService {

    // Url´s de servicios
    private _urlObtenerCompaniaInternoVsExterno = 'api/administracion/companiasInternoVsExterno';
    private _urlObtenerRubroPorCompania = 'api/administracion/rubroPorCompania';
    private _urlObtenerCuentasCompania = 'api/administracion/cuentasFaltantePorCompania';
    private _urlObtenerAnioMesActivoPasivo = 'api/administracion/aniosMesActivoVsPasivo';
    private _urlObtenertipoDiferencia = 'api/administracion/tipoDiferencia';
  

    constructor(private _http: HttpClient) { }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

    // Obtiene los tipos de diferencia
    getTipoDiferencia(): Observable<ICatalogo[]> {
        return this._http.get<ICatalogo[]>(this._urlObtenertipoDiferencia)
            .catch(this.handleError);
    }

    // Obtiene el catalogo de compañias
    getCompanias(parameters): Observable<ICompania[]> {
        let Params = new HttpParams();
        Params = Params.append('idTipo', parameters.idTipo);
        return this._http.get<ICompania[]>(this._urlObtenerCompaniaInternoVsExterno, { params: Params })
            .catch(this.handleError);
    }

    // Obtiene los rubros por compania
    getRubroPorCompania(parameters): Observable<IRubro[]> {
        let Params = new HttpParams();
        Params = Params.append('idCompania', parameters.idCompania);
        return this._http.get<IRubro[]>(this._urlObtenerRubroPorCompania, { params: Params })
            .catch(this.handleError);
    }

    // Obtiene los rubros por compania
    getCuentasPorCompania(parameters): Observable<IRubro[]> {
        let Params = new HttpParams();
        Params = Params.append('idCompania', parameters.idCompania);
        return this._http.get<IRubro[]>(this._urlObtenerCuentasCompania, { params: Params })
            .catch(this.handleError);
    }

    // Obtiene los rubros por compania
    getAnioMesActivoVsPasivo(parameters): Observable<IRubro[]> {
        let Params = new HttpParams();
        Params = Params.append('idCompania', parameters.idCompania);
        return this._http.get<IRubro[]>(this._urlObtenerAnioMesActivoPasivo, { params: Params })
            .catch(this.handleError);
    }
}