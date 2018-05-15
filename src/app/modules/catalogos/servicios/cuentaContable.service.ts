import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

// Interfaces
import { IBalanceConceptoNivel01 } from '../../../models/administracion/balanceConceptoNivel01';
import { ICompania } from '../../../models/catalog/compania';
import { IDepartamento } from '../../../models/catalog/departamento';
import { IBalanceConceptoNivel02 } from '../../../models/administracion/balanceConceptoNivel02';
import { IBalanceConceptoNivel03 } from '../../../models/administracion/balanceConceptoNivel03';
import { INotasDictamen } from '../../../models/administracion/notasDictamen';
import { INotasFinancieras } from '../../../models/administracion/notasFinancieras';
import { IConceptoEstadoResultado } from '../../../models/administracion/conceptoEstadoResultado';
import { CuentaContable } from '../../../models/administracion/cuentaContable';
import { Options } from 'selenium-webdriver/chrome';
import { ICuentaContableNaturaleza } from '../../../models/administracion/cuentaContableNaturaleza';
import { IDictamen } from '../../../models/administracion/dictamen';
import { IEstadoFinancieroInterno } from '../../../models/administracion/estadoFinancieroInterno';
import { ICuentaContableDetalle } from '../../../models/administracion/cuentaContableDetalle';
import { IAfectaCuentaContable } from '../../../models/administracion/AfectaCuentaContable';
import { ICuentaContableSituacion } from '../../../models/administracion/cuentaContableSituacion';
import { CompaniaCuentaContable } from '../../../models/administracion/companiaCuentaContable';

@Injectable()
export class CuentaContableService {

    // Url´s de servicios
    private _urlObtenerCuentasContables = 'api/administracion/cuentaContable';
    private _urlObtenerCompaniasCuentaContable = 'api/administracion/companiasCuentaContable';
    private _urlCuentaContableExecute = 'api/administracion/cuentaContableExecute';
    private _urlCompanias = 'api/internos/companias';
    private _urlDepartamentos = 'api/catalogos/departamentosPorCompanias';
    private _urlBalanceConceptoNivel01 = 'api/administracion/balanceConceptoNivel01';
    private _urlBalanceConceptoNivel02 = 'api/administracion/balanceConceptoNivel02';
    private _urlBalanceConceptoNivel03 = 'api/administracion/balanceConceptoNivel03';
    private _urlObtenerNotasDictamen = 'api/administracion/notasDictamen';
    private _urlObtenerNotasFinancieras = 'api/administracion/notasFinancierancieras';
    private _urlObtenerconceptoEstadoResultado = 'api/administracion/conceptoEstadoResultado';
    private _urlObtenerDetalleCuenta = 'api/administracion/detalleCuenta';
    private _urlObtenerCuentaContableNaturaleza = 'api/administracion/cuentaContableNaturaleza';
    private _urlObtenerDictamenCuenta = 'api/administracion/dictamenCuenta';
    private _urlObtenerEstadoFinancieroInterno = 'api/administracion/estadoFinancieroInterno';
    private _urlObtenerCuentaContableDetalle = 'api/administracion/cuentaContableDetalle';
    private _urlObtenerafectaCuentaContable = 'api/administracion/afectaCuentaContable';
    private _urlObtenerSituacionCuenta = 'api/administracion/situacionCuenta';
    private _urlProcesaExcel = 'api/administracion/procesaExcel';
    private _urlObtieneValoresCuentaContable = 'api/administracion/valoresCuentaContable';
    private _urlObtieneCuentaContableLocal = 'api/administracion/cuentaContableLocal';
    private _urlObtieneDepartamentos = 'api/catalogos/departamentos';
    private _urlCuentaContableEditar = 'api/administracion/cuentaContableEditar';
    

    constructor(private _http: HttpClient) { }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

