import { DefaultButton } from "@fluentui/react";
import { useActivities } from "../../context/Activities";

import { utils, WorkBook, write, ColInfo, CellStyle } from "xlsx-js-style";
import * as FileSaver from "file-saver";
import { useEffect, useState } from "react";
import { IData } from "../../interfaces/Configuration";
import { useConfiguration } from "../../context/FormConfig";
import { onFormatDate } from "../Configuration/PickerDate";

let fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
let fileExtension = ".xlsx";

const CARACTERS = "ABCDEFGHIKJLMNOPQRSTUVWXYZ";

// styles

// utils
const BORDER_DARK: any = { style: "thin", color: { rgb: "000000" } };
const BORDER_ALL: any = {
  bottom: BORDER_DARK,
  left: BORDER_DARK,
  right: BORDER_DARK,
  top: BORDER_DARK,
};

const ALIGN_TOP_CENTER: any = { vertical: "top", horizontal: "center" };
const ALIGN_NORMAL_RIGHT: any = { vertical: "center", horizontal: "right" };
const ALIGN_NORMAL_CENTER: any = { vertical: "center", horizontal: "center" };

//ceils
const COLUMNS_STYLE: CellStyle = {
  fill: { patternType: "solid", fgColor: { rgb: "203764" } },
  font: { color: { rgb: "FFFFFF" } },
  alignment: ALIGN_TOP_CENTER,
  border: BORDER_ALL,
};
const FORMAT_HOURS_RIGHT_BORDER: CellStyle = {
  numFmt: "[$-x-systime]h:mm:ss AM/PM",
  alignment: ALIGN_NORMAL_RIGHT,
  border: BORDER_ALL,
};
const FORMAT_DATE_CENTER_BORDER: CellStyle = {
  numFmt: "d/mm/yyyy",
  alignment: ALIGN_NORMAL_CENTER,
  border: BORDER_ALL,
};
const FORMAT_NUMBER: CellStyle = {
  alignment: ALIGN_NORMAL_RIGHT,
  border: BORDER_ALL,
};
const FORMAT_DEFAULT: CellStyle = {
  alignment: ALIGN_NORMAL_CENTER,
  border: BORDER_ALL,
};

// my component
const ExcelExport = () => {
  const { data} = useActivities();

  const { sede, date, marketStall, nameController, nameExecutive } = useConfiguration();

  const FILE_NAME = `REPORTE ${sede.text} ${date.getDate()}.${date.getMonth() + 1} - ${nameController.toUpperCase()}`;
  const FORMAT_DATE = onFormatDate(date);

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

  useEffect(() => {
    let all = data.map((item) =>
      Object({
        Sede: sede.text,
        Fecha: FORMAT_DATE,
        Puesto: marketStall.text,
        "Nombre del ejecutivo": nameExecutive,
        Cliente: item.nClient === 0 ? "" : item.nClient,
        "N°": item.nActivity,
        "Hora de Inicio": item.dateStart,
        Producto: item.product?.text === "No tiene" ? "" : item.product?.text,
        Actividad: item.categoryActivity,
        "Código de Actividad": item.codeActivity,
        "Observacion / Comentario": item.commentary,
        "Hora Final": item.dateEnd,
        Duracion: item.duration,
        Controlador: nameController,
      })
    );
    setFormatAllData(all);
  }, [data, FORMAT_DATE, marketStall, nameController, nameExecutive, sede]);

  const handleClick = () => {
    const ws = utils.json_to_sheet(formatAllData);

    ws["!autofilter"] = { ref: "A1:N1" };
    ws["!cols"] = columns;
    ws["!rows"] = [{ hpt: 30 }];

    for (let i = 0; i < columns.length; i++) {
      ws[CARACTERS[i] + "1"].s = COLUMNS_STYLE;
    }

    //total array
    for (let c = 0; c < formatAllData.length; c++) {
      // row array
      for (let r = 0; r < columns.length; r++) {
        switch (CARACTERS[r]) {
          case "B":
            ws[CARACTERS[r] + (c + 2)].s = FORMAT_DATE_CENTER_BORDER;
            break;
          case "G":
          case "L":
          case "M":
            ws[CARACTERS[r] + (c + 2)].s = FORMAT_HOURS_RIGHT_BORDER;
            break;
          case "E":
          case "F":
            ws[CARACTERS[r] + (c + 2)].s = FORMAT_NUMBER;
            break;
          default:
            ws[CARACTERS[r] + (c + 2)].s = FORMAT_DEFAULT;
            break;
        }
      }
    }

    const wb: WorkBook = { Sheets: { BBDD: ws }, SheetNames: ["BBDD"] };

    const excelBuffer = write(wb, {
      bookType: "xlsx",
      type: "array",
      bookSST: false,
    });

    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, FILE_NAME + fileExtension);
  };

  return (
    <DefaultButton
      iconProps={{ iconName: "Installation" }}
      text="Export Excel"
      onClick={handleClick}
    />
  );
};

export default ExcelExport;
