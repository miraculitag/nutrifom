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
  onSelectRow: (index: number) => void;
}



export default function FoodTable(props: FoodTableProps) {
  const { nutrilogItems, onSelectRow } = props;
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow((prevIndex) => (prevIndex === index ? null : index));
    onSelectRow(index);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {nutrilogItems.map((food, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(index)}
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
