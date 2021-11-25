import { TextField } from "@fluentui/react";
import { useConfiguration } from "../../context/FormConfig";

const TextController = () => {
  const { nameController, setNameController, error } = useConfiguration();

  const getErrorMessage = (value: string): string => {
    if (error && error.split(" ")[1] === "Controlador") return error;
    return value.length > 1 ? "" : `Este campo es importante`;
  };

  return (
    <TextField
      label="Controlador"
      defaultValue={nameController}
      onChange={(ev, val) => setNameController(val)}
      onGetErrorMessage={getErrorMessage}
    />
  );
};

export default TextController;
