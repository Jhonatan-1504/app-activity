import { IComboBoxOption } from "@fluentui/react";
import moment from "moment";
import { createContext, FC, useContext, useState } from "react";
import { IContextForm, IData } from "../interfaces/Configuration";
import { useActivities } from "./Activities";
import { v4 as generateV4 } from "uuid";

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

function getStorageTemp(): IData {
  let temporalStorage = localStorage.getItem("temp");
  return temporalStorage ? JSON.parse(temporalStorage) : {};
}

export const useFormContext = () => useContext(FormContext);

export const FormProvider: FC = ({ children }) => {
  const { addNewData } = useActivities();

  const temp = getStorageTemp();

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

  const handleSubmit = () => {
    setIsLoading(true);

    let newItem: IData = {
      id: generateV4(),
      nClient,
      nActivity,
      codeActivity,
      commentary,
      product,
      categoryActivity: codeActivity?.split("")[0],
      dateStart,
    };

    addNewData(newItem);

    setDateStart(moment().format("Y/M/D HH:mm:ss"));
    setNActivity((state: number) => state * 1 + 1);
    setCodeActivity("");
    setCommentary("");

    localStorage.removeItem("temp");
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleRecord = () => {
    let obj: IData = {
      id: "",
      codeActivity,
      commentary,
      nClient,
      nActivity,
      dateStart,
      dateEnd: "",
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
