import {
  DefaultButton,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useFormContext } from "../../context/FormActivity";
import ComboboxProduct from "./ComboboxProduct";
import CommadActivity from "./CommadActivity";
import CommadClient from "./CommadClient";
import CommadDate from "./CommadDate";
import SuccessAlert from "./SuccessAlert";

const Activities = () => {
  const {
    activity,
    isLoading,
    handleChange,
    handleRecord,
    handleSubmit,
    handleClean,
  } = useFormContext();

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      {isLoading ? <SuccessAlert /> : null}
      <CommadDate />
      <CommadClient />
      <CommadActivity />
      <ComboboxProduct />
      <TextField
        label="Codigo"
        required
        defaultValue={activity.codeActivity}
        onChange={(_, val) => handleChange("codeActivity", val)}
      />
      <TextField
        label="Observacion"
        multiline
        rows={3}
        defaultValue={activity.commentary}
        onChange={(_, val) => handleChange("commentary", val)}
      />
      <Stack horizontal horizontalAlign="space-between">
        <Stack.Item styles={{ root: { flex: 1, columnGap: "10%" } }}>
          <DefaultButton text="Graba" onClick={handleRecord} />
          <DefaultButton text="Limpiar" onClick={handleClean} />
        </Stack.Item>
        <PrimaryButton text="Guarda" onClick={handleSubmit} />
      </Stack>
    </Stack>
  );
};

export default Activities;
