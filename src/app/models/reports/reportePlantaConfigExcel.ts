import { IReportePlantaSheet } from './reportePlantaSheet'
export interface IReportePlantaConfigExcel {
    nameColumn: string;   
}

export interface IReportePlantaConfigSheet {
    data: IData[];
    sheet: IReportePlantaSheet[];
}

export interface IData {
    idPlantilla: number;
    Etiqueta: string;
    ValorEtiqueta:string;
    idHoja:number;
}