import { DefaultButton, IStackStyles, Panel, Stack } from "@fluentui/react";
import { Colors } from "../theme/Theme";
import { useBoolean } from "@fluentui/react-hooks";
import NavColor from "./NavColor";

const Navbar = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const stackStyles: IStackStyles = {
    root: {
      height: 68,
      background: Colors.palette.white,
      padding: "0 10px",
      borderBottom: `1px solid ${Colors.palette.black}`,
    },
  };

  return (
    <Stack styles={stackStyles} verticalAlign="center" horizontalAlign="end">
      <DefaultButton
        iconProps={{ iconName: "GlobalNavButton" }}
        onClick={openPanel}
      />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <NavColor />
      </Panel>
    </Stack>
  );
};

export default Navbar;
