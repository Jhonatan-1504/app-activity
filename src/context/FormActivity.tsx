import moment from "moment";
import { createContext, FC, useContext, useState } from "react";
import { IContextForm, IData } from "../interfaces/Configuration";
import { useActivities } from "./Activities";

export const FormContext = createContext<IContextForm>({
  activity: { nActivity: 1, nClient: 1 },
  handleChange: () => {},
  handleSubmit: () => {},
  handleRecord: () => {},
  handleClean: () => {},
  dateStart: "",
  nActivity: 1,
  nClient: 1,
  setDateStart: null,
  setNClient: null,
  setNActivity: null,
});

export const useFormContext = () => useContext(FormContext);

export const FormProvider: FC = ({ children }) => {
  const { setData } = useActivities();

  let temporalStorage = localStorage.getItem("temp");
  let temp: IData = temporalStorage ? JSON.parse(temporalStorage) : {};

  const [activity, setActivity] = useState<IData>(temp);

  const [nClient, setNClient] = useState(temp.nClient ? temp.nClient : 1);
  const [nActivity, setNActivity] = useState(temp.nActivity ? temp.nActivity : 1);

  const [dateStart, setDateStart] = useState(
    temp.dateStart ? temp.dateStart : moment().format("Y/M/D HH:mm:ss")
  );

  const handleChange = (key: string, value?: string | number) => {
    setActivity({ ...activity, [key]: value });
  };

  const setDuration = (dateEnd: string) => {
    const isMayor = (number: number) =>
      number > 9 ? number + "" : `0${number}`;

    let formatDateEnd = moment(dateEnd);
    let second = formatDateEnd.diff(dateStart, "second") % 60;
    let minute = formatDateEnd.diff(dateStart, "minute") % 60;
    let hour = formatDateEnd.diff(dateStart, "hour") % 24;

    return `${isMayor(hour)}:${isMayor(minute)}:${isMayor(second)}`;
  };

  const handleSubmit = () => {
    let dateEnd = moment().format("Y/M/D HH:mm:ss");
    let duration = setDuration(dateEnd);

    let obj: IData = {
      ...activity,
      nClient,
      nActivity,
      duration,
      dateEnd: dateEnd.split(" ")[1],
      dateStart: dateStart.split(" ")[1],
    };
    setData(obj);
    setDateStart(moment().format("Y/M/D HH:mm:ss"));
    setNActivity((state: number) => state * 1 + 1);
    localStorage.removeItem("temp");
  };

  const handleRecord = () => {
    let obj: IData = {
      ...activity,
      nClient,
      nActivity,
      dateStart,
    };
    localStorage.setItem("temp", JSON.stringify(obj));
  };

  const handleClean = () => {
    setActivity({ nClient: 1, nActivity: 1 });
  };

  return (
    <FormContext.Provider
      value={{
        activity,
        handleChange,
        handleSubmit,
        handleRecord,
        handleClean,
        dateStart,
        nClient,
        nActivity,
        setNClient,
        setNActivity,
        setDateStart,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
