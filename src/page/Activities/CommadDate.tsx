import { DefaultButton, Stack, Text } from "@fluentui/react";
import { useFormContext } from "../../context/FormActivity";
import { FC } from "react";
import moment from "moment";

const CommadDate: FC = () => {
  const blockText = { display: "block" };

  const { setDateStart, dateStart } = useFormContext();

  const handleRefresh = () => {
    setDateStart(moment().format("Y/M/D HH:mm:ss"));
  };

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <DefaultButton
        onClick={handleRefresh}
        iconProps={{ iconName: "Refresh" }}
      />
      <Stack.Item aria-orientation="horizontal">
        <Text style={blockText} variant="mediumPlus">
          Inicio
        </Text>
        <Text variant="xLarge"> {dateStart.split(" ")[1]}</Text>
      </Stack.Item>
    </Stack>
  );
};

export default CommadDate;
