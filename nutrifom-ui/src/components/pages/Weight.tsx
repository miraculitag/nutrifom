import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { Alert, Box, Typography, useTheme } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import {
  addWeightEntry,
  handleTokenExpiration,
  isTokenExpired,
} from "../../api";
import { JustifiedTypography } from "../common/JustifiedTypography";
import { BasicDatePicker } from "../common/BasicDatePicker";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";
import { Layout } from "../layout/Layout";
import { WeightLineChart } from "../partials/WeightLineChart";

export const Weight = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [dateHasError, setDateHasError] = React.useState<boolean>(false);
  const [weightHasError, setWeightHasError] = React.useState<boolean>(false);
  const [currentWeight, setCurrentWeight] = React.useState<number>(0);
  const [weightUpdated, setWeightUpdated] = React.useState<number>(0);
  const [dateErrorText, setDateErrorText] = React.useState<string>(
    "Du muss ein Datum auswählen."
  );

  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const infoText = {
    title: "Gewichtsveränderung:",
    description:
      "Beachte, dass kurzfristige Gewichtsschwankungen mit Wassereinlagerungen zusammenhängen können. Wenn du mehr Kohlenhydrate oder mehr Salz als sonst gegessen hast, kann es gut sein, dass du am nächsten Tag ein paar kg mehr wiegst.",
  };

  const handleAddWeightClick = async () => {
    setWeightHasError(false);
    setDateHasError(false);

    const dateString: string =
      selectedDate?.format("YYYY-MM-DD") ?? "1990-01-01";

    if (isTokenExpired(auth())) {
      handleTokenExpiration(signOut, navigate);
    } else {
      await addWeightEntry(
        { weight: currentWeight, entryDate: dateString },
        auth()
      ).then(() => {
        setWeightUpdated((prevValue) => prevValue + 1);
      });
    }
  };

  const handleDatePickerChange = (value: Dayjs | null) => {
    setSelectedDate(value);
  };

  return (
    <Layout>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}
      >
        <WeightLineChart weightUpdate={weightUpdated} />
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
            <Box>
              <BasicDatePicker
                label="Datum auswählen"
                value={selectedDate}
                onChange={handleDatePickerChange}
                width="100%"
                required={false}
                hasError={dateHasError}
                errorText={dateErrorText}
                disableFuture={true}
              />
            </Box>
            <Box
              sx={{
                marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              <FloatInputField
                label="Gewicht hinzufügen"
                suffix="kg"
                value={currentWeight}
                setValue={setCurrentWeight}
                hasError={weightHasError}
                errorText="Dein Gewicht kann nicht kleiner als 40 sein."
                width="100%"
                required={true}
              />
            </Box>
            <BasicButton
              label="Eintrag hinzufügen"
              width="100%"
              onButtonClick={(e) => {
                if (
                  currentWeight < 40 ||
                  isNaN(currentWeight) ||
                  selectedDate === null ||
                  dayjs().diff(selectedDate, "day") >= 14
                ) {
                  if (currentWeight < 40 || isNaN(currentWeight)) {
                    setWeightHasError(true);
                  } else {
                    setWeightHasError(false);
                  }
                  if (
                    selectedDate === null ||
                    dayjs().diff(selectedDate, "day") >= 14
                  ) {
                    setDateHasError(true);
                    if (dayjs().diff(selectedDate, "day") >= 14) {
                      setDateErrorText(
                        "Du kannst dein Gewicht nur für die letzten 14 Tage eintragen."
                      );
                    } else {
                      setDateErrorText("Du hast kein Datum eingetragen.");
                    }
                  } else {
                    setDateHasError(false);
                  }
                } else {
                  handleAddWeightClick();
                }
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
