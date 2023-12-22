import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAuthHeader } from "react-auth-kit";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import { InfoAlert } from "../common/InfoAlert";
import { DropDownMenu } from "../common/DropDownMenu";
import { BasicButton } from "../common/BasicButton";
import { Layout } from "../layout/Layout";
import { FloatInputField } from "../common/FloatInputField";
import { PalTable } from "../common/PalTable";
import {
  getAppUser,
  getKcalLast14Days,
  getWeightLast14Days,
  putAppUserGoal,
  putAppUserPal,
  putAppUserWpa,
} from "../../api";

import { AppUser } from "../../types";

export const Calc = () => {
  const [isCalcKcalButtonClicked, setIsCalcKcalButtonClicked] =
    React.useState(false);
  const [kcalRequirement, setKcalRequirement] = React.useState<number>();
  const [user, setUser] = React.useState<AppUser>();
  const [weightFor14Days, setWeightFor14Days] = React.useState<number[]>([]);
  const [kcalFor14Days, setKcalFor14Days] = React.useState<number[]>([]);
  const [dataFor14Days, setDataFor14Days] = React.useState(false);
  const [pal, setPal] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [wpa, setWpa] = React.useState(0);
  const [wpaHasError, setWpaHasError] = React.useState(false);
  const [isPalInfoIconClicked, setIsPalInfoIconClicked] = React.useState(false);

  React.useEffect(() => {
    checkDataSuffiency();

    getAppUser(auth()).then((response) => {
      setUser(response.data);
      setPal(response.data.pal);
      setGoal(response.data.goal);
      setWpa(response.data.wpa);
    });
  }, []);

  const theme = useTheme();
  const auth = useAuthHeader();

  const checkDataSuffiency = async () => {
    const weightResponse = await getWeightLast14Days(auth());

    const kcalResponse = await getKcalLast14Days(auth());

    const weightData = weightResponse.data;
    const kcalData = kcalResponse.data;

    setWeightFor14Days(weightResponse.data);
    setKcalFor14Days(kcalResponse.data);

    if (!weightData.includes(0) && !kcalData.includes(0)) {
      setDataFor14Days(true);
    }
  };

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

  const saveKcalGoalToNutrilog = () => {}; //tbd

  const calcGoalDependentPart = (goal: string) => {
    if (goal === "Aufbauen") {
      return 300;
    } else if (goal === "Definieren") {
      return -300;
    } else {
      return 0;
    }
  };

  const calcKcalMethodA = () => {
    putAppUserGoal(goal, auth());

    const weightsWeek1 = weightFor14Days.slice(0, 7);
    const weightsWeek2 = weightFor14Days.slice(7);

    const avgWeightWeek1 =
      weightsWeek1.reduce((total, current) => total + current, 0) / 7;
    const avgWeightWeek2 =
      weightsWeek2.reduce((total, current) => total + current, 0) / 7;

    const weightDifference = avgWeightWeek2 - avgWeightWeek1;

    const kcalIntakeWeek1 = kcalFor14Days.slice(0, 7);
    const kcalIntakeWeek2 = kcalFor14Days.slice(7);

    const avgKcalIntakeWeek1 =
      kcalIntakeWeek1.reduce((total, current) => total + current, 0) / 7;

    const avgKcalIntakeWeek2 =
      kcalIntakeWeek2.reduce((total, current) => total + current, 0) / 7;

    const avgKcalIntake = (avgKcalIntakeWeek1 + avgKcalIntakeWeek2) / 2;

    const weeklyKcalDifference = weightDifference * 7000;

    const dailyKcalDifference = weeklyKcalDifference / 7;

    return dailyKcalDifference * -1 + avgKcalIntake; //tbd
  };

  const calcKcalMethodB = () => {
    if (!user) {
      return 0;
    }
    setWpaHasError(false);
    putAppUserPal(pal, auth());
    putAppUserWpa(wpa, auth());
    putAppUserGoal(goal, auth());

    const currentDate = new Date();
    const userDob = new Date(user.dob); //tbd
    const userAge = currentDate.getFullYear() - userDob.getFullYear();

    let basalMetabolicRate;

    if (user.gender === "weiblich") {
      basalMetabolicRate =
        65.51 + 9.6 * user.initialWeight + 1.85 * user.height - 4.68 * userAge;
    } else {
      basalMetabolicRate =
        66.47 + 13.75 * user.initialWeight + 5 * user.height - 6.76 * userAge;
    }

    const physicalActivity = palAsValue(pal) + wpaAsValue(wpa);

    return basalMetabolicRate * physicalActivity;
  };

  const calcKcal = () => {
    setIsCalcKcalButtonClicked(true);
    let newKcalRequirement;

    dataFor14Days
      ? (newKcalRequirement = calcKcalMethodA() + calcGoalDependentPart(goal))
      : (newKcalRequirement = calcKcalMethodB() + calcGoalDependentPart(goal));

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
              width={"42%"}
              options={palCatergories}
              value={pal}
              setValue={setPal}
              infoIcon={true}
              isInfoIconClicked={isPalInfoIconClicked}
              setIsInfoIconClicked={setIsPalInfoIconClicked}
              required={false}
            />
            <FloatInputField
              label={"sportliche Aktivität in Stunden/Woche"}
              suffix={"h/w"}
              width={"42%"}
              value={wpa}
              setValue={setWpa}
              hasError={wpaHasError}
              errorText={"Die sportliche Akivität kann nicht negativ sein."}
              required={false}
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
            width={"42%"}
            options={goals}
            value={goal}
            setValue={setGoal}
            required={false}
          />
          <BasicButton
            label="Kalorienbedarf Berechnen"
            width="42%"
            isButtonClicked={isCalcKcalButtonClicked}
            onButtonClick={
              dataFor14Days
                ? () => calcKcal()
                : () => {
                    wpa < 0 ? setWpaHasError(true) : calcKcal();
                  }
            }
          />
        </Box>
      </Box>
      {isCalcKcalButtonClicked ? (
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
              onClick={() => saveKcalGoalToNutrilog()}
              sx={{ marginLeft: "2%" }}
            >
              <BookmarkBorderIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        ""
      )}
      <Stack
        sx={{
          paddingTop: "5%",
          width: "60%",
          margin: "auto",
        }}
        spacing={2}
      >
        {isPalInfoIconClicked && (
          <InfoAlert
            title={"Kategorien des körperlichen Aktivitätslevels:"}
            description={""}
            table={<PalTable />}
          />
        )}
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
      </Stack>
    </Layout>
  );
};
