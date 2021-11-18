import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import { useState } from "react";
import { Iconfiguration } from "../interfaces/Configuration";
import TextColor from "../components/TextColor";
import { useConfig } from "../context/Configuration";
import moment from "moment";
import { useHistory } from "react-router-dom";

const calendarIcons = { iconName: "Calendar" };

const Configuration = () => {
  const { setConfig, config } = useConfig();

  const initialState: Iconfiguration = {
    ...config,
    sede: "San Isidro",
    date: moment().format("D/M/Y"),
    marketStall: "Ejecutivo de Negocios BEX DIGITAL",
  };

  const [configuration, setConfiguration] =
    useState<Iconfiguration>(initialState);
  const navegation = useHistory();

  const onChange = (key: string, value?: string) => {
    setConfiguration({ ...configuration, [key]: value });
  };

  const onClick = () => {
    if (
      !configuration.sede ||
      !configuration.date ||
      !configuration.marketStall ||
      !configuration.nameController ||
      !configuration.nameExecutive
    )
      return;
    setConfig(configuration);
    navegation.push("/");
  };

  const onGetErrorMessage = (value: string) => {
    return value.length > 1 ? "" : "Este campo es obligatorio";
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      <TextColor>Configuraciones</TextColor>
      <TextField
        defaultValue={configuration.sede}
        label="Sede"
        name="sede"
        required
        onChange={(_, value) => onChange("sede", value)}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        defaultValue={configuration.date}
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
        defaultValue={configuration.marketStall}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        name="nameExecutive"
        label="Nombre del Ejecutivo"
        required
        onChange={(_, value) => onChange("nameExecutive", value)}
        defaultValue={configuration.nameExecutive}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        name="nameController"
        label="Nombre del Controlador"
        required
        onChange={(_, value) => onChange("nameController", value)}
        defaultValue={configuration.nameController}
        onGetErrorMessage={onGetErrorMessage}
      />
      <PrimaryButton text="Siguiente" onClick={onClick} />
    </Stack>
  );
};

export default Configuration;
