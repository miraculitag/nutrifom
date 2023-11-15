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

export const Calc = (testParams: any) => {
  const theme = useTheme();
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [kcalRequirement, setKcalRequirement] = React.useState<number>();

  const dataFor14Days = false;

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
  const goals = ["Aufbauen", "Definieren"];

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

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    let newKcalRequirement;
    let goalDependetPart = 0;

    if (dataFor14Days) {
      newKcalRequirement = 2000; //tbd
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
      const physicalActivity =
        palAsValue(testUser.pal) + wpaAsValue(testUser.wpa);

      newKcalRequirement = basalMetabolicRate * physicalActivity;
    }

    if (testUser.goal === "Aufbauen") {
      goalDependetPart = 300;
    } else if (testUser.goal === "Definieren") {
      goalDependetPart = -300;
    }
    newKcalRequirement = newKcalRequirement + goalDependetPart;

    setKcalRequirement(Math.round(newKcalRequirement));
  };

  return (
    <>
      <Box
        sx={{
          margin: "auto",
          width: "80%",
        }}
      >
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
                defaultValue={testUser.pal}
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
              defaultValue={testUser.goal}
            />
            <BasicButton
              label="Kalorienbedarf Berechnen"
              isButtonClicked={isButtonClicked}
              onButtonClick={handleButtonClick}
            />
          </Box>
        </Box>
        {isButtonClicked ? (
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
              <IconButton sx={{ marginLeft: "2%" }}>
                <BookmarkBorderIcon
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: "black",
                    },
                  }}
                />
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
      </Box>
    </>
  );
};
