import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([buffer]),
    `${fileName}.xlsx`
  );
};

export const exportPDF = (columns, rows, fileName) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [columns],
    body: rows,
  });

  doc.save(`${fileName}.pdf`);
};

export const printPage = () => {
  window.print();
};