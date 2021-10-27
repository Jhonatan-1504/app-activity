import {
  DefaultButton,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import TextColor from "../components/TextColor";
import moment from "moment";
import { useEffect, useState } from "react";
import { IData } from "../interfaces/Configuration";
import { useActivities } from "../context/Activities";

const Activities = () => {
  const { data, setData } = useActivities();

  const [rowData, setRowData] = useState<IData>({});

  const [countClient, setCountClient] = useState(1);
  const [countActivity, setCountActivity] = useState(1);
  const [dateStart, setDateStart] = useState("");

  const isMayor = (number: number) => (number > 9 ? number + "" : `0${number}`);

  const Duration = () => {
    let dateEnd = moment().format("Y-M-D HH:mm:ss");

    let second = moment(dateEnd).diff(dateStart, "second");
    let minute = moment(dateEnd).diff(dateStart, "minute");
    let hour = moment(dateEnd).diff(dateStart, "hour");

    let duration = `${isMayor(hour)}:${isMayor(minute)}:${isMayor(second)}`;

    let objectData = {
      ...rowData,
      duration,
      dateStart: dateStart.split(" ")[1],
      dateEnd: dateEnd.split(" ")[1],
      categoryActivity: rowData.codeActivity?.substr(0, 1),
      nActivity: countActivity,
      nCliente: countClient,
    };

    setData(objectData);
  };

  const nextActivity = () => {
    Duration();
    setCountActivity((state) => state + 1);
  };

  const nextClient = () => {
    Duration();
    setCountActivity(1);
    setCountClient((state) => state + 1);
  };

  const onChange = (key: string, value?: string) => {
    setRowData({ ...rowData, [key]: value });
  };

  const Clear = () => {
    setRowData({});
  };

  const onGetErrorMessage = (value: string) => {
    return value.length > 1 ? "" : "Este campo es obligatorio";
  };

  useEffect(() => {
    if (data) {
      let activity = data[data.length - 1].nActivity;
      let client = data[data.length - 1].nCliente;

      setCountActivity(activity ? (activity > 1 ? activity + 1 : 1) : 1);
      setCountClient(client ? client : 1);
      setDateStart(moment().format("Y/M/D HH:mm:ss"));
    }
  }, [data]);

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      <Stack horizontal horizontalAlign="space-between">
        <DefaultButton disabled onClick={Clear} text="Limpiar" />
        <DefaultButton disabled text="Mostrar" />
      </Stack>
      <TextColor>Actividad</TextColor>
      <TextField
        value={countClient + ""}
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
        value={dateStart.split(" ")[1]}
        required
        underlined
        onChange={(_, value) => onChange("dateStart", value)}
        onGetErrorMessage={onGetErrorMessage}
      />
      <TextField
        label="Producto"
        required
        underlined
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
        onChange={(_, value) => onChange("commentary", value)}
      />
      <PrimaryButton onClick={nextActivity} text="Siguiente Actividad" />
      <PrimaryButton onClick={nextClient} text="Siguiente Cliente" />
    </Stack>
  );
};

export default Activities;
