import { IComboBoxOption } from "@fluentui/react";
import { createContext, FC, useContext, useState } from "react";
import {
  Iconfiguration,
  IContextFormConfiguration,
} from "../interfaces/Configuration";

const SEDE = { text: "San Isidro", key: "SI" };
const MARKETSTALL = { text: "Ejecutivo de Negocios BEX DIGITAL", key: "ENBD" };
const DATE = new Date();

const INIT: IContextFormConfiguration = {
  setError: null,
  setSede: null,
  setDate: null,
  setMarketStall: null,
  setNameExecutive: null,
  setNameController: null,
  ObjectGenerate: () => ({ date: "" }),
  Verificate: () => "",
  sede: SEDE,
  date: DATE,
  marketStall: MARKETSTALL,
  nameExecutive: "",
  nameController: "",
};

const FormConfig = createContext<IContextFormConfiguration>(INIT);

export const useConfiguration = () => useContext(FormConfig);

export const ConfigurationProvider: FC = ({ children }) => {
  const temporal = localStorage.getItem("config");
  const parse = temporal && temporal !== null ? JSON.parse(temporal) : {};

  const INIT_STATE: Iconfiguration = parse;

  const [error, setError] = useState("");

  const [sede, setSede] = useState<IComboBoxOption>(
    INIT_STATE && INIT_STATE.sede !== undefined ? INIT_STATE.sede : SEDE
  );
  const [date, setDate] = useState<Date>(
    INIT_STATE && INIT_STATE.date !== undefined
      ? new Date(INIT_STATE.date)
      : DATE
  );
  const [marketStall, setMarketStall] = useState<IComboBoxOption>(
    INIT_STATE && INIT_STATE.marketStall !== undefined
      ? INIT_STATE.marketStall
      : MARKETSTALL
  );
  const [nameExecutive, setNameExecutive] = useState<string>(
    INIT_STATE && INIT_STATE.nameExecutive !== undefined
      ? INIT_STATE.nameExecutive
      : ""
  );
  const [nameController, setNameController] = useState<string>(
    INIT_STATE && INIT_STATE.nameController !== undefined
      ? INIT_STATE.nameController
      : ""
  );

  const Verificate = () => {
    if (!nameController) return "Controlador es importante";
    if (!nameExecutive) return "Funcionario es importante";
    return "";
  };

  const ObjectGenerate = (): Iconfiguration => {
    return {
      nameExecutive,
      nameController,
      sede,
      date: date + "",
      marketStall,
    };
  };

  return (
    <FormConfig.Provider
      value={{
        setError,
        error,
        Verificate,
        ObjectGenerate,
        sede,
        date,
        marketStall,
        nameController,
        nameExecutive,
        setDate,
        setMarketStall,
        setNameController,
        setNameExecutive,
        setSede,
      }}
    >
      {children}
    </FormConfig.Provider>
  );
};
