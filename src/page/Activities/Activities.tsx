import {
  DefaultButton,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { IData } from "../../interfaces/Configuration";
import { useActivities } from "../../context/Activities";
import TextColor from "../../components/TextColor";
import moment from "moment";
import Message from "../List/Message";
import CommadDate from "./CommadDate";

const Activities = () => {
  const { data, setData, setTemp, temp, CleanTemp } = useActivities();

  const [rowData, setRowData] = useState<IData>(temp);
  const [isCorrect, setIsCorrect] = useState(false);

  const [dateStart, setDateStart] = useState("");

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
    };

    setData(objectData);
  };

  const handleFinished = () => {
    CleanTemp();
    setIsCorrect(true);
    Duration();
    setTimeout(() => setIsCorrect(false), 1000);
  };

  const HandleWaiting = () => {
    let objectTemporal = {
      ...rowData,
      dateStart,
    };
    setTemp(objectTemporal);
  };

  const handleNewStartDate = () =>
    setDateStart(moment().format("Y-M-D HH:mm:ss"));

  const onChange = (key: string, value?: string) => {
    setRowData({ ...rowData, [key]: value });
  };

  useEffect(() => {
    if (temp.dateStart) {
      setDateStart(temp.dateStart);
      return;
    }
    if (data) {
      setDateStart(moment().format("Y/M/D HH:mm:ss"));
      return;
    }
  }, [data, temp]);

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      <Stack>{isCorrect ? <Message /> : null}</Stack>
      <CommadDate dateStart={dateStart} onClick={handleNewStartDate} />
      <TextColor>Actividad</TextColor>
      <TextField
        defaultValue={rowData.nCliente}
        label="N°Cliente"
        required
        underlined
        onChange={(_, value) => onChange("nCliente", value)}
      />
      <TextField
        label="N°Actividad"
        defaultValue={rowData.nActivity}
        required
        underlined
        onChange={(_, value) => onChange("nActivity", value)}
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
        defaultValue={rowData.codeActivity}
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
      <Stack horizontal horizontalAlign="space-between">
        <DefaultButton onClick={HandleWaiting} text="Espere" />
        <PrimaryButton onClick={handleFinished} text="Terminar" />
      </Stack>
    </Stack>
  );
};

export default Activities;
