import { FC } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface IExportCSV {
  csvData: unknown[];
  fileName: string;
}

const misDatos = [
  { Nombre: "hola mundo 11111 22 FGDFGDR", Edad: 12, Fecha: "15-09-2021" },
  { Nombre: "hola mundo 1", Edad: 22, Fecha: "11-10-2021" },
  { Nombre: "hola mundo 2", Edad: 32, Fecha: "31-10-2021" },
];

// const columns = ["name","age","date"];

const filename = "pruebas.xlsx";

export const exportReactExcel = () => {
  let fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  // if (misColumn.length !== Object.keys({ ...misDatos[0] }).length)
  //   throw new Error("falta definir columnas o datos");

  const ws = XLSX.utils.json_to_sheet(misDatos);

  ws["A1"].s = {
    fill: {
      patternType: "solid",
      fgColor: { rgb: "#111111" },
    },
  };

  //columnas tamaño
  let wscols: XLSX.ColInfo[] = [{ wch: 30 }, { wch: 10 }, { wch: 10 }];
  ws["!cols"] = wscols;

  // auto filtrado
  ws["!autofilter"] = { ref: `A1:C1` };

  console.log(ws['A1']);

  const wb: XLSX.WorkBook = { Sheets: { BBDD: ws }, SheetNames: ["BBDD"] };

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const data = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(data, filename);
};

const ExportCSV: FC<IExportCSV> = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(csvData, { header: [] });

    const wb: XLSX.WorkBook = { Sheets: { BBDD: ws }, SheetNames: ["BBDD"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return <button onClick={exportToCSV}>Hola mundo</button>;
};

export default ExportCSV;
