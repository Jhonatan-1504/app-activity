import { IComboBoxOption } from "@fluentui/react";

export interface Iconfiguration {
  sede?: string;
  date?: string;
  marketStall?: string;
  nameExecutive?: string;
  nameController?: string;
}

export interface IContextConfiguration {
  config?: Iconfiguration;
  setConfig?: any;
  setClean?: any;
  fileName?: any;
}

export interface IData extends Iconfiguration {
  id: string;
  nClient: number;
  nActivity: number;
  dateStart: string;
  product?: IComboBoxOption;
  categoryActivity?: string;
  codeActivity?: string;
  commentary?: string;
  dateEnd?: string;
  duration?: string;
}

export interface IContextData {
  data: IData[];
  addNewData: (item: IData) => void;
  updateData: (item: IData) => void;
  deleteData:(id:string)=>void;
  patchDateFinally:(id:string)=>void;
  cleanAllData: () => void;
  getLastObject: () => IData | null;
  getCurrentClien: (nActivity: number) => IData | null;
  objectItem: IData;
  setObjectItem: any;
}

export interface IContextForm {
  setActivity?: any;
  handleSubmit: () => void;
  handleRecord: () => void;
  handleClean: any;
  dateStart: string;
  nClient: number;
  nActivity: number;
  commentary: string;
  codeActivity: string;
  product: IComboBoxOption;
  setDateStart: any;
  setNClient: any;
  setNActivity: any;
  setProduct: any;
  setCommentary: any;
  setCodeActivity: any;
  isLoading: boolean;
}
