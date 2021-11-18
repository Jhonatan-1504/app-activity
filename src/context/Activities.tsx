import {
  createContext,
  FC,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { appActivity } from "../action/AppActivity";
import { IContextData, IData } from "../interfaces/Configuration";

export const INIT_OBJECT_ITEM = { nClient: 0, nActivity: 0, id: "", dateStart: "" };

const contextActivities = createContext<IContextData>({
  data: [],
  objectItem: INIT_OBJECT_ITEM,
  setObjectItem: () => null,
  cleanAllData: () => null,
  getLastObject: () => null,
  getCurrentClien: () => null,
  addNewData: (s) => null,
  updateData:(s)=>null,
  deleteData: (id) => null,
});

export const saveName = () => {
  let currentDay = new Date();
  return `${currentDay.getDate()}.${currentDay.getMonth() + 1}`;
};

export const getLocalData = () => {
  const fileNameDB = saveName();
  const getStorage = localStorage.getItem(fileNameDB);
  const getAllData: IData[] = getStorage ? JSON.parse(getStorage) : [];
  return {
    getAllData,
    fileNameDB,
  };
};

export const useActivities = () => useContext(contextActivities);

export const ActivitiesProvider: FC = ({ children }) => {
  const { fileNameDB, getAllData } = getLocalData();

  const [state, dispatch] = useReducer(appActivity, { data: getAllData });
  const [objectItem, setObjectItem] = useState<IData>(INIT_OBJECT_ITEM);

  /* STORAGE */

  const addNewData = (item: IData) => {
    dispatch({ type: "ADD_TASK", item });
  };

  const updateData = (item: IData) => {
    dispatch({ type: "UPDATE_TASK", item });
  };

  const deleteData = (id: string) => {
    dispatch({ type: "DELETE_TASK", id });
  };

  const cleanAllData = () => {
    dispatch({ type: "CLEAN_TASK", payload: "" });
  };
  /* GET OBJECT DATA */

  const getLastObject = () => {
    if (state.data.length) return state.data[state.data.length - 1];
    return null;
  };

  const getCurrentClien = (nActivity: number) => {
    if (state.data.length) return state.data[state.data.length - 1 - nActivity];
    return null;
  };

  useEffect(() => {
    localStorage.setItem(fileNameDB, JSON.stringify(state.data));
  }, [state.data, fileNameDB]);

  return (
    <contextActivities.Provider
      value={{
        ...state,
        addNewData,
        updateData,
        cleanAllData,
        getLastObject,
        getCurrentClien,
        objectItem,
        setObjectItem,
        deleteData,
      }}
    >
      {children}
    </contextActivities.Provider>
  );
};
