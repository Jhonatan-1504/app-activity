import { Stack } from "@fluentui/react";
import { FC } from "react";
import { Colors } from "../theme/Theme";

const Main: FC = ({ children }) => {
  return <Stack styles={{ root: { minHeight: "100vh",color:Colors.palette.black,background:Colors.palette.white } }}>{children}</Stack>;
};

export default Main;
