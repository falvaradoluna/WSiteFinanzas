import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { ICompania } from '../models/catalog/compania';
import { ITipoReporte } from '../models/catalog/tipoReporte';
import { ISucursal } from '../models/catalog/sucursal';
import { IDepartamento } from '../models/catalog/departamento';


import { IResultadoInternos } from '../models/reports/resultado-internos';
import { IEfectivoSituacion } from '../models/reports/efectivo-y-situacion-financiera';
import { IEstadoSituacion } from '../models/reports/estado-Situacion-Financiera';
import { IDetalleUnidadesMensual } from '../models/reports/detalle-unidades-mensual';
import { IDetalleResultadosMensual } from '../models/reports/detalle-resultados-mensual';
import { IDetalleResultadosCuentas } from '../models/reports/detalle-resultados-cuentas';
import { IDetalleUnidadesAcumulado } from '../models/reports/detalle-unidades-acumulado';
import { ITipoUnidad } from '../models/reports/tipo-unidad';
import { IAcumuladoReal } from '../models/reports/acumuladoreal';
import { IAutoLineaAcumulado } from '../models/reports/auto-linea-acumulado';
import { ISeries } from '../models/reports/series';


import { IResultadoEstadoDeResultadosCalculo } from '../models/reports/formulaEstadoResultado';
import { Iexterno } from '../models/reports/externo';



@Injectable()
export class ReportesService {
  
  private _urlUnidades = 'api/internos/internos';
  private _urlEstadoResultados = 'api/internos/estadoresultados';
  private _urlEstadoDeResultadosCalculo = 'api/internos/estadodeResultadoscalculo';
  private _urlEstadoResultadosNv2 = 'api/internos/estadoresultadosnv2';
  private _urlEstadoResultadosPresupuestoNv2 = 'api/internos/estadoresultadospresupuestonv2';
  private _urlEstadoResultadosAcumuladoReal = 'api/internos/estadoresultadosacumuladoreal';
  private _urlSumaDepartamentos = 'api/internos/sumadepartamentos';
  private _urlCompanias = 'api/internos/companias';
  private _urlSucursales = 'api/internos/sucursales';
  private _urlDepartamentos = 'api/internos/departamentos';
  private _urlUnidadesDepartamento = 'api/internos/unidadesdepto';
  private _urlEfectivoSituacion = 'api/internos/efectivoysituacion';
  private _urlUnidadesAcumuladoPresupuesto = 'api/internos/unidadesacumuladopresupuesto';
  private _urlUnidadesAcumuladoPresupuestoDepartamento = 'api/internos/unidadesacumuladopresupuestodepartamento';
  private _urlUnidadesAcumuladoRealDepartamento = 'api/internos/unidadesacumuladorealdepartamento';
  private _urlDetalleUnidadesMensual = 'api/internos/detalleunidadesmensual';
  private _urlDetalleUnidadesMensualFlotillas = 'api/internos/detalleunidadesmensualflotillas';
  private _urlDetalleUnidadesTipo = 'api/internos/detalleunidadestipo';
  private _urlDetalleUnidadesTipoFlotillas = 'api/internos/detalleunidadestipoflotillas';
  private _urlDetalleUnidadesTipoAcumulado = 'api/internos/detalleunidadestipoacumulado';
  private _urlEstadoSituacion = 'api/internos/estadosituaciofinanciera';
  private _urlDetalleUnidadesSeries = 'api/internos/detalleunidadesseries';
  private _urlDetalleUnidadesAcumulado = 'api/internos/detalleunidadesacumulado';
  private _urlDetalleResultadosMensual = 'api/internos/detalleresultadosmensual';
  private _urlDetalleResultadosCuentas = 'api/internos/detalleresultadoscuentas';
  private _urlDetalleUnidadesTipoAcumuladoFlotillas = 'api/internos/detalleunidadestipoacumuladoflotillas';
  private _urlDetalleUnidadesAcumuladoFlotillas = 'api/internos/detalleunidadesacumuladoflotillas';
  private _urlAcumuladoReal = 'api/internos/acumuladoreal';
  private _urlAutoLineaAcumulado = 'api/internos/autolineaacumulado';
  private _urlTipoUnidadAcumulado = 'api/internos/tipounidadacumulado';
  private _urlEstadoResultadosPresupuesto = 'api/internos/estadoresultadospresupuesto';
  private _urlEstadoResultadosAcumuladoByIdER = 'api/internos/estadoresultadosacumuladobyider';
  private _urlDetalleUnidadesSeriesAr = 'api/internos/detalleunidadesseriesar';
  private _urlEstadoDeResultadosVariacionSegundoNivel = 'api/internos/estadoderesultadosvariacionsegundonivel';
  private _urlTipoReporte = 'api/internos/tipoReporte';
  private _urlReportInterno = 'api/reportes/reportMonth';

