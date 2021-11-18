import {
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
} from "@fluentui/react";
import { FC } from "react";
import { useHistory } from "react-router";

interface IConfirm {
  hideDialog: boolean;
  toggleHideDialog: () => void;
}

const Confirm: FC<IConfirm> = ({ hideDialog, toggleHideDialog }) => {
  const navegation = useHistory();

  const dialogContentProps = {
    type: DialogType.normal,
    title: "No tienes datos",
    subText: "vuelve despues de tener datos",
  };

  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
    >
      <DialogFooter>
        <PrimaryButton onClick={() => navegation.push("/")} text="Ir a llenar" />
      </DialogFooter>
    </Dialog>
  );
};

export default Confirm;
