export interface IDepartamento {
  /*idPestana: number;
  pestanaNombre: string;
  pestanaOrdenId: number;
  Selected: boolean;
  idER: number;*/
  id: number;
  descripcion: string;
  Selected: boolean;
  idDepartamento: number;
  departamento: string;
}


export interface IDepartamentoMultiSelected {
  item_id: number;
  item_text: string;
}
