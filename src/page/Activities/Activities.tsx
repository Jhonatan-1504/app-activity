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
import CommadClient from "./CommadClient";
import CommadActivity from "./CommadActivity";

const Activities = () => {
  const { data, setData, setTemp, temp, CleanTemp, nActivity, nCliente } =
    useActivities();

  const [rowData, setRowData] = useState<IData>(temp);
  const [isCorrect, setIsCorrect] = useState(false);

  const [dateStart, setDateStart] = useState("");

  const Duration = (dateEnd: string) => {
    const isMayor = (number: number) =>
      number > 9 ? number + "" : `0${number}`;

    let formatDateEnd = moment(dateEnd);
    let second = formatDateEnd.diff(dateStart, "second") % 60;
    let minute = formatDateEnd.diff(dateStart, "minute") % 60;
    let hour = formatDateEnd.diff(dateStart, "hour");

    return `${isMayor(hour)}:${isMayor(minute)}:${isMayor(second)}`;
  };

  const SaveAll = () => {
    let dateEnd = moment().format("Y-M-D HH:mm:ss");
    let duration = Duration(dateEnd);

    let objectData = {
      ...rowData,
      duration,
      nCliente,
      nActivity,
      dateStart: dateStart.split(" ")[1],
      dateEnd: dateEnd.split(" ")[1],
      categoryActivity: rowData.codeActivity?.substr(0, 1),
    };

    setData(objectData);
  };

  const handleFinished = () => {
    CleanTemp();
    setIsCorrect(true);
    SaveAll();
    setTimeout(() => setIsCorrect(false), 1000);
  };

  const HandleWaiting = () => {
    let objectTemporal = {
      ...rowData,
      nCliente,
      nActivity,
      dateStart,
    };
    setTemp(objectTemporal);
  };

  const handleNewStartDate = () => {
    setDateStart(moment().format("Y-M-D HH:mm:ss"));
  };

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
      <CommadClient />
      <CommadActivity />
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
