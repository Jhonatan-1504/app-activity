import { PrimaryButton, Stack } from "@fluentui/react";
import TextColor from "../../components/TextColor";
import ComboboxSede from "./ComboboxSede";
import PickerDate from "./PickerDate";
import ComboMarketSall from "./ComboMarketSall";
import TextController from "./TextController";
import TextNameExecutive from "./TextNameExecutive";
import { useConfiguration } from "../../context/FormConfig";
import { useHistory } from "react-router-dom";

const ConfigPage = () => {
  const { ObjectGenerate, Verificate, setError } = useConfiguration();

  const history = useHistory();

  const handleSubmit = () => {
    let msg = Verificate();
    if (msg.length > 1) return setError(msg);

    //create obj to save
    let obj = ObjectGenerate();
    localStorage.setItem("config", JSON.stringify(obj));
    //redirect
    history.push("/");
  };

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={{ root: { width: "90%" } }}>
      <TextColor>Configuraciones</TextColor>
      <ComboboxSede />
      <PickerDate />
      <ComboMarketSall />
      <TextNameExecutive />
      <TextController />
      <PrimaryButton text="Siguiente" onClick={handleSubmit} />
    </Stack>
  );
};

export default ConfigPage;
