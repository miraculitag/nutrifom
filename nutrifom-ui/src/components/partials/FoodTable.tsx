import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { NurtilogEntryRequest } from "../../types";

export interface FoodTableProps {
  nutrilogItems: NurtilogEntryRequest[];
  onSelectRow: (index: number) => void; // Änderung des Funktionsparameters
}

export interface FoodItem {
  id: number;
  foodName: string;
  amount: number;
  unit: string;
  energy_kcal_per_unit: number;
  proteins: number;
  saturatedFat: number;
  unsaturatedFat: number;
  carbohydrates: number;
}

export default function FoodTable(props: FoodTableProps) {
  const { nutrilogItems, onSelectRow } = props; // Destructuring der Props
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow((prevIndex) => (prevIndex === index ? null : index));
    onSelectRow(index); // Aufruf der onSelectRow-Funktion aus den Props
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {nutrilogItems.map((food, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(index)} // Aufruf von handleRowClick
              selected={index === selectedRow}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{food.productName}{` [Gramm / Portionen]`}</TableCell>
              <TableCell>{food.product_quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
