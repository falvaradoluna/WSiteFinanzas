import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { ICompania } from '../../models/catalog/compania';
import { ITipoReporte } from '../../models/catalog/tipoReporte';
import { ISucursal } from '../../models/catalog/sucursal';
import { IDepartamento } from '../../models/catalog/departamento';


import { IResultadoInternos } from '../../models/reports/resultado-internos';
import { IDetalleUnidadesMensual } from '../../models/reports/detalle-unidades-mensual';
import { IDetalleResultadosMensual } from '../../models/reports/detalle-resultados-mensual';
import { IDetalleResultadosCuentas } from '../../models/reports/detalle-resultados-cuentas';
import { ITipoUnidad } from '../../models/reports/tipo-unidad';
import { IDetalleUnidadesAcumulado } from '../../models/reports/detalle-unidades-acumulado';
import { IAcumuladoReal } from '../../models/reports/acumuladoreal';
import { IAutoLineaAcumulado } from '../../models/reports/auto-linea-acumulado';
import { ISeries } from '../../models/reports/series';
import { IResultadoEstadoDeResultadosCalculo } from '../../models/reports/formulaEstadoResultado';


import { IEfectivoSituacion } from './efectivo-y-situacion-financiera';
import { IEstadoSituacion } from './estado-Situacion-Financiera';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { ITipoUnidadOtros } from '../../models/reports/tipo-unidad-otros';
import { ITipoUnidadRefacciones } from '../../models/reports/tipo-unidad-refacciones';
import { ITipoUnidadRefaccionesMovimiento } from '../../models/reports/ITipoUnidadRefaccionesMovimiento';
import { IEstadoSituacionCuenta } from './estado-Situacion-Financiera-Cuenta';



@Injectable()
export class InternosService {

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
  private _urlDetalleDepartamentosEspeciales = 'api/internos/detalleDepartamentosEspeciales';
  private _urlEstadoSituacionCuenta = 'api/internos/estadosituaciofinancieraCuenta';

  constructor(private _http: HttpClient) { }

  getUnidades(parameters): Observable<IResultadoInternos[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);

