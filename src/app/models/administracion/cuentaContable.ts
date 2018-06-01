import { CompaniaCuentaContable } from "./companiaCuentaContable";

export class CuentaContable {
  public id: number;
  public numeroCuenta: string;
  public Concepto: string;
  public idNaturaleza: number;
  public idCuentaDetalle: number;
  public idBalanceNivel01: number;
  public idBalanceNivel02: number;
  public idBalanceNivel03: number;
  // public idEstadoResultados: number;
  public idEstadoResultadosI: number;
  public idDictamen: number;
  // public idEstadoFinancieroInterno: number;
  public idNotasDictamen: number;
  public idNotasFinanciero: number;
  public idSituacion: number;
  public idSucursal: number;
  public idDepartamento: number;
  public departamento: string;
  public idSucursalSecuencia: number;
  public idFlujoEfectivo: number;
  public idNotasFinancieras: number;
  public idEstadoResultadosInternoConcepto: number;
  public eFInterno: string;
  public idEFInterno: number;
  public descripcion: string;
  public companias: CompaniaCuentaContable[];
  public enviarcuenta: boolean;
  public idAfectaCuentaContable: number;
  public grupoSATCuentaContable: string;
  public CreacionFecha: string;
}