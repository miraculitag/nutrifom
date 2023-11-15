import React from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import InfoAlert from "../common/InfoAlert";
import DropDownMenu from "../common/DropDownMenu";
import BasicButton from "../common/BasicButton";
import { Layout } from "../layout/Layout";

export const Calc = (testParams: any) => {
  const theme = useTheme();
  const [isCalcButtonClicked, setIsCalcButtonClicked] = React.useState(false);

  const [kcalRequirement, setKcalRequirement] = React.useState<number>();

  const dataFor14Days = true;

  const testUser = {
    id: 1,
    name: "Username",
    weight: 70,
    dob: "2000-01-01",
    goal: "Aufbauen",
    height: 170,
    gender: "weiblich",
    pal: "eher nicht aktiv",
    wpa: 2.5,
    image: "",
    email: "x@testmail.de",
  };

  const testWeights = [
    70.1, 71.5, 70.7, 69.8, 69.7, 68.6, 70.2, 70.6, 70.3, 69.2, 68.5, 68.7,
    69.8, 69.6,
  ];
  const testKcalIntake = [
    2334, 2302, 2274, 2256, 2354, 2296, 2315, 2294, 2312, 2284, 2296, 2354,
    2286, 2317,
  ];

  const [pal, setPal] = React.useState(testUser.pal);
  const [goal, setGoal] = React.useState(testUser.goal);

  const infoTextDataBased = {
    title: "Berechnung des Kalorienbedarfs:",
    description:
      "Dein Kalorienbedarf wird auf Grundlage deiner Nutriprotokolle und deines Gewichtsverlaufs der letzten eingetragenen 14 Tage berechnet. Achte am besten darauf, eine ähnliche Menge an Kohlenhydraten und Salz zu dir zunehmen, um Gewichtsschwankungen verursacht durch Wassereinlagerungen vorzubeugen. Achte außerdem darauf dein tägliches Kalorienziel bestmöglich einzuhalten. Beide Faktoren helfen bei einer möglichst genauen Berechnung deines Kalorienbedarfs!",
  };

  const infoTextFormula = {
    title: "Berechnung des Kalorienbedarfs:",
    description:
      "Dein Kalorienbedarf wird auf Grundlage einer Formel berechnet, welche verschiedene von dir angegebene Parameter berücksichtigt. Beachte, dass die Formel individuelle Gegebenheiten nicht berücksichtigt und daher eine Annäherung darstellt. Sobald du 14 Tage lang dein Nutriprotokoll gepflegt und dein Gewicht getrackt hast, wird dein Kalorienbedarf auf Grundlage dieser Daten berechnet.",
  };

  const palCatergories = [
    "nicht aktiv",
    "eher nicht aktiv",
    "eher aktiv",
    "aktiv",
    "sehr aktiv",
  ];
  const goals = ["Aufbauen", "Definieren", "Halten"];

  const palAsValue = (pal: string) => {
    switch (pal) {
      case "nicht aktiv":
        return 1.25;
      case "eher nicht aktiv":
        return 1.45;
      case "eher aktiv":
        return 1.65;
      case "aktiv":
        return 1.85;
      case "sehr aktiv":
        return 2.2;
      default:
        return 1.65; //tbd
    }
  };

  const wpaAsValue = (wpa: number) => {
    return wpa * 0.1;
  };

  const saveKcalGoalToFoodLog = () => {}; //tbd

  const handleCalcButtonClick = () => {
    setIsCalcButtonClicked(true);
    let newKcalRequirement;
    let goalDependetPart = 0;

    if (dataFor14Days) {
      const weightsWeek1 = testWeights.slice(0, 7);
      const weightsWeek2 = testWeights.slice(7);

      const avgWeightWeek1 =
        weightsWeek1.reduce((total, current) => total + current, 0) / 7;
      const avgWeightWeek2 =
        weightsWeek2.reduce((total, current) => total + current, 0) / 7;

      const weightDifference = avgWeightWeek2 - avgWeightWeek1;

      const kcalIntakeWeek1 = testKcalIntake.slice(0, 7);
      const kcalIntakeWeek2 = testKcalIntake.slice(7);

      const avgKcalIntakeWeek1 =
        kcalIntakeWeek1.reduce((total, current) => total + current, 0) / 7;

      const avgKcalIntakeWeek2 =
        kcalIntakeWeek2.reduce((total, current) => total + current, 0) / 7;

      const avgKcalIntake = (avgKcalIntakeWeek1 + avgKcalIntakeWeek2) / 2;

      const weeklyKcalDifference = weightDifference * 7000;

      const dailyKcalDifference = weeklyKcalDifference / 7;

      newKcalRequirement = dailyKcalDifference * -1 + avgKcalIntake; //tbd
    } else {
      const currentDate = new Date();
      const userDob = new Date(testUser.dob); //tbd
      const userAge = currentDate.getFullYear() - userDob.getFullYear();

      let basalMetabolicRate;

      if (testUser.gender === "weiblich") {
        basalMetabolicRate =
          65.51 +
          9.6 * testUser.weight +
          1.85 * testUser.height -
          4.68 * userAge;
      } else {
        basalMetabolicRate =
          66.47 +
          13.75 * testUser.weight +
          5 * testUser.height -
          6.76 * userAge;
      }
      const physicalActivity = palAsValue(pal) + wpaAsValue(testUser.wpa);

      newKcalRequirement = basalMetabolicRate * physicalActivity;
    }

    if (goal === "Aufbauen") {
      goalDependetPart = 300;
    } else if (goal === "Definieren") {
      goalDependetPart = -300;
    }
    newKcalRequirement = newKcalRequirement + goalDependetPart;

    setKcalRequirement(Math.round(newKcalRequirement));
  };

  return (
    <Layout>
      <Box
        sx={{
          margin: "auto",
          width: "50%",
          justifyContent: "center",
        }}
      >
        {dataFor14Days ? (
          ""
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-around",
              paddingTop: "5%",
            }}
          >
            <DropDownMenu
              title={"alltägliches körperliches Aktivitätslevel"}
              options={palCatergories}
              value={pal}
              setValue={setPal}
            />
            <TextField
              sx={{ width: "250px" }}
              label="sportliche Aktivität in Stunden/Woche"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-around",
            paddingTop: "5%",
          }}
        >
          <DropDownMenu
            title={"persönliches Ziel"}
            options={goals}
            value={goal}
            setValue={setGoal}
          />
          <BasicButton
            label="Kalorienbedarf Berechnen"
            width="250px"
            isButtonClicked={isCalcButtonClicked}
            onButtonClick={handleCalcButtonClick}
          />
        </Box>
      </Box>
      {isCalcButtonClicked ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <Typography sx={{ fontSize: "150%" }}>
            Dein Kalorienbedarf:
          </Typography>
          <Typography
            sx={{
              fontSize: "150%",
              fontWeight: "bold",
              paddingLeft: "2%",
            }}
          >
            {kcalRequirement} kcal
          </Typography>
          <Tooltip title="als neues Kalorienziel fürs Nutriprotokoll abspeichern">
            <IconButton
              onClick={() => saveKcalGoalToFoodLog()}
              sx={{ marginLeft: "2%" }}
            >
              <BookmarkBorderIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        ""
      )}

      <Box sx={{ paddingTop: "5%" }}>
        <InfoAlert
          title={
            dataFor14Days ? infoTextDataBased.title : infoTextFormula.title
          }
          description={
            dataFor14Days
              ? infoTextDataBased.description
              : infoTextFormula.description
          }
        />
      </Box>
    </Layout>
  );
};
