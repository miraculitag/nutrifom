import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { InfoAlert } from "../common/InfoAlert";
import { DropDownMenu } from "../common/DropDownMenu";
import { BasicButton } from "../common/BasicButton";
import { Layout } from "../layout/Layout";
import { FloatInputField } from "../common/FloatInputField";
import { PalTable } from "../common/PalTable";
import {
  getKcalLast14Days,
  getWeightLast14Days,
  putAppUserGoal,
  putAppUserKcalGoal,
  putAppUserPal,
  putAppUserWpa,
} from "../../api";
import { useUser } from "../../userContext";

export const Calc = () => {
  const [isCalcKcalButtonClicked, setIsCalcKcalButtonClicked] =
    React.useState<boolean>(false);
  const [kcalRequirement, setKcalRequirement] = React.useState<number>(0);
  const [weightFor14Days, setWeightFor14Days] = React.useState<number[]>([]);
  const [kcalFor14Days, setKcalFor14Days] = React.useState<number[]>([]);
  const [dataFor14Days, setDataFor14Days] = React.useState<boolean>(false);
  const [pal, setPal] = React.useState<string>("");
  const [goal, setGoal] = React.useState<string>("");
  const [wpa, setWpa] = React.useState<number>(0);
  const [wpaHasError, setWpaHasError] = React.useState<boolean>(false);
  const [isPalInfoIconClicked, setIsPalInfoIconClicked] =
    React.useState<boolean>(false);

  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { user, updateUserAttribute, hasFetchedUser } = useUser();

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    checkDataSufficiency();
    setLocalStates();
  }, [hasFetchedUser]);

  const checkDataSufficiency = async () => {
    const weightResponse = await getWeightLast14Days(auth(), signOut, navigate);

    const kcalResponse = await getKcalLast14Days(auth(), signOut, navigate);

    const weightData = weightResponse.data;
    const kcalData = kcalResponse.data;

    setWeightFor14Days(weightResponse.data);
    setKcalFor14Days(kcalResponse.data);

    if (!weightData.includes(0) && !kcalData.includes(0)) {
      setDataFor14Days(true);
    }
  };

  const setLocalStates = () => {
    if (user) {
      setPal(user.pal);
      setGoal(user.goal);
      setWpa(user.wpa);
    }
  };

  const infoTextDataBased = {
    title: "Berechnung des Kalorienbedarfs:",
    description:
      "Dein Kalorienbedarf wird auf Grundlage deiner Nutriprotokolle und deines Gewichtsverlaufs der letzten eingetragenen 14 Tage berechnet. Achte am besten darauf, eine ähnliche Menge an Kohlenhydraten und Salz zu dir zunehmen, um Gewichtsschwankungen, verursacht durch Wassereinlagerungen, vorzubeugen. Achte außerdem darauf, dein tägliches Kalorienziel bestmöglich einzuhalten. Beide Faktoren helfen bei einer möglichst genauen Berechnung deines Kalorienbedarfs!",
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
        return 1.65;
    }
  };

  const wpaAsValue = (wpa: number) => {
    return wpa * 0.1;
  };

  const saveKcalReqAsKcalGoal = (kcalGoal: number) => {
    putAppUserKcalGoal(kcalGoal, auth(), signOut, navigate);
    updateUserAttribute({ kcalGoal: kcalGoal });
  };
  const calcUserAge = (dob: string) => {
    const currentDate = new Date();
    const userDob = new Date(dob);
    const yearDiff = currentDate.getFullYear() - userDob.getFullYear();
    const monthDiff = currentDate.getMonth() - userDob.getMonth();

    if (
      //Structure from ChatGPT 3.5
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < userDob.getDate())
    ) {
      return yearDiff - 1;
    } else {
      return yearDiff;
    }
  };

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
    putAppUserGoal(goal, auth(), signOut, navigate);
    updateUserAttribute({ goal: goal });

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
    putAppUserPal(pal, auth(), signOut, navigate);
    putAppUserWpa(wpa, auth(), signOut, navigate);
    putAppUserGoal(goal, auth(), signOut, navigate);

    updateUserAttribute({ pal: pal, wpa: wpa, goal: goal });

    const userAge = calcUserAge(user.dob);
    let basalMetabolicRate;

    if (user.gender === "Weiblich") {
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
              alignItems: "baseline", //Idea from ChatGPT 3.5
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
          {kcalRequirement === user?.kcalGoal ? (
            <IconButton sx={{ marginLeft: "2%" }}>
              <BookmarkIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          ) : (
            <Tooltip title="als neues Kalorienziel fürs Nutriprotokoll abspeichern">
              <IconButton
                onClick={() => saveKcalReqAsKcalGoal(kcalRequirement)}
                sx={{ marginLeft: "2%" }}
              >
                <BookmarkBorderIcon
                  sx={{ color: theme.palette.primary.main }}
                />
              </IconButton>
            </Tooltip>
          )}
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
