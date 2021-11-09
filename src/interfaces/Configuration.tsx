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
  nClient: number;
  nActivity: number;
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
  getLastObject: () => IData | null;
  Clean?: any;
}

export interface IContextForm {
  activity: IData;
  setActivity?: any;
  handleChange: (key: string, value?: string | number) => void;
  handleSubmit:()=>void;
  handleRecord:()=>void;
  handleClean:()=>void;
  dateStart:string;
  nClient:number;
  nActivity:number;
  setDateStart:any;
  setNClient:any;
  setNActivity:any;
}
