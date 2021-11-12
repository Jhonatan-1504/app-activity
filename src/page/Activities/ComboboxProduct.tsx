import { ComboBox, IComboBox, IComboBoxOption } from "@fluentui/react";
import { useFormContext } from "../../context/FormActivity";

const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: "nulo", text: "No tiene" },
  { key: "AS", text: "Adelanto de sueldo" },
  { key: "AD", text: "Aplicativo Digital" },
  { key: "CD", text: "Compra de Deuda" },
  { key: "CEF", text: "Crédito Efectivo" },
  { key: "HIP", text: "Crédito Hipotecario" },
  { key: "VEHI", text: "Crédito Vehicular" },
  { key: "CTS", text: "CTS" },
  { key: "CP", text: "Cuenta a Plaza" },
  { key: "CC", text: "Cuenta Corriente" },
  { key: "CH", text: "Cuenta de Ahorro" },
  { key: "CS", text: "Cuenta Sueldo" },
  { key: "EP", text: "Efectivo Preferente" },
  { key: "CHEQUE", text: "Cheque" },
  { key: "FFMM", text: "Fondos Mutuos" },
  { key: "GAHI", text: "GAHI" },
  { key: "OTROS", text: "Otros" },
  { key: "PP", text: "Préstamo Personal" },
  { key: "SEGUROS", text: "Seguros" },
  { key: "TCredimas", text: "Tarjeta Credimas" },
  { key: "TC", text: "Tarjeta de Crédito" },
  { key: "TD", text: "Tarjeta de Débito" },
  { key: "TELLER", text: "TELLER" },
  { key: "TMoneda", text: "Tipo de Cambio" },
  { key: "TOKEN", text: "TOKEN" },
  { key: "TRANSF", text: "Transferencias" },
  { key: "UPGRADE", text: "UPGRADE" },
  { key: "YAPE", text: "YAPE" },
];

const ComboboxProduct = () => {
  const { product, setProduct } = useFormContext();

  const handleChange = (e: React.FormEvent<IComboBox>,options?: IComboBoxOption) => {
    setProduct(options);
  };

  return (
    <ComboBox
      selectedKey={product.key}
      required
      label="Producto"
      autoComplete="on"
      onChange={handleChange}
      options={INITIAL_OPTIONS}
    />
  );
};

export default ComboboxProduct;
