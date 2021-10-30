import { DefaultButton, Stack, Text } from "@fluentui/react";
import { FC } from "react";

interface ICommadDate {
  dateStart: string;
  dateEnd?: string;
  onClick?: () => void;
}

const CommadDate: FC<ICommadDate> = ({ dateStart, dateEnd, onClick }) => {
  const blockText = { display: "block" };

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <DefaultButton onClick={onClick} iconProps={{ iconName: "Refresh" }} />
      <Stack.Item aria-orientation="horizontal">
        <Text style={blockText} variant="mediumPlus">
          Inicio
        </Text>
        <Text variant="xLarge"> {dateStart.split(" ")[1]}</Text>
      </Stack.Item>
      <Stack.Item aria-orientation="horizontal">
        <Text style={blockText} variant="mediumPlus">
          FInal
        </Text>
        <Text variant="xLarge">{dateEnd ? dateEnd.split(" ")[1] : ""}</Text>
      </Stack.Item>
    </Stack>
  );
};

export default CommadDate;
