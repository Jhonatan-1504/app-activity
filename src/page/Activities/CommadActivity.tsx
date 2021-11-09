import { DefaultButton, Label, SpinButton, Stack } from "@fluentui/react";
import { useFormContext } from "../../context/FormActivity";

const CommadActivity = () => {
  const { nActivity, setNActivity } = useFormContext();

  const handleNext = () => {
    setNActivity((state: number) => state * 1 + 1);
  };

  return (
    <>
      <Label>Actividad</Label>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DefaultButton onClick={handleNext} text="Siguiente" />
        <SpinButton
          min={0}
          max={200}
          step={1}
          value={nActivity + ""}
          onChange={(ev, val) => setNActivity(val ? parseInt(val) : 0)}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
        />
      </Stack>
    </>
  );
};

export default CommadActivity;
