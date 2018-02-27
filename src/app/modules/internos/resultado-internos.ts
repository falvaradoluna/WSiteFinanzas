export interface IResultadoInternos {
  idOrigen: number;
  descripcion: string;
  cantidad: number;
  cantidadPresupuesto: number;
  presupuestoPorcentaje: number;
  porcentaje: number;
  variacion: number;
  porcentajeVariacion: number;
  cantidadAcumulado: number;
  cantidadPresupuestoAcumulado: number;
  presupuestoPorcentajeAcumulado: number;
  porcentajeAcumulado: number;
  variacionAcumulado: number;
  porcentajeVariacionAcumulado: number;
  idEstadoResultadosI: number;
  Concepto: string;
  Real: number;
  Perc1: number;
  PPto: number;
  Perc2: number;
  Variacion: number;
  Perc3: number;
  AcReal: number;
  AcPerc1: number;
  AcPPto: number;
  AcPerc2: number;
  AcVariacion: number;
  AcPerc3: number;
}
