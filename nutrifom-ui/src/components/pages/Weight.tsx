import React from "react";
import { BasicDatePicker } from "../common/BasicDatePicker";
import { FloatInputField } from "../common/FloatInputField";
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
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [currentWeight, setCurrentWeight] = React.useState<number>(0);
  const [weightHasError, setWeightHasError] = React.useState(false);

  const infoText = {
    title: "Gewichtsveränderung:",
    description:
      "Beachte, dass kurzfristige Gewichtsschwankungen mit Wassereinlagerungen zusammenhängen können. Wenn du mehr Kohlenhydrate oder mehr Salz als sonst gegessen hast, kann es gut sein, dass du am nächsten Tag ein paar kg mehr wiegst.",
  };

  const handleAddWeightClick = () => {
    setWeightHasError(false);
    const currentDate = selectedDate;
    if (currentWeight >= 0) {
      console.log(
        `Suchbutton geklickt. Eingegebener Text: ${currentWeight} ${currentDate}`
      );
    }
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
            width: "35%",
            height: "30%",
          }}
        >
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
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
                width="100%"
              />
            </Box>
            <Box
              sx={{
                margin: "5%",
              }}
            >
              <FloatInputField
                label="Gewicht hinzufügen"
                suffix="kg"
                value={currentWeight}
                setValue={setCurrentWeight}
                hasError={weightHasError}
                setHasError={setWeightHasError}
                errorText="Dein Gewicht kann nicht negativ oder 0 sein."
                width="100%"
              />
            </Box>
            <BasicButton
              label="Eintrag hinzufügen"
              width="90%"
              isButtonClicked={isButtonClicked}
              onButtonClick={(e) => {
                currentWeight <= 0
                  ? setWeightHasError(true)
                  : handleAddWeightClick();
              }}
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