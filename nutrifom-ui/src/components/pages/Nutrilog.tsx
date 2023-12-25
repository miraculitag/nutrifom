import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { BasicButton } from "../common/BasicButton";
import { FloatInputField } from "../common/FloatInputField";
import FoodTable, { FoodItem } from "../partials/FoodTable";
import { NutritionalTable } from "../common/NutritionalTable";
import { TextInputField } from "../common/TextInputField";
import { Layout } from "../layout/Layout";
import KcalFoodChart from "../partials/KcalFoodChart";
import {
  addProductToNutrilog,
  authenticateAppUser,
  getNutrilog,
  searchOFF,
} from "../../api";
import { useAuthHeader } from "react-auth-kit";
import { NurtilogEntryRequest } from "../../types";
import { response } from "express";

export const Nutrilog = (testParams: any) => {
  const theme = useTheme();
  const auth = useAuthHeader();

  const [isButtonClicked] = React.useState(false);
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [SearchTextFood, setSearchTextFood] = React.useState<string>("");
  const [FoodSearchHasError, setFoodSearchHasError] = React.useState(false);
  const [currentFoodAmount, setCurrentFoodAmount] = React.useState<number>(0);
  const [foodAmountHasError, setFoodAmountHasError] = React.useState(false);
  const [searchTextRecepie, setSearchTextRecepie] = React.useState<string>("");
  const [recepieSearchHasError, setRecepieSearchHasError] =
    React.useState(false);
  const [currentPortionAmount, setCurrentPortionAmount] =
    React.useState<number>(0);
  const [portionAmountHasError, setPortionAmountHasError] =
    React.useState(false);
  const [selectedFood, setSelectedFood] =
    React.useState<NurtilogEntryRequest | null>(null);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const sevenDaysAgo = dayjs().subtract(7, "day");

  const [apiData, setApiData] = React.useState<any>(null);

  const [nutrilog, setNutrilog] = useState<NurtilogEntryRequest[]>([]);

  React.useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      getNutrilog(formattedDate, auth())
        .then((response) => {
          setNutrilog(response.data);
        })
        .catch((error) => {
          console.log("Fehler:", error);
        });
    }
  }, [selectedDate, auth]);

  React.useEffect(() => {
    if (SearchTextFood !== "") {
      searchOFF(SearchTextFood, auth())
        .then((response) => {
          setApiData(response.data);
        })
        .catch((error) => {
          console.log("Fehler:", error);
        });
    }
  }, [SearchTextFood]);

  const handleChangeSearchFoodTextAmount = () => {
    setFoodAmountHasError(false);
    setFoodSearchHasError(false);

    const dateString: string = currentDate;
    const productItem = {
      code: "123456",
      productName: SearchTextFood,
      product_quantity: currentFoodAmount,
      serving_quantity: 200,
      proteins_serving: 3,
      carbohydrates_serving: 150,
      energy_kcal_serving: 100,
      saturated_fat_serving: 30,
      unsaturated_fat_serving: 40,
    };

    if (currentFoodAmount >= 0) {
      addProductToNutrilog(
        { product: productItem, entryDate: dateString },
        auth()
      )
        .then((response) => {
          console.log("API-Aufruf erfolgreich:", response.data);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            console.log("Error 403 while putting weight:", auth());
          }
        });
    }
  };

  const handleChangeSearchPortionRecepieText = () => {
    setPortionAmountHasError(false);
    setRecepieSearchHasError(false);
    console.log(`Suchbutton geklickt. Eingegebener Text: ${searchTextRecepie}`);
  };

  const getTotalNutritionalValues = () => {
    return nutrilog.reduce(
      (acc, food) => {
        acc.energy_kcal_per_unit += food.energy_kcal_serving;
        acc.proteins += food.proteins_serving;
        acc.saturatedFat += food.saturated_fat_serving;
        acc.unsaturatedFat += food.unsaturated_fat_serving;
        acc.carbohydrates += food.carbohydrates_serving;
        return acc;
      },
      {
        id: 0,
        foodName: "Total",
        amount: 0,
        unit: "g",
        energy_kcal_per_unit: 0,
        proteins: 0,
        saturatedFat: 0,
        unsaturatedFat: 0,
        carbohydrates: 0,
      }
    );
  };

  const handleRowClick = (index: number) => {
    setSelectedRow((prevIndex) => (prevIndex === index ? null : index));

    if(nutrilog[index]) {
      setSelectedFood(nutrilog[index]);
    } else {
      setSelectedFood(null);
    }
  };

  const handleChangeDateMinusOne = () => {
    if (selectedDate) {
      const daysDifference = dayjs().diff(selectedDate, "day");
      if (daysDifference < 7) {
        const newDate = selectedDate.subtract(1, "day");
        setSelectedDate(newDate);
      }
    }
  };

  const handleChangeDatePlusOne = () => {
    if (selectedDate) {
      const newDate = selectedDate.add(1, "day");
      setSelectedDate(newDate);
    }
  };

  return (
    <Layout>
      {apiData && (
        <Box>
          <Typography variant="h6">API-Daten:</Typography>
          {/* Hier kannst du die API-Daten anzeigen oder weiterverarbeiten */}
          {/* Zum Beispiel: */}
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </Box>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateAreas: `"Food Recepie PieChart"
        "Foodlog Foodlog Nutrition"`,
          columnGap: 5,
          rowGap: 8,
        }}
      >
        <Box sx={{ gridArea: "Food" }}>
          <Box sx={{ marginBottom: "5%" }}>
            <TextInputField
              label="Suche hier nach einem Lebensmittel..."
              value={SearchTextFood}
              setValue={setSearchTextFood}
              hasError={FoodSearchHasError}
              errorText="Du hast kein Lebensmittel eingegeben."
              width="100%"
              required={false}
            />
          </Box>
          <Box sx={{ marginBottom: "5%" }}>
            <FloatInputField
              label="Menge eintragen"
              suffix="Gramm"
              value={currentFoodAmount}
              setValue={setCurrentFoodAmount}
              hasError={foodAmountHasError}
              errorText="Die Menge kann nicht negativ oder 0 sein."
              width="100%"
              required={false}
            />
          </Box>
          <BasicButton
            label="Lebensmittel hinzufügen"
            width="100%"
            isButtonClicked={isButtonClicked}
            onButtonClick={(e) => {
              if (currentFoodAmount <= 0 || SearchTextFood === "") {
                if (currentFoodAmount <= 0) {
                  setFoodAmountHasError(true);
                } else {
                  setFoodAmountHasError(false);
                }
                if (SearchTextFood === "") {
                  setFoodSearchHasError(true);
                } else {
                  setFoodSearchHasError(true);
                }
              } else {
                handleChangeSearchFoodTextAmount();
              }
            }}
          />
        </Box>

        <Box sx={{ gridArea: "Recepie" }}>
          <Box sx={{ marginBottom: "5%" }}>
            <TextInputField
              label="Suche hier nach einem Rezept..."
              value={searchTextRecepie}
              setValue={setSearchTextRecepie}
              hasError={recepieSearchHasError}
              errorText="Du hast kein Rezept ausgewählt."
              width="100%"
              required={false}
            />
          </Box>
          <Box sx={{ marginBottom: "5%" }}>
            <FloatInputField
              label="Portionen eintragen"
              suffix="Portion(en)"
              value={currentPortionAmount}
              setValue={setCurrentPortionAmount}
              hasError={portionAmountHasError}
              errorText="Die Portionen kann nicht negativ oder 0 sein."
              width="100%"
              required={false}
            />
          </Box>
          <BasicButton
            label="Rezept hinzufügen"
            width="100%"
            isButtonClicked={isButtonClicked}
            onButtonClick={(e) => {
              if (currentPortionAmount <= 0 || searchTextRecepie === "") {
                if (currentPortionAmount <= 0) {
                  setPortionAmountHasError(true);
                } else {
                  setPortionAmountHasError(false);
                }
                if (searchTextRecepie === "") {
                  setRecepieSearchHasError(true);
                } else {
                  setRecepieSearchHasError(false);
                }
              } else {
                handleChangeSearchPortionRecepieText();
              }
            }}
          />
        </Box>

        <Box sx={{ gridArea: "PieChart", height: "100%" }}>
          <KcalFoodChart
            totalKcal={2200}
            consumedKcal={Math.round(
              getTotalNutritionalValues().energy_kcal_per_unit
            )}
          />
        </Box>

        <Box sx={{ gridArea: "Foodlog" }}>
          <Box sx={{ display: "flex", marginBottom: "2%" }}>
            <Typography>Lebenmittel & Rezepte</Typography>
            {selectedDate &&
            !dayjs(selectedDate).isSame(sevenDaysAgo, "day") ? (
              <ArrowBackIosNewIcon
                sx={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  background: theme.palette.primary.main,
                  color: "white",
                }}
                onClick={handleChangeDateMinusOne}
              />
            ) : (
              <ArrowBackIosNewIcon
                sx={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  color: "white",
                }}
              />
            )}

            <Typography>{selectedDate?.format("DD.MM.YYYY")}</Typography>
            {selectedDate && !dayjs(selectedDate).isSame(dayjs(), "day") && (
              <ArrowForwardIosIcon
                sx={{
                  background: theme.palette.primary.main,
                  color: "white",
                  marginLeft: "1%",
                }}
                onClick={handleChangeDatePlusOne}
              ></ArrowForwardIosIcon>
            )}
          </Box>
          <FoodTable nutrilogItems={nutrilog} onSelectRow={handleRowClick} />
        </Box>

        <Box sx={{ gridArea: "Nutrition" }}>
          <Box sx={{ marginBottom: "2%" }}>
            <Typography>Nährwerte</Typography>
          </Box>
          <NutritionalTable
            energy_kcal={Math.round(
              selectedFood
                ? selectedFood.energy_kcal_serving
                : getTotalNutritionalValues().energy_kcal_per_unit
            )}
            proteins={Math.round(
              selectedFood
                ? selectedFood.proteins_serving
                : getTotalNutritionalValues().proteins
            )}
            saturatedFat={Math.round(
              selectedFood
                ? selectedFood.saturated_fat_serving
                : getTotalNutritionalValues().saturatedFat
            )}
            unsaturatedFat={Math.round(
              selectedFood
                ? selectedFood.unsaturated_fat_serving
                : getTotalNutritionalValues().unsaturatedFat
            )}
            carbohydrates={Math.round(
              selectedFood
                ? selectedFood.carbohydrates_serving
                : getTotalNutritionalValues().carbohydrates
            )}
          />
        </Box>
      </Box>
    </Layout>
  );
};