    return this._http.get<IResultadoInternos[]>(this._urlUnidades, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEstadoDeResultadosCalculo(parameters): Observable<IResultadoEstadoDeResultadosCalculo[]> {
    let Params = new HttpParams();
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    return this._http.get<IResultadoEstadoDeResultadosCalculo[]>(this._urlEstadoDeResultadosCalculo, { params: Params })
    .catch(this.handleError);
  }

  getEstadoResultados(parameters): Observable<IResultadoInternos[]> { // Se reutiliza la interfaz de unidades
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idSucursalSecuencia', parameters.idSucursalSecuencia);

    return this._http.get<IResultadoInternos[]>(this._urlEstadoResultados, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEstadoResultadosNv2(parameters): Observable<IDetalleResultadosMensual[]> { // Se reutiliza la interfaz de unidades
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
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

  getEstadoResultadosPresupuestoNv2(parameters): Observable<IDetalleResultadosMensual[]> { // Se reutiliza la interfaz de unidades
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idEstadoResultadosI', parameters.idEstadoResultadosI);
    Params = Params.append('idOrden', parameters.idOrden);

    return this._http.get<IDetalleResultadosMensual[]>(this._urlEstadoResultadosPresupuestoNv2, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEstadoResultadosAcumuladoReal(parameters): Observable<IDetalleUnidadesAcumulado[]> { // Se reutiliza la interfaz de unidades
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania',            parameters.idCompania);
    Params = Params.append('idSucursal',            parameters.idSucursal);
    Params = Params.append('periodoYear',           parameters.periodoYear);
    Params = Params.append('idDepartamento',        parameters.idDepartamento);
    Params = Params.append('idSucursalSecuencia',   parameters.idSucursalSecuencia);

    return this._http.get<IAcumuladoReal[]>(this._urlEstadoResultadosAcumuladoReal, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getSumaDepartamentos(parameters): Observable<IResultadoInternos[]> { // Se reutiliza la interfaz de unidades
    // Initialize Params Object
    let Params = new HttpParams();  

    // Begin assigning parameters
   // Params = Params.append('idcia', parameters.idCia);
   Params = Params.append('idcia', parameters.idCompania);
   Params = Params.append('idSucursal', parameters.idSucursal);
   Params = Params.append('periodoAnio', parameters.periodoYear);
   Params = Params.append('periodoMes', parameters.periodoMes);
   Params = Params.append('IdDepartamento',parameters.xmlDepartamento);
   Params = Params.append('IdSucursalSecuencia',parameters.idSucursalSecuencia);
   Params = Params.append('tipoReporte', parameters.tipoReporte);

 
   //console.log("params", Params);
    return this._http.get<IResultadoInternos[]>(this._urlSumaDepartamentos, { params: Params })
      .catch(this.handleError);
  }


getSumaDepartamentosAcumuladoReal(parameters): Observable<IDetalleUnidadesAcumulado[]> { // Se reutiliza la interfaz de detalle Unidades Acumulado
  // Initialize Params Object
  let Params = new HttpParams();  

  // Begin assigning parameters
 Params = Params.append('idcia', parameters.idCompania);
 Params = Params.append('idSucursal', parameters.idSucursal);
 Params = Params.append('periodoAnio', parameters.periodoYear);
 Params = Params.append('periodoMes', parameters.periodoMes);
 Params = Params.append('IdDepartamento',parameters.xmlDepartamento);
 Params = Params.append('IdSucursalSecuencia',parameters.idSucursalSecuencia);
 Params = Params.append('tipoReporte', parameters.tipoReporte);


 //console.log("params", Params);
  return this._http.get<IAcumuladoReal[]>(this._urlSumaDepartamentos, { params: Params })
    .catch(this.handleError);
}
////

  getUnidadesDepartamento(parameters): Observable<IResultadoInternos[]> { // Se reutiliza la interfaz de unidades
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idDepartamento', parameters.idDepartamento);

    return this._http.get<IResultadoInternos[]>(this._urlUnidadesDepartamento, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCompanias(parameters): Observable<ICompania[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idusuario', parameters.idUsuario);
    // Params = Params.append('secondParameter', parameters.valueTwo);

    return this._http.get<ICompania[]>(this._urlCompanias, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getSucursales(parameters): Observable<ISucursal[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idUsuario', parameters.idUsuario);

    return this._http.get<ISucursal[]>(this._urlSucursales, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

// ==========================================
//  Funcionalidad del dropdown de departamentos
// ==========================================
  getDepartamentos(parameters): Observable<IDepartamento[]> {
     let Params = new HttpParams();
     Params = Params.append('idCompania', parameters.idCompania);
     Params = Params.append('idSucursal', parameters.idSucursal);
     Params = Params.append('idUsuario', parameters.idUsuario);

    return this._http.get<IDepartamento[]>(this._urlDepartamentos, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getDetalleUnidadesMensual(parameters): Observable<IDetalleUnidadesMensual[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    let url = this._urlDetalleUnidadesMensual;
    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);
    console.log(parameters.idOrigen);
    if (parameters.isUnidadesDepto) {
      if(parameters.idOrigen == 742 || parameters.idOrigen == 16) {
        url = 'api/internos/unidadesdepartamentonv2Otros';
      } else {
        url = 'api/internos/unidadesdepartamentonv2';
      }
    }

    return this._http.get<IDetalleUnidadesMensual[]>(url, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesMensualFlotillas(parameters): Observable<IDetalleUnidadesMensual[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);

    return this._http.get<IDetalleUnidadesMensual[]>(this._urlDetalleUnidadesMensualFlotillas, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesTipo(parameters): Observable<ITipoUnidad[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    let url = 'api/internos/detalleunidadestipo';

    // Begin assigning parameters
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

// ==========================================
// Obtiene el detalle Nivel 2 HP y Servicios
// ==========================================
  getDetalleUnidadesServicioHyP(parameters): Observable<ITipoUnidadOtros[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    let url = 'api/internos/detalleunidadesServicioHyP';

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idDepartamento', parameters.idDepartamento);
    Params = Params.append('idCarline', parameters.idCarline);
    Params = Params.append('ordenTipoId', parameters.ordenTipoId);

    return this._http.get<ITipoUnidadOtros[]>(url, { params: Params })
      .catch(this.handleError);
  }

// ==========================================
// Obtiene el detalle Nivel 2 HP y Servicios
// ==========================================
getDetalleunidadesServicioHyPTotales(parameters): Observable<ITipoUnidadRefaccionesMovimiento[]> {
  // Initialize Params Object
  let Params = new HttpParams();

  let url = 'api/internos/detalleunidadesServicioHyPTotales';

  // Begin assigning parameters
  Params = Params.append('idCompania', parameters.idCompania);
  Params = Params.append('idSucursal', parameters.idSucursal);
  Params = Params.append('periodoYear', parameters.periodoYear);
  Params = Params.append('periodoMes', parameters.periodoMes);
  Params = Params.append('idDepartamento', parameters.idDepartamento);

  return this._http.get<ITipoUnidadRefaccionesMovimiento[]>(url, { params: Params })
    .catch(this.handleError);
}

// ==========================================
// Obtiene el detalle Nivel 2 HP y Servicios
// ==========================================
getDetalleunidadesServicioHyPCarLine(parameters): Observable<ITipoUnidadRefaccionesMovimiento[]> {
  // Initialize Params Object
  let Params = new HttpParams();

  let url = 'api/internos/detalleunidadesServicioHyPCarLine';

  // Begin assigning parameters
  Params = Params.append('idCompania', parameters.idCompania);
  Params = Params.append('idSucursal', parameters.idSucursal);
  Params = Params.append('periodoYear', parameters.periodoYear);
  Params = Params.append('periodoMes', parameters.periodoMes);
  Params = Params.append('idDepartamento', parameters.idDepartamento);
  Params = Params.append('ordenTipoId', parameters.ordenTipoId);
  
  return this._http.get<ITipoUnidadRefaccionesMovimiento[]>(url, { params: Params })
    .catch(this.handleError);
}


// ==========================================
//  Obtiene el detalle Nivel 2 Refacciones
// ==========================================
getDetalleUnidadesRefacciones(parameters): Observable<ITipoUnidadRefacciones[]> {
  // Initialize Params Object
  let Params = new HttpParams();

  let url = 'api/internos/detalleunidadesRefacciones';

  // Begin assigning parameters
  Params = Params.append('idCompania', parameters.idCompania);
  Params = Params.append('idSucursal', parameters.idSucursal);
  Params = Params.append('periodoYear', parameters.periodoYear);
  Params = Params.append('periodoMes', parameters.periodoMes);
  Params = Params.append('idDepartamento', parameters.idDepartamento);
  Params = Params.append('movimientoId', parameters.movimientoId);
  
  return this._http.get<ITipoUnidadRefacciones[]>(url, { params: Params })
    .catch(this.handleError);
}

// ==========================================
//  Obtiene el detalle Nivel 2 Refacciones
// ==========================================
getDetalleUnidadesRefaccionesMovimiento(parameters): Observable<ITipoUnidadRefaccionesMovimiento[]> {
  // Initialize Params Object
  let Params = new HttpParams();

  let url = 'api/internos/detalleunidadesRefaccionesMovimiento';

  // Begin assigning parameters
  Params = Params.append('idCompania', parameters.idCompania);
  Params = Params.append('idSucursal', parameters.idSucursal);
  Params = Params.append('periodoYear', parameters.periodoYear);
  Params = Params.append('periodoMes', parameters.periodoMes);
  Params = Params.append('idDepartamento', parameters.idDepartamento);

  return this._http.get<ITipoUnidadRefaccionesMovimiento[]>(url, { params: Params })
    .catch(this.handleError);
}


  getDetalleUnidadesTipoFlotillas(parameters): Observable<ITipoUnidad[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
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
    // Initialize Params Object
    let Params = new HttpParams();
    let url = 'api/internos/detalleunidadestipoacumulado';

    // Begin assigning parameters
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
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
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

  getDetalleUnidadesSeries(parameters): Observable<ISeries[]> {
    // Initialize Params Object
    let Params = new HttpParams();    
    var url: string;
    if (parameters.isUnidadesDepto || parameters.idOrigen === undefined) {
      parameters.idOrigen = 0;
    }
    
    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('idOrigen', parameters.idOrigen);
    Params = Params.append('idPestana', parameters.idPestana);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('unidadDescripcion', this.getReplaceSignosNoURl(parameters.unidadDescripcion));
    
    if(parameters.idOrigen !== 3){
      Params = Params.append('idCanalVenta', parameters.idDepartamento);
        url = 'api/internos/detalleunidadesSinDepartamento';  
      } else {
        Params = Params.append('idDepartamento', parameters.idDepartamento);
        url = 'api/internos/detalleunidadesseries';
      }      

    return this._http.get<ISeries[]>(url, { params: Params })
      .catch(this.handleError);
  }

  getDetalleUnidadesAcumulado(parameters): Observable<IDetalleUnidadesAcumulado[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    let url = this._urlDetalleUnidadesAcumulado;

    // Begin assigning parameters
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
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idOrigen', parameters.idOrigen);

    return this._http.get<IDetalleUnidadesAcumulado[]>(this._urlDetalleUnidadesAcumuladoFlotillas, { params: Params })
      .catch(this.handleError);
  }

  // getDetalleResultadosMensual(parameters): Observable<IDetalleResultadosMensual[]> {
  //   // Initialize Params Object
  //   let Params = new HttpParams();

  //   // Begin assigning parameters
  //   Params = Params.append('idcia', parameters.idAgencia);
  //   Params = Params.append('anio', parameters.anio);
  //   Params = Params.append('mes', parameters.mes);
  //   Params = Params.append('idsucursal', parameters.idSucursal);
  //   Params = Params.append('msucursal', parameters.mSucursal);
  //   Params = Params.append('departamento', parameters.departamento);
  //   Params = Params.append('concepto', parameters.concepto);
  //   Params = Params.append('idEstadoDeResultado', parameters.idEstadoDeResultado);
  //   Params = Params.append('idDetalle', parameters.idDetalle);

  //   return this._http.get<IDetalleResultadosMensual[]>(this._urlDetalleResultadosMensual, { params: Params })
  //     .catch(this.handleError);
  // }

  getDetalleResultadosCuentas(parameters): Observable<IDetalleResultadosCuentas[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    // Params = Params.append('servidoragencia', parameters.servidorAgencia);
    // Params = Params.append('concentradora', parameters.concentradora);

    Params = Params.append('IdCia', parameters.IdCia);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('anio', parameters.anio);
    Params = Params.append('mes', parameters.mes);
    Params = Params.append('numcta', parameters.numCta);

    return this._http.get<IDetalleResultadosCuentas[]>(this._urlDetalleResultadosCuentas, { params: Params })
      .catch(this.handleError);
  }

  get_EfectivoSituacion(parameters): Observable<IEfectivoSituacion[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idreporte', parameters.idTipoReporte);
    Params = Params.append('idcia', parameters.idAgencia);
    Params = Params.append('anio', parameters.anio);

    return this._http.get<IEfectivoSituacion[]>(this._urlEfectivoSituacion, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  get_EstadoSituacion(parameters): Observable<IEstadoSituacion[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idreporte', parameters.idTipoReporte);
    Params = Params.append('idcia', parameters.idAgencia);
    Params = Params.append('anio', parameters.anio);

    return this._http.get<IEstadoSituacion[]>(this._urlEstadoSituacion, { params: Params })
      .catch(this.handleError);
  }

  get_AcumuladoReal(parameters): Observable<IAcumuladoReal[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
    Params = Params.append('IdSucursal', parameters.IdSucursal);
    Params = Params.append('IdCompania', parameters.IdCompania);
    Params = Params.append('anio',       parameters.anio);
    return this._http.get<IAcumuladoReal[]>(this._urlAcumuladoReal, { params: Params })
      .catch(this.handleError);
  }

  get_AutoLineaAcumulado(parameters): Observable<IAutoLineaAcumulado[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
    Params = Params.append('IdCompania',  parameters.IdCompania);
    Params = Params.append('IdSucursal',  parameters.IdSucursal);
    Params = Params.append('anio',        parameters.anio);
    Params = Params.append('mes',         parameters.mes);
    Params = Params.append('IdOrigen',    parameters.IdOrigen);

    return this._http.get<IAutoLineaAcumulado[]>(this._urlAutoLineaAcumulado, { params: Params })
      .catch(this.handleError);
  }

  get_TipoUnidadAcumulado(parameters): Observable<IAutoLineaAcumulado[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
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
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);

    return this._http.get<IDetalleUnidadesAcumulado[]>(this._urlUnidadesAcumuladoPresupuesto, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUnidadesAcumuladoPresupuestoDepartamento(parameters): Observable<IDetalleUnidadesAcumulado[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idPestana', parameters.idPestana);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);

    return this._http.get<IDetalleUnidadesAcumulado[]>(this._urlUnidadesAcumuladoPresupuestoDepartamento, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUnidadesAcumuladoRealDepartamento(parameters): Observable<IAcumuladoReal[]> {
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('idPestana', parameters.idPestana);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('periodoYear', parameters.periodoYear);

    return this._http.get<IAcumuladoReal[]>(this._urlUnidadesAcumuladoRealDepartamento, { params: Params })
      // .do(data => console.log('All:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  get_ResultadosPresupuesto(parameters): Observable<IAcumuladoReal[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
    Params = Params.append('idCompania',      parameters.idCompania);
    Params = Params.append('IdSucursal',      parameters.IdSucursal);
    Params = Params.append('anio',            parameters.anio);
    Params = Params.append('IdDepartamento',  parameters.IdDepartamento);

    return this._http.get<IAcumuladoReal[]>(this._urlEstadoResultadosPresupuesto, { params: Params })
      .catch(this.handleError);
  }

  get_ResultadosAcumuladoXIdER(parameters): Observable<IAcumuladoReal[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
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
    // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
    Params = Params.append('idCompania',        parameters.idCompania);
    Params = Params.append('idSucursal',        parameters.idSucursal);
    Params = Params.append('idOrigen',          parameters.idOrigen);
    Params = Params.append('periodoYear',       parameters.periodoYear);
    Params = Params.append('periodoMes',        parameters.periodoMes);
    Params = Params.append('unidadDescripcion', parameters.unidadDescripcion);
    Params = Params.append('idDepartamento', parameters.idDepartamento);

    return this._http.get<ISeries[]>(this._urlDetalleUnidadesSeriesAr, { params: Params })
      .catch(this.handleError);
  }

  getEstadoResultadosVariacion(parameters): Observable<IAcumuladoReal[]> {
    // Initialize Params Object
    let Params = new HttpParams();
    // Begin assigning parameters
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

  // Funcionalidad para detalle de departamentos especiales
  getDetalleDepartamentosEspeciales(parameters): Observable<any[]> {

    let Params = new HttpParams();
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('idSucursal', parameters.idSucursal);
    Params = Params.append('idOrigen', parameters.idOrigen);
    Params = Params.append('periodoAnio', parameters.periodoAnio);
    Params = Params.append('periodoMes', parameters.periodoMes);

    return this._http.get<ITipoReporte[]>(this._urlDetalleDepartamentosEspeciales, { params: Params })
       
      .catch(this.handleError);
  }

  private getReplaceSignosNoURl(cadena : string) : string {
    return cadena.replace('+','mas');
  }

  get_EstadoSituacionCuenta(parameters): Observable<IEstadoSituacionCuenta[]> {
    let Params = new HttpParams();
    // Begin assigning parameters
    Params = Params.append('idReporte', parameters.idTipoReporte);
    Params = Params.append('idCompania', parameters.idCompania);
    Params = Params.append('periodoYear', parameters.periodoYear);
    Params = Params.append('periodoMes', parameters.periodoMes);
    Params = Params.append('idConcepto', parameters.idConcepto);

    return this._http.get<IEstadoSituacionCuenta[]>(this._urlEstadoSituacionCuenta, { params: Params })
      .catch(this.handleError);
  }

}
