import { createContext, FC, useContext, useState } from "react";
import { IContextData, IData } from "../interfaces/Configuration";

const contextActivities = createContext<IContextData>({ data: [] });

export const useActivities = () => useContext(contextActivities);

export const ActivitiesProvider: FC = ({ children }) => {
  let day = new Date();
  let saveName = `${day.getDate()}.${day.getMonth() + 1}`;

  let datAll = localStorage.getItem(saveName);

  const getData: IData[] = datAll && datAll !== null ? JSON.parse(datAll) : [];

  const [data, setData] = useState<IData[]>(getData);

  const setSaveData = (item: IData) => {
    setData([...data, item]);
    localStorage.setItem(saveName, JSON.stringify([...data, item]));
  };

  const Clean = () =>{
    localStorage.removeItem(saveName)
    setData([])
  }

  return (
    <contextActivities.Provider value={{ data, setData: setSaveData,Clean }}>
      {children}
    </contextActivities.Provider>
  );
};
