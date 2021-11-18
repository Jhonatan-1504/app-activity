import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
} from "@fluentui/react";

import { FC } from "react";
import { useActivities } from "../../context/Activities";

interface IDelete {
  hideDialog: boolean;
  toggleHideDialog: () => void;
}

const Delete: FC<IDelete> = ({ hideDialog, toggleHideDialog }) => {
  const { cleanAllData } = useActivities();

  const dialogContentProps = {
    type: DialogType.normal,
    title: "¿Estas seguro de Eliminar?",
    subText: "Despues de hacer esto es un gg?",
  };

  const handleDelete = () => {
    cleanAllData();
    toggleHideDialog();
  };

  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
    >
      <DialogFooter>
        <PrimaryButton onClick={handleDelete} text="Si,Aslo" />
        <DefaultButton onClick={toggleHideDialog} text="Cancelar" />
      </DialogFooter>
    </Dialog>
  );
};

export default Delete;
