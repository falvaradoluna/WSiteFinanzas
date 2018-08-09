export interface ISeries {
  unidadYear: number;
  estatus: string;
  idCliente: number;
  clienteRazonSocial: string;
  clienteRFC: string;
  vendedor: string;
  pedido: number;
  factura: string;
  InventarioNumero: number;
  serieNumero: string;
  precioBase: number;
  impuestoISAN: number;
  ivaPorcentaje: number;
  ivaImporte: number;
  importeTotal: number;
  costo: number;
  incentivo: number;
  costoTotal: number;
  utilidad: number;
  cantidad: number;
  facturaFecha: Date;
  unidadDescripcion: string;
}
