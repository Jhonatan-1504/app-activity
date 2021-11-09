import { createContext, FC, useContext, useState } from "react";
import { IContextData, IData } from "../interfaces/Configuration";

const contextActivities = createContext<IContextData>({
  data: [],
  getLastObject: () => {
    return { nActivity: 1, nClient: 1 };
  },
});

export const useActivities = () => useContext(contextActivities);

export const saveName = () => {
  let currentDay = new Date();
  return `${currentDay.getDate()}.${currentDay.getMonth() + 1}`;
};

export const ActivitiesProvider: FC = ({ children }) => {
  let fileNameDB = saveName();

  let allData = localStorage.getItem(fileNameDB);
  let getData: IData[] = allData ? JSON.parse(allData) : [];

  const [data, setData] = useState<IData[]>(getData);

  const setSaveData = (item: IData) => {
    setData([...data, item]);
    localStorage.setItem(fileNameDB, JSON.stringify([...data, item]));
  };

  const getLastObject = () => {
    if (data.length) return data[data.length - 1];
    return null;
  };

  const Clean = () => {
    setData([]);
    localStorage.removeItem(fileNameDB);
  };

  return (
    <contextActivities.Provider
      value={{
        data,
        setData: setSaveData,
        getLastObject,
        Clean,
      }}
    >
      {children}
    </contextActivities.Provider>
  );
};
