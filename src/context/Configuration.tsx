import { createContext, FC, useContext, useState } from "react";
import {
  Iconfiguration,
  IContextConfiguration,
} from "../interfaces/Configuration";

const ContextConfig = createContext<IContextConfiguration>({});

export const useConfig = () => useContext(ContextConfig);

export const ConfigProvider: FC = ({ children }) => {
  const [config, setConfig] = useState<Iconfiguration>({});

  return (
    <ContextConfig.Provider value={{ config, setConfig }}>
      {children}
    </ContextConfig.Provider>
  );
};
