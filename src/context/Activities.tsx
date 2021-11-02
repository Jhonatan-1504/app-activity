import { createContext, FC, useContext, useState } from "react";
import { IContextData, IData } from "../interfaces/Configuration";

const contextActivities = createContext<IContextData>({
  data: [],
  temp: { nActivity: 1, nCliente: 1 },
  getNextClient: () => 1,
  getNextActivity: () => 1,
  nActivity: 1,
  nCliente: 1,
});

export const useActivities = () => useContext(contextActivities);

export const ActivitiesProvider: FC = ({ children }) => {
  let day = new Date();
  let saveName = `${day.getDate()}.${day.getMonth() + 1}`;

  let datAll = localStorage.getItem(saveName);
  let dataTemp = localStorage.getItem("temp");

  const getData: IData[] = datAll && datAll !== null ? JSON.parse(datAll) : [];
  const getTempData: IData =
    dataTemp && dataTemp !== null ? JSON.parse(dataTemp) : {};

  const [data, setData] = useState<IData[]>(getData);
  const [temp, setTemp] = useState<IData>(getTempData);

  const setSaveData = (item: IData) => {
    setData([...data, item]);
    localStorage.setItem(saveName, JSON.stringify([...data, item]));
  };

  const setSaveTemp = (item: IData) => {
    setTemp(item);
    localStorage.setItem("temp", JSON.stringify(item));
  };

  const CleanTemp = () => {
    localStorage.removeItem("temp");
  };

  const Clean = () => {
    localStorage.removeItem(saveName);
    setData([]);
  };

  const getLastObject = () => {
    return data[data.length - 1];
  };

  const getNextActivityInit = () => {
    if (!data.length) return 1;

    let { nActivity } = getLastObject();

    return nActivity ? nActivity * 1 + 1 : 1;
  };

  const getNextClientInit = () => {
    if (!data.length) return 1;

    let {nCliente} = getLastObject()

    return nCliente?nCliente*1+1:1
  };

  const [nActivity, setNActivity] = useState(
    temp.nActivity ? temp.nActivity : getNextActivityInit()
  );
  const [nCliente, setNCliente] = useState(
    temp.nCliente ? temp.nCliente : getNextClientInit()
  );

  const getNextActivity = ()=>{
    let actividad = getNextActivityInit()

    if(temp.nCliente && temp.nCliente !== nCliente) return 1

    return actividad
  }

  const getNextClient = ()=>{
    let client = getNextClientInit() - 1

    if(nCliente === 0) return data[data.length - 1 - nActivity].nCliente + 1

    return client + 1
  }

  const setNActivityRender = (number: number) => {
    setNActivity(number);
    setSaveTemp({ ...temp, nActivity: number });
  };

  const setNClientRender = (number: number) => {
    setNCliente(number);
    setSaveTemp({ ...temp, nCliente: number });
  };

  return (
    <contextActivities.Provider
      value={{
        data,
        setData: setSaveData,
        Clean,
        CleanTemp,
        setTemp: setSaveTemp,
        temp,
        getNextActivity,
        getNextClient,
        nActivity,
        nCliente,
        setNActivity: setNActivityRender,
        setNCliente: setNClientRender,
      }}
    >
      {children}
    </contextActivities.Provider>
  );
};
