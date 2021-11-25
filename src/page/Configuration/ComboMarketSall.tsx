import { ComboBox, IComboBox, IComboBoxOption } from "@fluentui/react";
import { useConfiguration } from "../../context/FormConfig";

const OptionMarketSall: IComboBoxOption[] = [
  { text: "Ejecutivo de Negocios BEX DIGITAL", key: "ENBD" },
  { text: "Asistente de Servicios BEX DIGITAL", key: "ASBD" },
  { text: "Gerente de Agencia BEX DIGITAL", key: "GABD" },
  { text: "Experto Hipotecario BEX DIGITAL", key: "EHBD" },
];

const ComboMarketSall = () => {
  const { marketStall, setMarketStall } = useConfiguration();

  const handleChange = (e: React.FormEvent<IComboBox>, options?: IComboBoxOption) => {
    setMarketStall(options);
  };

  return (
    <ComboBox
      options={OptionMarketSall}
      required
      selectedKey={marketStall.key}
      autoComplete="on"
      onChange={handleChange}
      label="Puesto"
    />
  );
};

export default ComboMarketSall;
