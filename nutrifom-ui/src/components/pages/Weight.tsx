import React from "react";
import { BasicDatePicker } from "../common/BasicDatePicker";
import { BasicIntInputField } from "../common/BasicIntInputField";
import BasicLineChart from "../common/BasicLineChart";
import { Alert, Box, Typography, useTheme } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import JustifiedTypography from "../common/JustifiedTypography";
import { Layout } from "../layout/Layout";
import BasicButton from "../common/BasicButton";
import dayjs, { Dayjs } from "dayjs";

export const Weight = (testParams: any) => {
  const theme = useTheme();
  const [isButtonClicked] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [currentWeight, setCurrentWeight] = React.useState('');
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(currentWeight.length > 0 && parseFloat(currentWeight) < 0);
  }, [currentWeight]);

  const infoText = {
    title: "Gewichtsveränderung:",
    description:
      "Beachte, dass kurzfristige Gewichtsschwankungen mit Wassereinlagerungen zusammenhängen können. Wenn du mehr Kohlenhydrate oder mehr Salz als sonst gegessen hast, kann es gut sein, dass du am nächsten Tag ein paar kg mehr wiegst.",
  };

  const handleAddWeightClick = () => {
    const numericWeight = parseFloat(currentWeight);
    const currentDate = selectedDate;
    if (numericWeight >= 0) {
      console.log(`Suchbutton geklickt. Eingegebener Text: ${numericWeight} ${currentDate}`);
    };
  }

  const handleWeightInputChange = (value: number) => {
    setCurrentWeight(value.toString());
  };

  const handleDatePickerChange = (value: Dayjs | null) => {
    setSelectedDate(value);
  };

  return (
    <Layout>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        

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
                margin: "5%",
              }}
            >
              <BasicDatePicker
                label="Datum auswählen"
                value={selectedDate}
                onChange={handleDatePickerChange}
                width="100%" />
            </Box>
            <Box
              sx={{
                margin: "5%",
              }}
            >
              <BasicIntInputField
                label="Gewicht hinzufügen"
                suffix="kg"
                value={parseFloat(currentWeight) || 0}
                onChange={handleWeightInputChange}
                width="100%"
                hasError={hasError}
              />
            </Box>
            <BasicButton
              label="Eintrag hinzufügen"
              width="90%"
              isButtonClicked={isButtonClicked}
              onButtonClick={handleAddWeightClick}
            />
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
      </Box>
    </Layout>
  );
};
