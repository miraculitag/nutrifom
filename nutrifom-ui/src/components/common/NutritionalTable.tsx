import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export interface NutritionalTableProps {
  energyKcal: number;
  proteins: number;
  saturatedFat: number;
  unsaturatedFat: number;
  carbohydrates: number;
}

export const NutritionalTable = (props: NutritionalTableProps) => {
  const createData = (name: string, value: number) => {
    return { name, value };
  };

  const rows = [
    createData("Energie [kcal]:", props.energyKcal),
    createData("Eiweiß [g]:", props.proteins),
    createData("Fett [g]:", props.saturatedFat + props.unsaturatedFat),
    createData("davon gesättigte Fettsäuren [g]:", props.saturatedFat),
    createData("davon ungesättigte Fettsäuren [g]:", props.unsaturatedFat),
    createData("Kohlenhydrate [g]:", props.carbohydrates),
  ];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
