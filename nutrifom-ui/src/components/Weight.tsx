import React from "react";
import { WhiteBar } from "./WhiteBar";
import Box from "@mui/material/Box"; // Importieren Sie das Material-UI-Box-Element
import { SearchField } from './SearchField';
import { ThemeProvider } from '@mui/material/styles';
import nutrifomTheme from '../theme/nutrifomTheme';


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
          }}
        >
          <SearchField></SearchField>
        </Box>
        <WhiteBar />
      </Box>
  );
};
