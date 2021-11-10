import { DefaultButton, Label, SpinButton, Stack } from "@fluentui/react";
import { useActivities } from "../../context/Activities";
import { useFormContext } from "../../context/FormActivity";

const CommadActivity = () => {
  const { getLastObject } = useActivities();
  const { nActivity, setNActivity } = useFormContext();

  const handleNext = () => {
    let obj = getLastObject();
    switch (obj) {
      case null:
        setNActivity(1);
        break;
      default:
        setNActivity(obj.nActivity * 1 + 1)
    }
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
