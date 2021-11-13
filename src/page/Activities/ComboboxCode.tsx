import { TextField } from "@fluentui/react";
import { useFormContext } from "../../context/FormActivity";

const ComboboxCode = () => {
  const { codeActivity, setCodeActivity } = useFormContext();

  return (
    <TextField
      label="Codigo"
      required
      value={codeActivity}
      onChange={(ev, val) => setCodeActivity(val)}
    />
  );
};

export default ComboboxCode;
