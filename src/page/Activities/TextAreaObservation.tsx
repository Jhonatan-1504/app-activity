import { TextField } from "@fluentui/react";
import { useFormContext } from "../../context/FormActivity";

const TextAreaObservation = () => {
  const { commentary, setCommentary } = useFormContext();

  return (
    <TextField
      label="Observacion"
      multiline
      rows={3}
      onChange={(ev, val) => setCommentary(val)}
      value={commentary}
    />
  );
};

export default TextAreaObservation;
