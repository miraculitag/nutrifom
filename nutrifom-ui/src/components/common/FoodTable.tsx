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
  foods: Food[];
  onSelectRow: (value: number) => void;
}

export interface Food {
  name: string;
  amount: number;
  unit: string;
}


export default function FoodTable(props: FoodTableProps) {
  const { foods } = props;
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {foods.map((food, index) => (
            <TableRow key={index}
            onClick={() => {
              setSelectedRow(index);
              props.onSelectRow(index);
            }}
            selected={index === selectedRow}
            sx={{ cursor: "pointer" }}>
              <TableCell>{food.name}{` [${food.unit}]`}</TableCell>
              <TableCell >{food.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
