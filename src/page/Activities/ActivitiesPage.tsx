import {
  DefaultButton,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { useFormContext } from "../../context/FormActivity";
import ComboboxCode from "./ComboboxCode";
import ComboboxProduct from "./ComboboxProduct";
import CommadActivity from "./CommadActivity";
import CommadClient from "./CommadClient";
import CommadDate from "./CommadDate";
import SuccessAlert from "./SuccessAlert";
import TextAreaObservation from "./TextAreaObservation";

const Activities = () => {
  const { isLoading,handleRecord,handleSubmit,handleClean} = useFormContext();

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      {isLoading ? <SuccessAlert /> : null}
      <CommadDate />
      <CommadClient />
      <CommadActivity />
      <ComboboxProduct />
      <ComboboxCode />
      <TextAreaObservation />
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
