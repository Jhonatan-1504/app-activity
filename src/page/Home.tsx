import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { Iconfiguration } from "../interfaces/Configuration";
import TextColor from "../components/TextColor";
import { useConfig } from "../context/Configuration";
import moment from "moment";
import { useHistory } from "react-router-dom";

const initialState: Iconfiguration = {
  date: moment().format("L"),
  sede: "San Isidro",
  marketStall: "Ejecutivo de Negocios BEX DIGITAL",
};

const calendarIcons = { iconName: "Calendar" };

const Home = () => {
  const { setConfig, config } = useConfig();
  const [configuration, setConfiguration] =
    useState<Iconfiguration>(initialState);
  const navegation = useHistory();

  const onChange = (key: string, value?: string) => {
    setConfiguration({ ...configuration, [key]: value });
  };

  useEffect(() => {
    if(config?.nameController){
      setConfiguration({...config})
    }
  }, [config])

  const onClick = () => {
    if (!configuration.sede) return;
    if (!configuration.date) return;
    if (!configuration.marketStall) return;
    if (!configuration.nameExecutive) return;
    if (!configuration.nameController) return;
    setConfig(configuration);
    navegation.push("/Acitivity");
  };

  const onGetErrorMessage = (value: string) => {
    return value.length > 1 ? "" : "Este campo es obligatorio";
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      <TextColor>Configuraciones</TextColor>
      <TextField
        defaultValue={config?.sede ? config.sede : configuration.sede}
        label="Sede"
        name="sede"
        required
        onChange={(_, value) => onChange("sede", value)}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        defaultValue={config?.date ? config.date : configuration.date}
        label="Fecha"
        name="date"
        required
        iconProps={calendarIcons}
        onChange={(_, value) => onChange("date", value)}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        label="Puesto"
        name="marketStall"
        required
        onChange={(_, value) => onChange("marketStall", value)}
        defaultValue={
          config?.marketStall ? config.marketStall : configuration.marketStall
        }
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        name="nameExecutive"
        label="Nombre del Ejecutivo"
        required
        onChange={(_, value) => onChange("nameExecutive", value)}
        defaultValue={config?.nameExecutive}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        name="nameController"
        label="Nombre del Controlador"
        required
        onChange={(_, value) => onChange("nameController", value)}
        defaultValue={config?.nameController}
        onGetErrorMessage={onGetErrorMessage}
      />
      <PrimaryButton text="Siguiente" onClick={onClick} />
    </Stack>
  );
};

export default Home;
