import { FC } from "react";
import { ITextProps, Text } from "@fluentui/react";

const TextColor: FC<ITextProps> = (props) => {
  return <Text variant="xxLargePlus" {...props} />;
};

export default TextColor;
