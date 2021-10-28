import { FC } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { DefaultButton } from "@fluentui/react";

interface IExportCSV {
  csvData: unknown[];
  fileName: string;
}

export const ExportCSV: FC<IExportCSV> = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData: unknown[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"]};
    
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return <DefaultButton onClick={() => exportToCSV(csvData, fileName)} text="Enviar"/>;
};
