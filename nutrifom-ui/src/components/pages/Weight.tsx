import React from "react";
import { WhiteBar } from "../layout/WhiteBar";
import Box from "@mui/material/Box"; // Importieren Sie das Material-UI-Box-Element
import { BasicDatePicker } from "../common/BasicDatePicker";
import { WeightInputField } from "../common/WeightInputField";
import BasicLineChart from "../common/BasicLineChart";



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
          <WeightInputField labelText="Gewicht hinzufügen" placeholderText="Trage hier dein aktuelles Gewicht ein…" suffixText="kg" iconName="add_circle" />
        </Box>
        <BasicLineChart></BasicLineChart>
      </Box>
      <WhiteBar />
    </Box>
  );
};
