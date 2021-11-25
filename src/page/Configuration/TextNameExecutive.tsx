import { TextField } from "@fluentui/react";
import { useConfiguration } from "../../context/FormConfig";

const TextNameExecutive = () => {
  const { nameExecutive, setNameExecutive,error } = useConfiguration();

  const getErrorMessage = (value: string): string => {
    if (error && error.split(" ")[1] === "Funcionario") return error;
    return value.length > 1 ? "" : `Este campo es importante`;
  };  

  return (
    <TextField
      label="Nombre del ejecutivo"
      defaultValue={nameExecutive}
      onGetErrorMessage={getErrorMessage}
      onChange={(ev, val) => setNameExecutive(val)}
    />
  );
};

export default TextNameExecutive;
