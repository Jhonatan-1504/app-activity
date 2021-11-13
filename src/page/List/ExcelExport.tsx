import { DefaultButton } from "@fluentui/react";
import { useActivities } from "../../context/Activities";
import { useConfig } from "../../context/Configuration";

import { utils, WorkBook, write, ColInfo, CellStyle } from "xlsx-js-style";
import * as FileSaver from "file-saver";
import { useEffect, useState } from "react";
import { IData } from "../../interfaces/Configuration";

let fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
let fileExtension = ".xlsx";

const BORDER_DARK: any = { style: "thin", color: { rgb: "000000" } };

const ExcelExport = () => {
  const { data } = useActivities();
  const { fileName, config } = useConfig();

  const [formatAllData, setFormatAllData] = useState<IData[]>([]);

  const columns: ColInfo[] = [
    { wch: 10 },
    { wch: 10 },
    { wch: 30 },
    { wch: 25 },
    { wch: 9 },
    { wch: 6 },
    { wch: 15 },
    { wch: 20 },
    { wch: 10 },
    { wch: 20 },
    { wch: 30 },
    { wch: 13 },
    { wch: 10 },
    { wch: 25 },
  ];

  const stylesColumns: CellStyle = {
    fill: { patternType: "solid", fgColor: { rgb: "203764" } },
    font: { color: { rgb: "FFFFFF" } },
    alignment: {
      vertical: "top",
      horizontal: "center",
    },
    border: {
      bottom: BORDER_DARK,
      left: BORDER_DARK,
      right: BORDER_DARK,
      top: BORDER_DARK,
    },
  };

  useEffect(() => {
    let all = data.map((item) =>
      Object({
        Sede: config?.sede,
        Fecha: config?.date,
        Puesto: config?.marketStall,
        "Nombre del ejecutivo": config?.nameExecutive,
        Cliente: item.nClient === 0 ? "" : item.nClient,
        "N°": item.nActivity,
        "Hora de Inicio": item.dateStart,
        Producto: item.product,
        Actividad: item.categoryActivity,
        "Código de Actividad": item.codeActivity,
        "Observacion / Comentario": item.commentary,
        "Hora Final": item.dateEnd,
        Duracion: item.duration,
        Controlador: config?.nameController,
      })
    );
    setFormatAllData(all);
  }, [data, config]);

  const handleClick = () => {
    const ws = utils.json_to_sheet(formatAllData, {});

    ws["!autofilter"] = { ref: "A1:N1" };
    ws["!cols"] = columns;
    ws["!rows"] = [{ hpt: 29 }];

    ws["A1"].s = stylesColumns;
    ws["B1"].s = stylesColumns;
    ws["C1"].s = stylesColumns;
    ws["D1"].s = stylesColumns;
    ws["E1"].s = stylesColumns;
    ws["F1"].s = stylesColumns;
    ws["G1"].s = stylesColumns;
    ws["H1"].s = stylesColumns;
    ws["I1"].s = stylesColumns;
    ws["J1"].s = stylesColumns;
    ws["K1"].s = stylesColumns;
    ws["L1"].s = stylesColumns;
    ws["M1"].s = stylesColumns;
    ws["N1"].s = stylesColumns;

    ws["G5"].s = {
      border: {
        bottom: BORDER_DARK,
        left: BORDER_DARK,
        right: BORDER_DARK,
        top: BORDER_DARK,
      },
      numFmt:"0.0%"
    };

    const wb: WorkBook = { Sheets: { BBDD: ws }, SheetNames: ["BBDD"] };

    const excelBuffer = write(wb, {
      bookType: "xlsx",
      type: "array",
      bookSST: false,
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return <DefaultButton text="Export Excel" onClick={handleClick} />;
};

export default ExcelExport;
