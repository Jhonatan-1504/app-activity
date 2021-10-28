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
  const [dateStart, setDateStart] = useState(moment().format("Y/M/D HH:mm:ss"));

  const isMayor = (number: number) => (number > 9 ? number + "" : `0${number}`);

  const Duration = () => {
    let dateEnd = moment().format("Y-M-D HH:mm:ss");

    let formtDateEnd = moment(dateEnd);

    let second = formtDateEnd.diff(dateStart, "second");
    let minute = formtDateEnd.diff(dateStart, "minute");
    let hour = formtDateEnd.diff(dateStart, "hour");

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

  useEffect(() => {
    if(data.length){
      let activity = data[data.length - 1].nActivity;
      let client = data[data.length - 1].nCliente;
      setCountActivity(activity ? (activity > 1 ? activity + 1 : 1) : 1);
      setCountClient(client ? client : 1);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
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
        id="client_id"
        readOnly
        underlined
        onChange={(_, value) => onChange("nCliente", value)}
      />
      <TextField
        label="N°Actividad"
        value={countActivity + ""}
        required
        readOnly
        underlined
        id="activity_id"
        onChange={(_, value) => onChange("nActivity", value)}
      />

      <TextField
        label="Producto"
        required
        id="product_id"
        underlined
        onChange={(_, value) => onChange("product", value)}
      />
      <TextField
        label="Codigo"
        onChange={(_, value) => onChange("codeActivity", value)}
        id="code_id"
        required
        underlined
      />
      <TextField
        label="Observacion:"
        underlined
        multiline
        id="commentary_id"
        autoAdjustHeight
        onChange={(_, value) => onChange("commentary", value)}
      />
      <PrimaryButton onClick={nextActivity} text="Siguiente Actividad" />
      <PrimaryButton onClick={nextClient} text="Siguiente Cliente" />
    </Stack>
  );
};

export default Activities;
