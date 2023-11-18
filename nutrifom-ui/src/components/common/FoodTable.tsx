import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export interface FoodTableProps {
  food: string;
  value: string;
  einheit: string;
}

export default function FoodTable(props: FoodTableProps) {
  function createData(name: string, value: string, einheit:string) {
    return { name, value, einheit };
  }

  const rows = [
    createData(props.food, props.value, props.einheit),
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
              <TableCell align="right">{row.einheit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
