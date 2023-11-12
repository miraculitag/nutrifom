import React from "react";
import { WhiteBar } from "../layout/WhiteBar";

import { BasicDatePicker } from "../common/BasicDatePicker";
import { WeightInputField } from "../common/WeightInputField";
import BasicLineChart from "../common/BasicLineChart";
import { Alert, Button, Box, Typography, useTheme } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import JustifiedTypography from "../common/JustifiedTypography";

export const Weight = (testParams: any) => {
  const theme = useTheme();
  const [currentWeight, setCurrentWeight] = React.useState("");
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const infoText = {
    title: "Gewichtsveränderung:",
    description:
      "Beachte, dass kurzfristige Gewichtsschwankungen mit Wassereinlagerungen zusammenhängen können. Wenn du mehr Kohlenhydrate oder mehr Salz als sonst gegessen hast, kann es gut sein, dass du am nächsten Tag ein paar kg mehr wiegst.",
  };

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

      <BasicLineChart></BasicLineChart>

      <Box
        sx={{
          display: "flex",
          alignItems: "top",
          flexDirection: "column",
          width: "30%",
          height: "30%",
        }}
      >
        <Box
          sx={{
            flex: 2,
            backgroundColor: "primary.light",
            display: "flex",
            flexDirection: "column",
            boxShadow: "2",
          }}
        >
          <Box
            sx={{
              margin: "5%", // Abstand zum Textfeld
            }}
          >
            <BasicDatePicker labelText="Datum auswählen" />
          </Box>
          <Box
            sx={{
              margin: "5%", // Abstand zum Textfeld
            }}
          >
            <WeightInputField
              labelText="Gewicht hinzufügen"
              placeholderText="Trage hier dein aktuelles Gewicht ein…"
              suffixText="kg"
              iconName="add_circle"
            />
          </Box>
          <Button
            sx={{
              margin: "5%", // Abstand zum Textfeld
              backgroundColor: isButtonClicked
                ? "primary.secondary"
                : "primary.main",
              color: "white",
              "&:hover": {
                color: "black",
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
            backgroundColor: "primary.light",
            boxShadow: "2",
            marginTop: "10%",
            paddingRight: "5%",
          }}
        >
          <Alert
            sx={{
              backgroundColor: theme.palette.primary.light,
            }}
            icon={<InfoOutlined sx={{ color: theme.palette.primary.main }} />}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {infoText.title}
            </Typography>
            <JustifiedTypography text={infoText.description} />
          </Alert>
        </Box>
      </Box>
      <WhiteBar />
    </Box>
  );
};
