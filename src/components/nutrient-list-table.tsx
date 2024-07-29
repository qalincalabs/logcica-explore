import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const nutrientOrder = [
  "energy",
  "fat",
  "saturatedFat",
  "carbohydrates",
  "sugars",
  "fibres",
  "protein",
  "salt",
];

export function NutrientListTable({ nutrientList }: any) {
  return (
    <Table size="small" sx={{ maxWidth: 400 }}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right">/100gr</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {nutrientOrder
          .map((n) => nutrientList.find((i: any) => i.nutrient?.code == n))
          .filter((n) => n != null)
          .map((productNutrient: any) => (
            <TableRow key={productNutrient.nutrient.code}>
              <TableCell>
                {["saturatedFat", "sugars"].includes(
                  productNutrient.nutrient.code,
                ) && <span>&nbsp;&nbsp;</span>}
                {productNutrient.nutrient.name}
              </TableCell>
              <TableCell align="right">
                {productNutrient.quantity.value + productNutrient.quantity.unit}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default NutrientListTable;
