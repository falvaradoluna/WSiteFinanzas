import { IEstadoResultadosIReporte } from "./reportePlantaEstadoResultadosI";
import { IDepartamentoReporte } from "./reportePlantaDepartamento";

export interface IPlantillaDetalle {
    idEtiqueta: Number;
    etiqueta: string;
    ValorEtiqueta: string;
    valorEtiquetaDetalle: string;
    idSeccionReporte: Number;
    idOrigen: Number;
    idDepartamento: any[];
    idEstadoResultadosI: any[];
    idClasificacionPlanta: Number;
    idAlieacionText: Number;
    idTipoPeriodo: Number;
    idEstadoDePerdidaYGanancia: number;
    otro: number;
    // departamentoReporte: IDepartamentoReporte[];
    // estadoResultadosIReporte: IEstadoResultadosIReporte[]
}