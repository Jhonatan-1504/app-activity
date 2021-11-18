import { IButtonStyles, IColumn } from "@fluentui/react";
import { IData } from "../../interfaces/Configuration";

export const iconButtonStyles: Partial<IButtonStyles> = {
  root: { float: "right", height: "inherit" },
};

export const column: IColumn[] = [
  {
    key: "column1",
    name: "Cliente",
    fieldName: "nClient",
    minWidth: 50,
    maxWidth: 50,
    isResizable: true,
  },
  {
    key: "column2",
    name: "N°",
    fieldName: "nActivity",
    minWidth: 20,
    maxWidth: 20,
    isResizable: true,
  },
  {
    key: "column3",
    name: "Inicio",
    fieldName: "dateStart",
    minWidth: 60,
    maxWidth: 60,
    isResizable: true,
  },
  {
    key: "column4",
    name: "Producto",
    fieldName: "product",
    minWidth: 100,
    maxWidth: 100,
    isResizable: true,
    onRender: (item: IData) => <div>{item.product?.text}</div>,
  },
  {
    key: "column5",
    name: "Codigo",
    fieldName: "codeActivity",
    minWidth: 50,
    maxWidth: 50,
    isResizable: true,
    data: "string",
  },
  {
    key: "column6",
    name: "Final",
    fieldName: "dateEnd",
    minWidth: 70,
    maxWidth: 70,
    isResizable: true,
  },
  {
    key: "column7",
    name: "Duracion",
    fieldName: "duration",
    minWidth: 90,
    maxWidth: 90,
    isResizable: true,
  },
  {
    key: "column8",
    name: "Observaciones",
    fieldName: "commentary",
    minWidth: 120,
    maxWidth: 120,
    isResizable: true,
  },
];
