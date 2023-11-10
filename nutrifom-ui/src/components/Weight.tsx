import React from "react";
import { WhiteBar } from "./WhiteBar";
import Box from "@mui/material/Box"; // Importieren Sie das Material-UI-Box-Element
import { SearchField } from './SearchField';
import { BasicDatePicker } from "./BasicDatePicker";


export const Weight = (testParams: any) => {
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
        }}
      >
        <Box sx={{
          display: "inline-flex",
          height: "12%",
        }}>
          <BasicDatePicker labelText="Datum auswählen"  />
        </Box>
        <Box sx={{
          display: "inline-flex",
          height: "12%",
        }}>
          <SearchField labelText="Gewicht hinzufügen" placeholderText="Trage hier dein aktuelles Gewicht ein…" suffixText="kg" iconName="add_circle" />
        </Box>
      </Box>
      <WhiteBar />
    </Box>
  );
};
