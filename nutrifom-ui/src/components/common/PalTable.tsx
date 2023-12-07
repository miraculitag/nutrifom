import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

export const PalTable = () => {
  const createData = (name: string, value: string) => {
    return { name, value };
  };

  const rows = [
    createData(
      "nicht aktiv:",
      "ausschließlich liegende oder sitzende Lebensweise"
    ),
    createData("eher nicht aktiv:", "ausschließlich sitzende Tätigkeit"),
    createData(
      "eher aktiv:",
      "sitzende Tätigkeit, zeitweilig auch stehende oder gehende Tätigkeiten"
    ),
    createData("aktiv:", "überwiegend stehende und gehende Tätigkeiten"),
    createData("sehr aktiv:", "körperlich anstrengende Tätigkeit"),
  ];
  return (
    <TableContainer
      sx={{
        backgroundColor: "inherit",
      }}
    >
      <Table size="small">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
