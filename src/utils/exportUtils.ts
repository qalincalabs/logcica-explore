import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { jsPDF } from "jspdf";

export const exportToJSON = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([new TextEncoder().encode(json)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCSV = (data, filename) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([new TextEncoder().encode(csv)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToXLSX = (data, filename) => {
  const workbook = XLSX.utils.book_new();

  const createSheet = (data, sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  };

  for (const [sheetName, sheetData] of Object.entries(data)) {
    createSheet(sheetData, sheetName);
  }

  const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToText = (data, filename) => {
  let textContent = '';
  if (Array.isArray(data)) {
    data.forEach(item => {
      textContent += JSON.stringify(item, null, 2) + '\n';
    });
  } else {
    textContent = JSON.stringify(data, null, 2);
  }
  const blob = new Blob([new TextEncoder().encode(textContent)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (favoritesData: Record<string, any[]>, filename: string) => {
  const doc = new jsPDF();
  let yPosition = 10;

  const addSection = (title: string, items: any[]) => {
    if (Array.isArray(items) && items.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, yPosition);
      yPosition += 10;
      doc.setFont("helvetica", "normal");

      items.forEach((item) => {
        doc.text(`ID: ${item.id || ''}, Name: ${item.name || ''}, Activity ID: ${item.activityId || ''}, Activity Name: ${item.activityName || ''}`, 10, yPosition);
        yPosition += 10;
      });
    }
  };

  Object.keys(favoritesData).forEach((key) => {
    addSection(key.charAt(0).toUpperCase() + key.slice(1), favoritesData[key]);
  });

  doc.save(`${filename}.pdf`);
};
