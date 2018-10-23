import { IReportePlantaSheet } from './reportePlantaSheet'
import { IPlantillaDetalle } from './reportePlantillaPlantaDetalle';
export interface IReportePlantaConfigExcel {
    nameColumn: string;   
}

export interface IReportePlantaConfigSheet {
    data: IData[];
    sheet: IReportePlantaSheet[];
    idTemplate: number;
    dataDetails: IPlantillaDetalle[]
}

export interface IData {
    id: number;
    idPlantilla: number;
    idHoja:number;
    Etiqueta: string;
    ValorEtiqueta:string;
    etiquetaDetalle: boolean
}