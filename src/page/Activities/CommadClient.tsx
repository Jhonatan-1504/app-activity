import { DefaultButton, Label, SpinButton, Stack } from "@fluentui/react";
import { useActivities } from "../../context/Activities";

const CommadClient = () => {
  const { getNextClient, nCliente, setNCliente } = useActivities();

  const handleNext = () => {
    setNCliente(getNextClient())
  };

  const handleNull = () => {
    setNCliente(0)
  };

  const handleChange = (value?: string) => {
    setNCliente(value ? parseInt(value) : 1);
  };

  return (
    <>
      <Label>Cliente</Label>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DefaultButton onClick={handleNext} text="Siguiente" />
        <SpinButton
          value={nCliente ? nCliente + "" : ""}
          min={0}
          max={200}
          step={1}
          onChange={(_, value) => handleChange(value)}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
        />
        <DefaultButton onClick={handleNull} text="Nulo" />
      </Stack>
    </>
  );
};

export default CommadClient;
