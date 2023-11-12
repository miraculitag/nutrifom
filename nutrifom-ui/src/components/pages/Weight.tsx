import React from "react";
import { WhiteBar } from "../layout/WhiteBar";
import Box from "@mui/material/Box";
import { BasicDatePicker } from "../common/BasicDatePicker";
import { WeightInputField } from "../common/WeightInputField";
import BasicLineChart from "../common/BasicLineChart";
import { Button } from "@mui/material";

export const Weight = (testParams: any) => {
  const [currentWeight, setCurrentWeight] = React.useState('');
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleAddWeightClick = () => {
    const numericWeight = parseFloat(currentWeight);
    if (numericWeight >= 0) {
      console.log(`Suchbutton geklickt. Eingegebener Text: ${numericWeight}`);
      setIsButtonClicked(true);
      setTimeout(() => {
        setIsButtonClicked(false);
      }, 500);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  return (
    <Box style={{ display: "flex", justifyContent: "space-between" }}>
      <WhiteBar />

      <BasicLineChart ></BasicLineChart>

      <Box
        sx={{
          display: "flex",
          alignItems: "top",
          flexDirection: "column",
          width:"30%",
          height:"30%"
        }}
      >
        <Box
          sx={{
            flex: 2,
            backgroundColor: 'primary.light',
            display: "flex",
            flexDirection: "column",
            boxShadow: '2',
          }}
        >
          <Box
            sx={{
              margin: '5%', // Abstand zum Textfeld
            }}
          >
            <BasicDatePicker labelText="Datum auswählen" />
          </Box>
          <Box
            sx={{
              margin: '5%', // Abstand zum Textfeld
            }}
          >
            <WeightInputField labelText="Gewicht hinzufügen" placeholderText="Trage hier dein aktuelles Gewicht ein…" suffixText="kg" iconName="add_circle" />
          </Box>
          <Button
            sx={{
              margin: '5%', // Abstand zum Textfeld
              backgroundColor: isButtonClicked ? 'primary.secondary' : 'primary.main',
              color: 'white',
              '&:hover': {
                color: 'black',
              },
            }}
            variant="outlined"
            onClick={handleAddWeightClick}
          >
            Eintrag hinzufügen
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: 'primary.light',
            boxShadow: '2',
            marginTop: "5%",
          }}
        >
          tbd
        </Box>
      </Box>
      <WhiteBar />
    </Box>
  );
};
