import React from "react";
import { Layout } from "../layout/Layout";
import { Box, Typography, useTheme } from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import BasicButton from "../common/BasicButton";
import NutritionalTable from "../common/NutritionalTable";
import FoodTable, { FoodItem } from "../common/FoodTable";
import BasicPie from "../common/BasicPieChart";
import { TextInputField } from "../common/TextInputField";

export const FoodLog = (testParams: any) => {
  const theme = useTheme();

  const [isButtonClicked] = React.useState(false);
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

  const [kcal, setkcal] = React.useState<number>(2200);

  const [selectedFood, setSelectedFood] = React.useState<FoodItem | null>(null);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

  const foodData = [
    {
      id: 1,
      foodName: "Chicken Breast",
      amount: 150,
      unit: "g",
      energy_kcal_per_unit: 165,
      proteins: 31,
      saturatedFat: 1.6,
      unsaturatedFat: 1.2,
      carbohydrates: 0,
    },
    {
      id: 2,
      foodName: "Brown Rice",
      amount: 100,
      unit: "g",
      energy_kcal_per_unit: 111,
      proteins: 2.6,
      saturatedFat: 0.3,
      unsaturatedFat: 0.9,
      carbohydrates: 23.5,
    },
    {
      id: 3,
      foodName: "Broccoli",
      amount: 200,
      unit: "g",
      energy_kcal_per_unit: 62,
      proteins: 4,
      saturatedFat: 0.1,
      unsaturatedFat: 0.6,
      carbohydrates: 12,
    },
    {
      id: 4,
      foodName: "Water",
      amount: 250,
      unit: "ml",
      energy_kcal_per_unit: 0,
      proteins: 0,
      saturatedFat: 0,
      unsaturatedFat: 0,
      carbohydrates: 0,
    },
    {
      id: 5,
      foodName: "Orange Juice",
      amount: 200,
      unit: "ml",
      energy_kcal_per_unit: 88,
      proteins: 1,
      saturatedFat: 0,
      unsaturatedFat: 0,
      carbohydrates: 21,
    },
  ];

  const handleChangeSearchFoodTextAmount = () => {
    setFoodAmountHasError(false);
    setFoodSearchHasError(false);
    console.log(`Suchbutton geklickt. Eingegebener Text: ${SearchTextFood}`);
  };

  const handleChangeSearchPortionRecepieText = () => {
    setPortionAmountHasError(false);
    setRecepieSearchHasError(false);
    console.log(`Suchbutton geklickt. Eingegebener Text: ${searchTextRecepie}`);
  };

  const getTotalNutritionalValues = () => {
    return foodData.reduce(
      (acc, food) => {
        acc.energy_kcal_per_unit +=
          food.energy_kcal_per_unit * (food.amount / 100);
        acc.proteins += food.proteins * (food.amount / 100);
        acc.saturatedFat += food.saturatedFat * (food.amount / 100);
        acc.unsaturatedFat += food.unsaturatedFat * (food.amount / 100);
        acc.carbohydrates += food.carbohydrates * (food.amount / 100);
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
    setSelectedFood((prevFood) => {
      if (prevFood && prevFood.id === foodData[index].id) {
        return null;
      } else {
        return foodData[index];
      }
    });
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ marginRight: "5%", width: "70%" }}>
          <Box
            sx={{
              alignItems: "top",
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
            }}
          >
            <Box
              sx={{
                marginRight: "10%",
                width: "50%",
              }}
            >
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
                    }
                    if (SearchTextFood === "") {
                      setFoodSearchHasError(true);
                    }
                  } else {
                    handleChangeSearchFoodTextAmount();
                  }
                }}
              />
            </Box>
            <Box
              sx={{
                width: "50%",
              }}
            >
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
                    }
                    if (searchTextRecepie === "") {
                      setRecepieSearchHasError(true);
                    }
                  } else {
                    handleChangeSearchPortionRecepieText();
                  }
                }}
              />
            </Box>
          </Box>
          <Box>
            <Typography>Lebenmittel & Rezepte</Typography>
            <FoodTable foods={foodData} onSelectRow={handleRowClick} />
          </Box>
        </Box>

        <Box>
          <BasicPie
            totalKcal={2200}
            consumedKcal={Math.round(
              getTotalNutritionalValues().energy_kcal_per_unit
            )}
          />
          <Typography>Nährwerte</Typography>
          {selectedFood ? (
            <NutritionalTable
              energy_kcal={Math.round(selectedFood.energy_kcal_per_unit)}
              proteins={Math.round(selectedFood.proteins)}
              saturatedFat={Math.round(selectedFood.saturatedFat)}
              unsaturatedFat={Math.round(selectedFood.unsaturatedFat)}
              carbohydrates={Math.round(selectedFood.carbohydrates)}
            />
          ) : (
            <NutritionalTable
              energy_kcal={Math.round(
                getTotalNutritionalValues().energy_kcal_per_unit
              )}
              proteins={Math.round(getTotalNutritionalValues().proteins)}
              saturatedFat={Math.round(
                getTotalNutritionalValues().saturatedFat
              )}
              unsaturatedFat={Math.round(
                getTotalNutritionalValues().unsaturatedFat
              )}
              carbohydrates={Math.round(
                getTotalNutritionalValues().carbohydrates
              )}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};
