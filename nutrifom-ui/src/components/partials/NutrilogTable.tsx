import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { FoodEntry, Recipe } from "../../types";

export interface NutrilogTableProps {
  nutrilogItems: (FoodEntry | Recipe)[] | undefined;
  onSelectRow: (index: number) => void;
  selectedRow: number | null;
}

export const NutrilogTable = (props: NutrilogTableProps) => {

  //Structure from ChatGPT 3.5
  const getEntryName = (entry: (FoodEntry | Recipe)) => {
    if ("productCode" in entry && "productName" in entry) {
      return `${entry.productName} [g]`;
    } else if ("recipeTitle" in entry && "portions" in entry) {
      return `${entry.recipeTitle} [Portion(en)]`;
    }
  };

  //Structure from ChatGPT 3.5
  const getQuantity = (entry: (FoodEntry | Recipe)) => {
    if ("productCode" in entry && "productName" in entry) {
      return entry.productQuantity;
    } else if ("recipeTitle" in entry && "portions" in entry) {
      return entry.portions;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {props.nutrilogItems?.map((entry, entryIndex) => (
            <TableRow
              key={entryIndex}
              onClick={() => props.onSelectRow(entryIndex)}
              selected={entryIndex === props.selectedRow}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{getEntryName(entry)}</TableCell>
              <TableCell>{getQuantity(entry)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
