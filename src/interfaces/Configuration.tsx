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
  nCliente?: number;
  nActivity?: number;
  dateStart?: string;
  product?: string;
  categoryActivity?: string;
  codeActivity?: string;
  commentary?: string;
  dateEnd?: string;
  duration?: string;
}

export interface IContextData {
  data: IData[];
  setData?: any;
}