    // Obtiene el catalogo de compañias por usuario
    getCuentasContables(): Observable<CuentaContable[]> {
        return this._http.get<CuentaContable[]>(this._urlObtenerCuentasContables)
            .catch(this.handleError);
    }
    // Obtiene el catalogo de compañias por usuario
    getCompaniasCuentaContable(parameters): Observable<CompaniaCuentaContable[]> {
        let params = new HttpParams();
        params = params.append('idCuentaContable', parameters.idCuentaContable);
        return this._http.get<CompaniaCuentaContable[]>(this._urlObtenerCompaniasCuentaContable, { params: params })
            .catch(this.handleError);
    }

    // Guarda, Actualiza y elimina una cuenta contable
    CuentaContableExecute(parameters): Observable<any> {
        let params = new HttpParams();
        params = params.append('idMovimiento', parameters.idMovimiento);
        params = params.append('idUsuario', parameters.idUsuario);
        params = params.append('xmlCuenta', parameters.xmlCuenta);

        return this._http.get<any>(this._urlCuentaContableExecute, { params: params })
            //.do(data => console.log(data))
            .catch(this.handleError);
    }

    // Obtiene el catalogo de compañias por usuario
    getCompanias(parameters): Observable<ICompania[]> {
        let Params = new HttpParams();
        Params = Params.append('idusuario', parameters.idUsuario);
        return this._http.get<ICompania[]>(this._urlCompanias, { params: Params })
            .catch(this.handleError);
    }

    // Obtiene el catalogo de departamentos por usuario/Companias
    getDepartamentos(parameters): Observable<IDepartamento[]> {
        let Params = new HttpParams();
        Params = Params.append('idCompanias', parameters.idCompanias);
        Params = Params.append('idUsuario', parameters.idUsuario);
        return this._http.get<IDepartamento[]>(this._urlDepartamentos, { params: Params })
            .catch(this.handleError);
    }

    // Obtiene el catalogo de balance primer nivel
    getBalanceConceptoNivel01(): Observable<IBalanceConceptoNivel01[]> {
        return this._http.get<IBalanceConceptoNivel01[]>(this._urlBalanceConceptoNivel01)
            .catch(this.handleError);
    }

    // Obtiene el catalogo de balance primer nivel 2
    getBalanceConceptoNivel02(parameters): Observable<IBalanceConceptoNivel02[]> {
        let Params = new HttpParams();
        Params = Params.append('idBalanceNivel01', parameters.idBalanceNivel01);
        return this._http.get<IBalanceConceptoNivel02[]>(this._urlBalanceConceptoNivel02, { params: Params })
            .catch(this.handleError);
    }

    // Obtiene el catalogo de balance primer nivel 3
    getBalanceConceptoNivel03(parameters): Observable<IBalanceConceptoNivel03[]> {
        let Params = new HttpParams();
        Params = Params.append('idBalanceNivel01', parameters.idBalanceNivel01);
        Params = Params.append('idBalanceNivel02', parameters.idBalanceNivel02);
        return this._http.get<IBalanceConceptoNivel03[]>(this._urlBalanceConceptoNivel03, { params: Params })
            .catch(this.handleError);
    }

    // Obtiene el catalogo de notasDictamen
    getNotasDictamen(): Observable<INotasDictamen[]> {
        return this._http.get<INotasDictamen[]>(this._urlObtenerNotasDictamen)
            .catch(this.handleError);
    }

    // Obtiene el catalogo de balance primer nivel 3
    getNotasFinancieras(): Observable<INotasFinancieras[]> {
        return this._http.get<INotasFinancieras[]>(this._urlObtenerNotasFinancieras)
            .catch(this.handleError);
    }

    // Recupera todos los conceptos de estado de resultados
    getConceptoEstadoResultado(): Observable<IConceptoEstadoResultado[]> {
        return this._http.get<IConceptoEstadoResultado[]>(this._urlObtenerconceptoEstadoResultado)
            .catch(this.handleError);
    }

    // Obtiene el detalle de la cuenta
    getDetalleCuenta(parameters): Observable<CuentaContable> {
        let Params = new HttpParams();
        Params = Params.append('idCuenta', parameters.idCuenta);
        return this._http.get<CuentaContable>(this._urlObtenerDetalleCuenta, { params: Params })
            .catch(this.handleError);
    }

