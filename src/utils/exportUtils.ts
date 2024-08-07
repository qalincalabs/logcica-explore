import { jsPDF } from "jspdf";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export const exportToJSON = (data: any, filename: string) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCSV = (data: any, filename: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToXLSX = (data: any, filename: string) => {
  const workbook = XLSX.utils.book_new();

  const createSheet = (data: any, sheetName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  };

  for (const [sheetName, sheetData] of Object.entries(data)) {
    createSheet(sheetData, sheetName);
  }

  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToText = (data: any, filename: string) => {
  let textContent = "";
  if (Array.isArray(data)) {
    data.forEach((item) => {
      textContent += JSON.stringify(item, null, 2) + "\n";
    });
  } else {
    textContent = JSON.stringify(data, null, 2);
  }
  const blob = new Blob([textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (
  favoritesData: Record<string, any[]>,
  filename: string,
) => {
  const doc = new jsPDF();
  let yPosition = 10;

  const addSection = (title: string, items: any[]) => {
    if (Array.isArray(items) && items.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, yPosition);
      yPosition += 10;
      doc.setFont("helvetica", "normal");

      items.forEach((item) => {
        doc.text(item.name, 10, yPosition);
        yPosition += 10;
      });
    }
  };

  Object.keys(favoritesData).forEach((key) => {
    addSection(key.charAt(0).toUpperCase() + key.slice(1), favoritesData[key]);
  });

  doc.save(`${filename}.pdf`);
};
