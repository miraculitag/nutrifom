import Box from "@mui/material/Box"; // Importieren Sie das Material-UI-Box-Element
import { SearchField } from "../common/SearchField";
import { WhiteBar } from "../layout/WhiteBar";

export const FoodLog = (testParams: any) => {
  return (
    <Box style={{ display: "flex", justifyContent: "space-between" }}>
      <WhiteBar />
      <Box
        sx={{
          backgroundColor: "lightgray",
          flex: 1,
          display: "flex",
          alignItems: "top",
          flexDirection: "column",
          boxShadow: '2',
        }}>
        <Box sx={{
          display: "inline-flex",
          height: "12%",
        }}>
          <SearchField labelText="Lebensmittel hinzufügen" placeholderText="Suche hier nach einem Lebensmittel…" suffixText="" iconName="add_circle" /></Box>
        <Box sx={{
          display: "inline-flex",
          height: "12%",
        }}>
          <SearchField labelText="Rezept hinzufügen" placeholderText="Suche hier nach einem Rezept..." suffixText="" iconName="add_circle" /></Box>
      </Box>
      <WhiteBar />
    </Box>
  );
};
