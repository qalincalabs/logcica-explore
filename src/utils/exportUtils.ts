import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

export const exportToJSON = (data: any, filename: string) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCSV = (data: any, filename: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
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

export const exportToText = (data: any, filename: string) => {
  let textContent = '';
  if (Array.isArray(data)) {
    data.forEach(item => {
      textContent += JSON.stringify(item, null, 2) + '\n';
    });
  } else {
    textContent = JSON.stringify(data, null, 2);
  }
  const blob = new Blob([textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data: any, filename: string) => {
  const doc = new jsPDF();
  const title = "Mes Favoris";
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 10, 10);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  let yPosition = 20;

  const addSection = (title, items) => {
    if (items.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, yPosition);
      yPosition += 10;
      doc.setFont("helvetica", "normal");
      items.forEach(item => {
        doc.text(`• ${item.name}`, 10, yPosition);
        yPosition += 10;
      });
      yPosition += 10; // Add extra space after each section
    }
  };

  addSection("Groupements", data.partnerships);
  addSection("Marchés", data.marketplaces);
  addSection("Producteurs", data.activities);
  addSection("Produits", data.products);

  doc.save(`${filename}.pdf`);
};