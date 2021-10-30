import { createContext, FC, useContext, useState } from "react";
import { IContextData, IData } from "../interfaces/Configuration";

const contextActivities = createContext<IContextData>({ data: [], temp: {} });

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

  const CleanTemp = () =>{ localStorage.removeItem("temp");}

  const Clean = () => {
    localStorage.removeItem(saveName);
    setData([]);
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
      }}
    >
      {children}
    </contextActivities.Provider>
  );
};