    // Recupera la naturaleza de las cuentas
    getCuentaContableNaturaleza(): Observable<ICuentaContableNaturaleza[]> {
        return this._http.get<ICuentaContableNaturaleza[]>(this._urlObtenerCuentaContableNaturaleza)
            .catch(this.handleError);
    }

    // Recupera los dictamenes de las cuentas
    getDictamenCuenta(): Observable<IDictamen[]> {
        return this._http.get<IDictamen[]>(this._urlObtenerDictamenCuenta)
            .catch(this.handleError);
    }

    // Recupera los estados financieros internos
    getEstadoFinancieroInterno(): Observable<IEstadoFinancieroInterno[]> {
        return this._http.get<IEstadoFinancieroInterno[]>(this._urlObtenerEstadoFinancieroInterno)
            .catch(this.handleError);
    }

    // Recupera el detalle de cuentas contables (Catalogo)
    getCuentaContableDetalle(): Observable<ICuentaContableDetalle[]> {
        return this._http.get<ICuentaContableDetalle[]>(this._urlObtenerCuentaContableDetalle)
            .catch(this.handleError);
    }

    // Recupera la afectación de cuenta contable
    getAfectaCuentaContable(): Observable<IAfectaCuentaContable[]> {
        return this._http.get<IAfectaCuentaContable[]>(this._urlObtenerafectaCuentaContable)
            .catch(this.handleError);
    }

    // Recupera la situación de cuentas contables (Catalogo)
    getSituacionCuentaContable(): Observable<ICuentaContableSituacion[]> {
        return this._http.get<ICuentaContableSituacion[]>(this._urlObtenerSituacionCuenta)
            .catch(this.handleError);
    }




    // Se encarga de subir el archivo de excel
    subirArchivo(archivo: File) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append('archivo', archivo, archivo.name);
            formData.append('type', 'guardaExcel');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            let url = 'http://localhost:5200/api/';
            xhr.open('put', url, true);
            xhr.send(formData);
        });
    }

    // Guarda, Actualiza y elimina una cuenta contable
    procesaArchivoExcel(parameters): Observable<any> {
        let params = new HttpParams();
        params = params.append('nombreArchivo', parameters.nombreArchivo);
        params = params.append('idUsuario', parameters.idUsuario);
        params = params.append('idCompania', parameters.idCompania);

        return this._http.get<any>(this._urlProcesaExcel, { params: params })
            // .do(data => console.log('All:' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // Obtiene valores de cuenta contable
    ObtieneValoresCuentaContable(parameters): Observable<any> {
        let params = new HttpParams();
        params = params.append('numCuenta', parameters.numCuenta);

        return this._http.get<any>(this._urlObtieneValoresCuentaContable, { params: params })
            // .do(data => console.log('All:' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    // Obtiene una cuenta contable local
    ObtieneCuentaContableLocal(parameters): Observable<CuentaContable> {
        let params = new HttpParams();
        params = params.append('numCuenta', parameters.numCuenta);

        return this._http.get<CuentaContable>(this._urlObtieneCuentaContableLocal, { params: params })
            // .do(data => console.log('All:' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // ==========================================
    //  Obtiene todos los departamentos
    // ==========================================
    getTodosDepartamentos(): Observable<IDepartamento[]> {
        return this._http.get<IDepartamento[]>(this._urlObtieneDepartamentos)
            .catch(this.handleError);
    }

      // Guarda, Actualiza y elimina una cuenta contable
      CuentaContableEditar(parameters): Observable<any> {
        let params = new HttpParams();
        params = params.append('idUsuario', parameters.idUsuario);
        params = params.append('xmlCuenta', parameters.xmlCuenta);

        return this._http.get<any>(this._urlCuentaContableEditar, { params: params })
            //.do(data => console.log(data))
            .catch(this.handleError);
    }

}