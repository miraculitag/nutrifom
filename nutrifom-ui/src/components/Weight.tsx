import React from "react";
import { WhiteBar } from "./WhiteBar";
import Box from "@mui/material/Box"; // Importieren Sie das Material-UI-Box-Element
import { SearchField } from './SearchField';
import { ThemeProvider } from '@mui/material/styles';
import nutrifomTheme from '../theme/nutrifomTheme';
import BasicDatePicker from "./BasicDatePicker";


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
            justifyContent: "center",
            boxShadow: '2', // Hinzugefügter Schatten
          }}
        >
          <SearchField labelText="Gewicht hinzufügen" placeholderText="Trage hier dein aktuelles Gewicht ein…" suffixText="kg" iconName="add_circle"/>
        </Box>
        <WhiteBar />
      </Box>
  );
};
