import { IComboBoxOption } from "@fluentui/react";
import moment from "moment";
import { createContext, FC, useContext, useState } from "react";
import { IContextForm, IData } from "../interfaces/Configuration";
import { useActivities } from "./Activities";

export const FormContext = createContext<IContextForm>({
  handleSubmit: () => {},
  handleRecord: () => {},
  handleClean: () => {},
  isLoading: false,
  dateStart: "",
  nActivity: 1,
  nClient: 1,
  commentary: "",
  codeActivity: "",
  product: { text: "", key: "" },
  setProduct: null,
  setDateStart: null,
  setNClient: null,
  setNActivity: null,
  setCommentary: null,
  setCodeActivity: null,
});

export const useFormContext = () => useContext(FormContext);

export const FormProvider: FC = ({ children }) => {
  const { setData } = useActivities();

  let temporalStorage = localStorage.getItem("temp");
  let temp: IData = temporalStorage ? JSON.parse(temporalStorage) : {};

  const [isLoading, setIsLoading] = useState(false);

  const [nClient, setNClient] = useState(temp.nClient ? temp.nClient : 1);
  const [nActivity, setNActivity] = useState(
    temp.nActivity ? temp.nActivity : 1
  );
  const [product, setProduct] = useState<IComboBoxOption>(
    temp.product && typeof temp.product !== "string"
      ? temp.product
      : { key: "nulo", text: "No tiene" }
  );
  const [dateStart, setDateStart] = useState(
    temp.dateStart ? temp.dateStart : moment().format("Y/M/D HH:mm:ss")
  );
  const [commentary, setCommentary] = useState(
    temp.commentary ? temp.commentary : ""
  );
  const [codeActivity, setCodeActivity] = useState(
    temp.codeActivity ? temp.codeActivity : ""
  );

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
    setIsLoading(true);

    let dateEnd = moment().format("Y/M/D HH:mm:ss");
    let duration = setDuration(dateEnd);

    let obj: IData = {
      nClient,
      nActivity,
      duration,
      codeActivity,
      commentary,
      product: product.text !== "No tiene" ? product.text : "",
      categoryActivity: codeActivity?.split("")[0],
      dateEnd: dateEnd.split(" ")[1],
      dateStart: dateStart.split(" ")[1],
    };
    setData(obj);
    setDateStart(moment().format("Y/M/D HH:mm:ss"));
    setNActivity((state: number) => state * 1 + 1);
    setCodeActivity("");
    setCommentary("");

    localStorage.removeItem("temp");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleRecord = () => {
    let obj: IData = {
      codeActivity,
      commentary,
      nClient,
      nActivity,
      dateStart,
      product,
    };
    localStorage.setItem("temp", JSON.stringify(obj));
  };

  const handleClean = () => {
    setCodeActivity("");
    setCommentary("");
    setProduct({ key: "nulo", text: "No tiene" });
  };

  return (
    <FormContext.Provider
      value={{
        handleSubmit,
        handleRecord,
        handleClean,
        dateStart,
        nClient,
        nActivity,
        commentary,
        codeActivity,
        setNClient,
        setNActivity,
        setDateStart,
        setCommentary,
        setCodeActivity,
        isLoading,
        product,
        setProduct,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
