import React from "react";
import { Box, TextField, useTheme } from "@mui/material";
import InfoAlert from "../common/InfoAlert";
import DropDownMenu from "../common/DropDownMenu";
import BasicButton from "../common/BasicButton";

export const Calc = (testParams: any) => {
  const theme = useTheme();
  const [isButtonDataBasedClicked, setIsButtonDataBasedClicked] =
    React.useState(false);
  const [isButtonFormulaClicked, setIsButtonFormulaClicked] =
    React.useState(false);

  const dataFor14Days = true;

  const testUser = {
    id: 1,
    name: "Username",
    weight: 70,
    dob: "01.01.2000",
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

  const palAsValue = (pal: String) => {
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
        console.log("PAL-Kategorie nicht erhalten");
    }
  };

  const wpaAsValue = (wpa: number) => {
    return wpa * 0.1;
  };

  const handleButtonDataBasedClick = () => {
    console.log("data based");
  };

  const handleButtonFormulaClick = () => {
    console.log("formula");
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
              isButtonClicked={
                dataFor14Days
                  ? isButtonDataBasedClicked
                  : isButtonFormulaClicked
              }
              onButtonClick={
                dataFor14Days
                  ? handleButtonDataBasedClick
                  : handleButtonFormulaClick
              }
            />
          </Box>
        </Box>
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
