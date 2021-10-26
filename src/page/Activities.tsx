import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import TextColor from "../components/TextColor";
import moment from "moment";
import { useState } from "react";
import { IData } from "../interfaces/Configuration";
import { useConfig } from "../context/Configuration";

const Activities = () => {
  const { config } = useConfig();

  const [rowData, setRowData] = useState<IData>({ ...config });
  const [countClient, setCountClient] = useState(1);
  const [countActivity, setCountActivity] = useState(1);
  const [dateStart, setDateStart] = useState(moment().format("HH:mm:ss"));

  const Duration = () => {
    let dateEnd = moment().format("HH:mm:ss");

    const start = desfragmentHours(dateStart);
    const end = desfragmentHours(dateEnd);

    const [hour, minutes, seconds] = [
      end.hours - start.hours,
      end.minutes - start.minutes,
      end.seconds - start.seconds,
    ];

    setRowData({
      ...rowData,
      duration: `${isMayor(hour)}:${isMayor(minutes)}:${isMayor(seconds)}`,
      dateEnd,
      dateStart,
      nActivity: countActivity + "",
      nCliente: countClient + "",
    });
    setDateStart(moment().format("HH:mm:ss"));
  };

  const nextActivity = () => {
    Duration();
    setCountActivity((state) => state + 1);
    console.log(rowData);
  };

  const onChange = (key: string, value?: string) => {
    setRowData({ ...rowData, [key]: value });
  };

  const onGetErrorMessage = (value: string) => {
    return value.length > 1 ? "" : "Este campo es obligatorio";
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      <TextColor>Actividad</TextColor>
      <TextField
        defaultValue={countClient + ""}
        label="N°Cliente"
        required
        underlined
        onChange={(_, value) => onChange("nCliente", value)}
      />
      <TextField
        label="N°Actividad"
        value={countActivity + ""}
        required
        underlined
        onChange={(_, value) => onChange("nActivity", value)}
      />
      <TextField
        label="Hora Inicio"
        value={dateStart}
        required
        underlined
        onChange={(_, value) => onChange("dateStart", value)}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        label="Producto"
        required
        underlined
        defaultValue={rowData.product}
        onChange={(_, value) => onChange("product", value)}
      />
      <TextField
        label="Codigo"
        onChange={(_, value) => onChange("codeActivity", value)}
        required
        underlined
      />
      <TextField
        label="Observacion:"
        underlined
        multiline
        autoAdjustHeight
        defaultValue={rowData.commentary}
        onChange={(_, value) => onChange("commentary", value)}
      />
      <TextField
        label="Hora Final"
        defaultValue={rowData.dateEnd}
        onChange={(_, value) => onChange("dateEnd", value)}
        underlined
      />
      <TextField
        label="Duraccion"
        required
        underlined
        defaultValue={rowData.duration}
        onChange={(_, value) => onChange("duration", value)}
      />
      <PrimaryButton onClick={nextActivity} text="Siguiente Actividad" />
      <PrimaryButton text="Siguiente Cliente" />
    </Stack>
  );
};

export default Activities;

function desfragmentHours(time: string) {
  return {
    hours: parseInt(time.substr(0, 2)),
    minutes: parseInt(time.substr(3, 2)),
    seconds: parseInt(time.substr(6, 2)),
  };
}

function isMayor(number: number) {
  return number > 9 ? `${number}` : `0${number}`;
}
