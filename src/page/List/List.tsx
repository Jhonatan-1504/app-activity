import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
} from "@fluentui/react";
import { useActivities } from "../../context/Activities";
import { useConfig } from "../../context/Configuration";
import { tsXLXS } from "ts-xlsx-export";
import { useEffect, useState } from "react";
import { gridStyles } from "./Styles";
import { column } from "./Columns";
import { useBoolean } from "@fluentui/react-hooks";
import Delete from "./Delete";

const List = () => {
  const { fileName, config } = useConfig();

  const { data } = useActivities();

  const [alldataToExport, setAlldataToExport] = useState<unknown[]>([]);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  useEffect(() => {
    let all = data.map((item) =>
      Object({
        Sede: config?.sede,
        Fecha: config?.date,
        Puesto: config?.marketStall,
        "Nombre del ejecutivo": config?.nameExecutive,
        Cliente: item.nClient===0?'':item.nClient,
        "N°": item.nActivity,
        "Hora de Inicio": item.dateStart,
        Producto: item.product,
        Actividad: item.categoryActivity,
        "Detalle de Actividad": item.codeActivity,
        "Observacion / Comentario": item.commentary,
        "Hora Final": item.dateEnd,
        Duracion: item.duration,
        Controlador: config?.nameController,
      })
    );
    console.log(data);    
    setAlldataToExport(all);
  }, [data, config]);

  const ExportExcel = () => {
    tsXLXS().exportAsExcelFile(alldataToExport).saveAsExcelFile(fileName);
  };

  return (
    <Stack tokens={{ childrenGap:5}} styles={{ root: { width: "90%" } }}>
      <Stack
        horizontal
        styles={{ root: { width: "100%" } }}
        horizontalAlign="space-between"
      >
        <DefaultButton onClick={toggleHideDialog} text="Limpiar Lista" />
        <DefaultButton onClick={ExportExcel} text="Exportar Excel" />
      </Stack>
      <DetailsList
        styles={gridStyles}
        columns={column}
        items={data}
        compact={false}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        setKey="none"
        isHeaderVisible={true}
      />
      <Delete hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} />
    </Stack>
  );
};

export default List;
