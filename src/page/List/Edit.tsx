import {
  ComboBox,
  Dialog,
  DialogFooter,
  DialogType,
  IComboBoxOption,
  Position,
  PrimaryButton,
  SpinButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { useCallback, useEffect, useState } from "react";
import { INIT_OBJECT_ITEM, useActivities } from "../../context/Activities";
import { IData } from "../../interfaces/Configuration";
import { INITIAL_OPTIONS } from "../Activities/ComboboxProduct";

const Edit = () => {
  const { objectItem, setObjectItem, updateData } = useActivities();

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [form, setForm] = useState<IData>(INIT_OBJECT_ITEM);

  const dialogContentProps = {
    type: DialogType.normal,
    title: "Corrige tu Actividad",
  };

  const closeEditDialog = useCallback(() => {
    setObjectItem({});
    toggleHideDialog();
  }, [setObjectItem,toggleHideDialog]);

  const handleChange = (key: string, value?: string | IComboBoxOption) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    updateData(form);
    closeEditDialog();
  };

  useEffect(() => {
    if (objectItem.duration && objectItem.duration !== undefined) {
      toggleHideDialog();
      setForm(objectItem);
    }
  }, [objectItem,toggleHideDialog]);

  return (
    <Dialog
      hidden={hideDialog}
      dialogContentProps={dialogContentProps}
      onDismiss={closeEditDialog}
      closeButtonAriaLabel="Close"
    >
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <SpinButton
          label="Cliente"
          labelPosition={Position.top}
          min={0}
          max={200}
          onChange={(_, val) => handleChange("nClient", val)}
          step={1}
          defaultValue={form?.nClient !== undefined ? form.nClient + "" : "0"}
        />
        <SpinButton
          label="Actividad"
          labelPosition={Position.top}
          min={0}
          max={200}
          step={1}
          onChange={(_, val) => handleChange("nActivity", val)}
          defaultValue={
            form?.nActivity !== undefined ? form.nActivity + "" : "0"
          }
        />
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <TextField
          label="Fecha inicial"
          onChange={(_, val) => handleChange("dateStart", val)}
          defaultValue={form?.dateStart}
        />
        <TextField
          label="Fecha Final"
          onChange={(_, val) => handleChange("dateEnd", val)}
          defaultValue={form?.dateEnd}
        />
      </Stack>
      <ComboBox
        label="Producto"
        options={INITIAL_OPTIONS}
        onChange={(_, val) => handleChange("product", val)}
        selectedKey={form?.product?.key ? form.product.key : "nulo"}
      />
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <TextField
          label="Categoria"
          onChange={(_, val) => handleChange("categoryActivity", val)}
          defaultValue={form?.categoryActivity}
        />
        <TextField
          label="Codigo"
          onChange={(_, val) => handleChange("codeActivity", val)}
          defaultValue={form?.codeActivity}
        />
      </Stack>
      <TextField
        multiline
        label="Observaciones"
        onChange={(_, val) => handleChange("commentary", val)}
        defaultValue={form?.commentary}
      />
      <DialogFooter>
        <PrimaryButton onClick={handleSubmit} text="Guardar Cambios" />
      </DialogFooter>
    </Dialog>
  );
};

export default Edit;
