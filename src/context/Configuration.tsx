import { createContext, FC, useContext, useState } from "react";
import {
  Iconfiguration,
  IContextConfiguration,
} from "../interfaces/Configuration";

const ContextConfig = createContext<IContextConfiguration>({});

export const useConfig = () => useContext(ContextConfig);

export const ConfigProvider: FC = ({ children }) => {
  let day = new Date();
  let saveName = `${day.getDate()}.${day.getMonth() + 1}`

  let configAll = localStorage.getItem("config");

  const getConfiguration: Iconfiguration =configAll && configAll !== null ? JSON.parse(configAll) : {};

  const [config, setConfig] = useState<Iconfiguration>(getConfiguration);

  const setConfiguration = (config: Iconfiguration) => {
    localStorage.setItem("config", JSON.stringify(config));
    setConfig(config);
  };

  const setClean = () => {
    localStorage.setItem("config", "");
  };

  const fileName = `REPORTE ${config.sede?.toUpperCase()} ${saveName} - ${config.nameController?.toUpperCase()}`

  return (
    <ContextConfig.Provider
      value={{ config, setConfig: setConfiguration, setClean,fileName }}
    >
      {children}
    </ContextConfig.Provider>
  );
};
