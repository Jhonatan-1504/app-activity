import { FC } from "react";
import { Stack } from "@fluentui/react";

const Container: FC = ({ children }) => {
  return (
    <Stack
      horizontalAlign="center"
      styles={{
        root: {
          minHeight: "100%",
          padding:10,
        },
      }}
    >
      {children}
    </Stack>
  );
};

export default Container;
