import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export interface FoodTableProps {
  foods: FoodItem[];
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
  const { foods, onSelectRow } = props; // Destructuring der Props
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow((prevIndex) => (prevIndex === index ? null : index));
    onSelectRow(index); // Aufruf der onSelectRow-Funktion aus den Props
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {foods.map((food, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(index)} // Aufruf von handleRowClick
              selected={index === selectedRow}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{food.foodName}{` [${food.unit}]`}</TableCell>
              <TableCell>{food.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
