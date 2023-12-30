import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export interface FoodTableProps {
  nutrilogItems: any[] | undefined;
  onSelectRow: (index: number) => void;
  selectedRow: number | null;
}

function getEntryName(entry: any): string {
  if ("productCode" in entry && "productName" in entry) {
    return entry.productName.concat(" [g]");;
  } else if ("recipeId" in entry && "recipeTitle" in entry) {
    return entry.recipeTitle.concat(" [Portion(en)]");
  }
  return "Unbekannter Name";
}

function getQuantity(entry: any): string {
  if ("productCode" in entry && "productName" in entry) {
    return entry.productQuantity;
  } else if ("recipeId" in entry && "recipeTitle" in entry) {
    return entry.portions;
  }
  return "Unbekannter Name";
}


export default function FoodTable(props: FoodTableProps) {
  const { nutrilogItems } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {nutrilogItems?.map((entry, entryIndex) => (
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
}