  constructor(private _http: HttpClient) { 
  }

  getUnidades(parameters): Observable<IResultadoInternos[]> {
    let Params = new HttpParams();
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);

    return this._http.get<IResultadoInternos[]>(this._urlUnidades, { params: Params })
      .catch(this.handleError);
  }

  getEstadoDeResultadosCalculo(parameters): Observable<IResultadoEstadoDeResultadosCalculo[]> {
    let Params = new HttpParams();
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    return this._http.get<IResultadoEstadoDeResultadosCalculo[]>(this._urlEstadoDeResultadosCalculo, { params: Params })
    .catch(this.handleError);
  }

  getEstadoResultados(parameters): Observable<IResultadoInternos[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idSucursalSecuencia', parameters.idSucursalSecuencia);

    return this._http.get<IResultadoInternos[]>(this._urlEstadoResultados, { params: Params })
      .catch(this.handleError);
  }

  getEstadoResultadosNv2(parameters): Observable<IDetalleResultadosMensual[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idSucursalSecuencia', parameters.idSucursalSecuencia);
    Params = Params.append('idEstadoResultadosI', parameters.idEstadoResultadosI);
    Params = Params.append('idOrden', parameters.idOrden);
    Params = Params.append('esAnual', parameters.esAnual);

    return this._http.get<IDetalleResultadosMensual[]>(this._urlEstadoResultadosNv2, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEstadoResultadosPresupuestoNv2(parameters): Observable<IDetalleResultadosMensual[]> { 
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idEstadoResultadosI', parameters.idEstadoResultadosI);
    Params = Params.append('idOrden', parameters.idOrden);

    return this._http.get<IDetalleResultadosMensual[]>(this._urlEstadoResultadosPresupuestoNv2, { params: Params })
      .catch(this.handleError);
  }

  getEstadoResultadosAcumuladoReal(parameters): Observable<IDetalleUnidadesAcumulado[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania',            parameters.idCompania);
    Params = Params.append('idSucursal',            parameters.idSucursal);
    Params = Params.append('periodoYear',           parameters.periodoYear);
    Params = Params.append('idDepartamento',        parameters.idDepartamento);
    Params = Params.append('idSucursalSecuencia',   parameters.idSucursalSecuencia);

    return this._http.get<IAcumuladoReal[]>(this._urlEstadoResultadosAcumuladoReal, { params: Params })
      .catch(this.handleError);
  }

  getSumaDepartamentos(parameters): Observable<IResultadoInternos[]> {
    
    let Params = new HttpParams();  

    Params = Params.append('idcia', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoAnio', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('IdDepartamento',parameters.xmlDepartamento);
    Params = Params.append('IdSucursalSecuencia',parameters.idSucursalSecuencia);
    Params = Params.append('tipoReporte', parameters.tipoReporte);

    return this._http.get<IResultadoInternos[]>(this._urlSumaDepartamentos, { params: Params })
      .catch(this.handleError);
  }


  getSumaDepartamentosAcumuladoReal(parameters): Observable<IDetalleUnidadesAcumulado[]> { // Se reutiliza la interfaz de detalle Unidades Acumulado
    let Params = new HttpParams();  

    Params = Params.append('idcia', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoAnio', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('IdDepartamento',parameters.xmlDepartamento);
    Params = Params.append('IdSucursalSecuencia',parameters.idSucursalSecuencia);
    Params = Params.append('tipoReporte', parameters.tipoReporte);

    return this._http.get<IAcumuladoReal[]>(this._urlSumaDepartamentos, { params: Params })
      .catch(this.handleError);
  }


  getUnidadesDepartamento(parameters): Observable<IResultadoInternos[]> { // Se reutiliza la interfaz de unidades
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idPestana', parameters.idPestana);

    return this._http.get<IResultadoInternos[]>(this._urlUnidadesDepartamento, { params: Params })
      .catch(this.handleError);
  }

  getCompanias(parameters): Observable<ICompania[]> {
    let Params = new HttpParams();

    Params = Params.append('idusuario', parameters.idUsuario);
    return this._http.get<ICompania[]>(this._urlCompanias, { params: Params })
      .catch(this.handleError);
  }

  getSucursales(parameters): Observable<ISucursal[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idUsuario', parameters.idUsuario);

    return this._http.get<ISucursal[]>(this._urlSucursales, { params: Params })
      .catch(this.handleError);
  }

  getDepartamentos(parameters): Observable<IDepartamento[]> {

    return this._http.get<IDepartamento[]>(this._urlDepartamentos)
      .catch(this.handleError);
  }

  getDetalleUnidadesMensual(parameters): Observable<IDetalleUnidadesMensual[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    let url = this._urlDetalleUnidadesMensual;

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);

    if (parameters.isUnidadesDepto) {
      url = 'api/internos/unidadesdepartamentonv2';
    }

    return this._http.get<IDetalleUnidadesMensual[]>(url, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesMensualFlotillas(parameters): Observable<IDetalleUnidadesMensual[]> {

    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);

    return this._http.get<IDetalleUnidadesMensual[]>(this._urlDetalleUnidadesMensualFlotillas, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesTipo(parameters): Observable<ITipoUnidad[]> {

    let Params = new HttpParams();

    let url = 'api/internos/detalleunidadestipo';

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('idOrigen', parameters.idOrigen);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idAutoLinea', parameters.idAutoLinea);
    Params = Params.append('idPestania', parameters.idPestania);

    if (parameters.isUnidadesDepto) {
      url = 'api/internos/detalleunidadesdepartamentotipo';
    }

    return this._http.get<ITipoUnidad[]>(url, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesTipoFlotillas(parameters): Observable<ITipoUnidad[]> {
    let Params = new HttpParams();

    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('idOrigen', parameters.idOrigen);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idAutoLinea', parameters.idAutoLinea);

    return this._http.get<ITipoUnidad[]>(this._urlDetalleUnidadesTipoFlotillas, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesTipoAcumulado(parameters): Observable<ITipoUnidad[]> {
    let Params = new HttpParams();
    let url = 'api/internos/detalleunidadestipoacumulado';

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('idOrigen', parameters.idOrigen);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idAutoLinea', parameters.idAutoLinea);
    Params = Params.append('idPestania', parameters.idPestania);

    if (parameters.isUnidadesDepto) {
      url = 'api/internos/detalleunidadesdepartamentotipoacumulado';
    }

    return this._http.get<any>(url, { params: Params })
    .catch((err: Response) => {
      const details = err.json();
      return Observable.throw(details);
   });
  }

  getDetalleUnidadesTipoAcumuladoFlotillas(parameters): Observable<ITipoUnidad[]> {
    let Params = new HttpParams();

    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('idOrigen', parameters.idOrigen);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idAutoLinea', parameters.idAutoLinea);

    return this._http.get<any>(this._urlDetalleUnidadesTipoAcumuladoFlotillas, { params: Params })
    .catch((err: Response) => {
      const details = err.json();
      return Observable.throw(details);
   });
  }

  getDetalleUnidadesAcumulado(parameters): Observable<IDetalleUnidadesAcumulado[]> {
    let Params = new HttpParams();
    let url = this._urlDetalleUnidadesAcumulado;

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);

    if (parameters.isUnidadesDepto) {
      url = 'api/internos/unidadesdepartamentoacumuladonv2';
    }

    return this._http.get<IDetalleUnidadesAcumulado[]>(url, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesAcumuladoFlotillas(parameters): Observable<IDetalleUnidadesAcumulado[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);

    return this._http.get<IDetalleUnidadesAcumulado[]>(this._urlDetalleUnidadesAcumuladoFlotillas, { params: Params })
      .catch(this.handleError);
  }

  getDetalleResultadosCuentas(parameters): Observable<IDetalleResultadosCuentas[]> {
    let Params = new HttpParams();

    Params = Params.append('IdCia', parameters.IdCia);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('anio', parameters.anio);
    Params = Params.append('mes', parameters.mes);
    Params = Params.append('numcta', parameters.numCta);

    return this._http.get<IDetalleResultadosCuentas[]>(this._urlDetalleResultadosCuentas, { params: Params })
      .catch(this.handleError);
  }

  get_EfectivoSituacion(parameters): Observable<IEfectivoSituacion[]> {
    let Params = new HttpParams();

    Params = Params.append('idreporte', parameters.idTipoReporte);
    Params = Params.append('idcia', parameters.idAgencia);
    Params = Params.append('anio', parameters.anio);

    return this._http.get<IEfectivoSituacion[]>(this._urlEfectivoSituacion, { params: Params })
      .catch(this.handleError);
  }

  get_EstadoSituacion(parameters): Observable<IEstadoSituacion[]> {
    let Params = new HttpParams();

    Params = Params.append('idreporte', parameters.idTipoReporte);
    Params = Params.append('idcia', parameters.idAgencia);
    Params = Params.append('anio', parameters.anio);

    return this._http.get<IEstadoSituacion[]>(this._urlEstadoSituacion, { params: Params })
      .catch(this.handleError);
  }

  get_AcumuladoReal(parameters): Observable<IAcumuladoReal[]> {
    let Params = new HttpParams();

    Params = Params.append('IdSucursal', parameters.IdSucursal);
    Params = Params.append('IdCompania', parameters.IdCompania);
    Params = Params.append('anio',       parameters.anio);
    return this._http.get<IAcumuladoReal[]>(this._urlAcumuladoReal, { params: Params })
      .catch(this.handleError);
  }

  get_AutoLineaAcumulado(parameters): Observable<IAutoLineaAcumulado[]> {
    let Params = new HttpParams();

    Params = Params.append('IdCompania',  parameters.IdCompania);
    Params = Params.append('IdSucursal',  parameters.IdSucursal);
    Params = Params.append('anio',        parameters.anio);
    Params = Params.append('mes',         parameters.mes);
    Params = Params.append('IdOrigen',    parameters.IdOrigen);

    return this._http.get<IAutoLineaAcumulado[]>(this._urlAutoLineaAcumulado, { params: Params })
      .catch(this.handleError);
  }

  get_TipoUnidadAcumulado(parameters): Observable<IAutoLineaAcumulado[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);
    Params = Params.append('idAutoLinea', parameters.idAutoLinea);

    return this._http.get<IAutoLineaAcumulado[]>(this._urlTipoUnidadAcumulado, { params: Params })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }

  getUnidadesAcumuladoPresupuesto(parameters): Observable<IDetalleUnidadesAcumulado[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);

    return this._http.get<IDetalleUnidadesAcumulado[]>(this._urlUnidadesAcumuladoPresupuesto, { params: Params })
      .catch(this.handleError);
  }

  getUnidadesAcumuladoPresupuestoDepartamento(parameters): Observable<IDetalleUnidadesAcumulado[]> {
    let Params = new HttpParams();

    Params = Params.append('idPestana', parameters.idPestana);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);

    return this._http.get<IDetalleUnidadesAcumulado[]>(this._urlUnidadesAcumuladoPresupuestoDepartamento, { params: Params })
      .catch(this.handleError);
  }

  getUnidadesAcumuladoRealDepartamento(parameters): Observable<IAcumuladoReal[]> {
    let Params = new HttpParams();

    Params = Params.append('idPestana', parameters.idPestana);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);

    return this._http.get<IAcumuladoReal[]>(this._urlUnidadesAcumuladoRealDepartamento, { params: Params })
      .catch(this.handleError);
  }

  get_ResultadosPresupuesto(parameters): Observable<IAcumuladoReal[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania',      parameters.idCompania);
    Params = Params.append('IdSucursal',      parameters.IdSucursal);
    Params = Params.append('anio',            parameters.anio);
    Params = Params.append('IdDepartamento',  parameters.IdDepartamento);

    return this._http.get<IAcumuladoReal[]>(this._urlEstadoResultadosPresupuesto, { params: Params })
      .catch(this.handleError);
  }

  get_ResultadosAcumuladoXIdER(parameters): Observable<IAcumuladoReal[]> {
    let Params = new HttpParams();
    
    Params = Params.append('idCompania',          parameters.idCompania);
    Params = Params.append('IdSucursal',          parameters.IdSucursal);
    Params = Params.append('anio',                parameters.anio);
    Params = Params.append('IdDepartamento',      parameters.IdDepartamento);
    Params = Params.append('idEstadoDeResultado', parameters.idEstadoDeResultado);
    Params = Params.append('idSucursalSecuencia', parameters.idSucursalSecuencia);
    Params = Params.append('IdOrden',             parameters.IdOrden);

    return this._http.get<IAcumuladoReal[]>(this._urlEstadoResultadosAcumuladoByIdER, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesSeriesAr(parameters): Observable<ISeries[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania',        parameters.idCompania);
    Params = Params.append('idSucursal',        parameters.idSucursal);
    Params = Params.append('idOrigen',          parameters.idOrigen);
    Params = Params.append('periodoYear',       parameters.periodoYear);
    Params = Params.append('periodoMes',        parameters.periodoMes);
    Params = Params.append('unidadDescripcion', parameters.unidadDescripcion);

    return this._http.get<ISeries[]>(this._urlDetalleUnidadesSeriesAr, { params: Params })
      .catch(this.handleError);
  }

  getEstadoResultadosVariacion(parameters): Observable<IAcumuladoReal[]> {
    let Params = new HttpParams();

    Params = Params.append('idCompania',          parameters.idCompania);
    Params = Params.append('PeriodoMes',          parameters.PeriodoMes);
    Params = Params.append('PeriodoYear',         parameters.PeriodoYear);
    Params = Params.append('idEstadoResultadosI', parameters.idEstadoResultadosI);
    Params = Params.append('IdDepartamento',      parameters.IdDepartamento);
    Params = Params.append('IdSucursal',          parameters.IdSucursal);
    Params = Params.append('idSucursalSecuencia', parameters.idSucursalSecuencia);
    Params = Params.append('EsAnul',              parameters.EsAnul);

    return this._http.get<IAcumuladoReal[]>(this._urlEstadoDeResultadosVariacionSegundoNivel, { params: Params })
      .catch(this.handleError);
  }

  getTipoReporte(parameters): Observable<any[]> {
    let Params = new HttpParams();
    Params = Params.append('idUsuario', parameters.idUsuario);

    return this._http.get<ITipoReporte[]>(this._urlTipoReporte, { params: Params })
      .catch(this.handleError);
  }
 

  getReportMonth(parameters): Observable<Iexterno[]> {
    let Params = new HttpParams();

    // Params = Params.append('idHoja', parameters.idHoja);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);

    // return this._http.get<Iexterno[]>(this._urlReportInterno, { params: Params })
    //   .catch(this.handleError);

      // return this._http.get<Iexterno[]>("http://localhost:6248/api/report/excelExterno",{params: Params})
      // .catch(this.handleError);
// ,{
      //   idCompania:parameters.idCompania,
      //   periodoYear: parameters.periodoYear,
      //   periodoMes: parameters.periodoMes
      // }
//return this._http.post("http://192.168.20.92/WSF/api/report/excelExterno?idCompania="+ parameters.idCompania+ "&periodoYear="+parameters.periodoYear 
      return this._http.get<Iexterno[]>("http://192.168.20.92/WSF/api/report/excelExterno?idCompania="+ parameters.idCompania+ "&periodoYear=" + parameters.periodoYear + "&periodoMes=" + parameters.periodoMes ,{})
      .catch(this.handleError);

  }
}
