import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export interface NutrilogTableProps {
  nutrilogItems: any[] | undefined;
  onSelectRow: (index: number) => void;
  selectedRow: number | null;
}

export const NutrilogTable = (props: NutrilogTableProps) => {

  //Structure from ChatGPT 3.5
  const getEntryName = (entry: any): string => {
    if ("productCode" in entry && "productName" in entry) {
      return `${entry.productName} [g]`;
    } else {
      return `${entry.recipeTitle} [Portion(en)]`;
    }
  };

  //Structure from ChatGPT 3.5
  const getQuantity = (entry: any): string => {
    if ("productCode" in entry && "productName" in entry) {
      return entry.productQuantity;
    } else {
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
