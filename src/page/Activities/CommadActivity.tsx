import { useActivities } from "../../context/Activities";
import { DefaultButton, Label, SpinButton, Stack } from "@fluentui/react";

const CommadActivity = () => {
  const { getNextActivity, setNActivity,nActivity } = useActivities();

  const handleNext = () => {
    setNActivity(getNextActivity());
  };

  const handleChange = (value?: string) => {
    setNActivity(value ? parseInt(value) : 1);
  };

  return (
    <>
      <Label>Actividad</Label>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DefaultButton onClick={handleNext} text="Siguiente" />
        <SpinButton
          value={nActivity ? nActivity + "" : ""}
          min={0}
          max={200}
          step={1}
          onChange={(_, value) => handleChange(value)}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
        />
      </Stack>
    </>
  );
};

export default CommadActivity;
