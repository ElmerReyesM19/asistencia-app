import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function ExportExcelButton({ data, filename }) {
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${filename}.xlsx`);
  };

  return (
    <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded">
      Exportar Excel
    </button>
  );
}
