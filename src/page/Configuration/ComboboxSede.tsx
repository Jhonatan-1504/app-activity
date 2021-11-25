import { ComboBox, IComboBox, IComboBoxOption } from "@fluentui/react";
import { useConfiguration } from "../../context/FormConfig";

const OptionSede: IComboBoxOption[] = [
  { text: "San Isidro", key: "SI" },
  { text: "Surquillo", key: "S" },
];

const ComboboxSede = () => {
  const { sede, setSede } = useConfiguration();

  const handleChange = (e: React.FormEvent<IComboBox>,options?: IComboBoxOption) => {
    setSede(options);
  };

  return (
    <ComboBox
      options={OptionSede}
      required
      selectedKey={sede.key}
      label="Sede"
      autoComplete="on"
      onChange={handleChange}
    />
  );
};

export default ComboboxSede;
