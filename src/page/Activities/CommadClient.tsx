import { DefaultButton, Label, SpinButton, Stack } from "@fluentui/react";
import { useActivities } from "../../context/Activities";
import { useFormContext } from "../../context/FormActivity";

const CommadClient = () => {
  const { nClient, setNClient, setNActivity } = useFormContext();
  const { getLastObject } = useActivities();

  const handleNull = () => {
    setNClient("");
  };

  const handleNext = () => {
    let obj = getLastObject();

    switch (obj) {
      case null:
        setNClient(1);
        break;
      case obj:
        setNClient(obj?.nClient ? obj.nClient * 1 + 1 : 1);
        break;
    }
    setNActivity(1)
  };

  return (
    <>
      <Label>Cliente</Label>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <DefaultButton onClick={handleNext} text="Siguiente" />
        <SpinButton
          min={0}
          max={200}
          step={1}
          value={nClient + ""}
          onChange={(ev, val) => setNClient(val ? parseInt(val) : "")}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
        />
        <DefaultButton text="Nulo" onClick={handleNull} />
      </Stack>
    </>
  );
};

export default CommadClient;
