import {
  DefaultButton,
  DetailsList,
  IColumn,
  IDetailsListStyles,
  SelectionMode,
  Stack,
} from "@fluentui/react";
import { useActivities } from "../context/Activities";
import { useConfig } from "../context/Configuration";
import { tsXLXS } from "ts-xlsx-export";

const List = () => {
  const { fileName } = useConfig();

  const { data } = useActivities();

  const gridStyles: Partial<IDetailsListStyles> = {
    root: {
      overflowX: "scroll",
      selectors: {
        "& [role=grid]": {
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          height: "80vh",
          width: "50vh",
        },
      },
    },
    headerWrapper: {
      flex: "0 0 auto",
    },
    contentWrapper: {
      flex: "1 1 auto",
      overflowY: "auto",
      overflowX: "hidden",
    },
  };

  const column: IColumn[] = [
    {
      key: "column1",
      name: "Cliente",
      fieldName: "nCliente",
      minWidth: 30,
      maxWidth: 30,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column2",
      name: "N°",
      fieldName: "nActivity",
      minWidth: 30,
      maxWidth: 30,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column3",
      name: "Producto",
      fieldName: "product",
      minWidth: 90,
      maxWidth: 90,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column4",
      name: "Codigo",
      fieldName: "codeActivity",
      minWidth: 70,
      maxWidth: 70,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column6",
      name: "Inicio",
      fieldName: "dateStart",
      minWidth: 70,
      maxWidth: 70,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column7",
      name: "Final",
      fieldName: "dateEnd",
      minWidth: 70,
      maxWidth: 70,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column8",
      name: "Duracion",
      fieldName: "duration",
      minWidth: 70,
      maxWidth: 70,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
  ];

  const ExportExcel = () => {
    tsXLXS().exportAsExcelFile(data).saveAsExcelFile(fileName);
  };

  return (
    <Stack horizontalAlign="center">
      <Stack
        horizontal
        styles={{ root: { width: "100%" } }}
        horizontalAlign="space-between"
      >
        <DefaultButton text="Limpiar Lista" />
        <DefaultButton onClick={ExportExcel} text="Exportar Excel" />
      </Stack>
      <DetailsList
        styles={gridStyles}
        columns={column}
        items={data}
        selectionMode={SelectionMode.none}
      />
    </Stack>
  );
};

export default List;
