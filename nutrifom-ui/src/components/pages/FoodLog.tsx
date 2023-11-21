import React from "react";
import { BasicFoodField } from "../common/BasicFoodField";
import { Layout } from "../layout/Layout";
import { Box, Typography, useTheme } from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import BasicButton from "../common/BasicButton";
import NutritionalTable from "../common/NutritionalTable";
import FoodTable from "../common/FoodTable";
import BasicPie from "../common/BasicPieChart";

export const FoodLog = (testParams: any) => {
  //const theme = useTheme();

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

  const recipe = {
    id: 1,
    title: "Rezept Name1",
    ingredients: "200g Apfel, 100g Banane, 2TL Honig",
    rating: 3,
    uses: 23,
    tag: "Aufbauen",
    description:
      "Testbeschreibung des ersten Rezeptes. Zweiter Satz um Beschreibung zu verlängern. Dritter Satz um Beschreibung zu verlängern. Vierter Satz um Beschreibung zu verlängern.",
    portions: 2,
    energy_kcal: 2300,
    proteins: 150,
    saturatedFat: 25,
    unsaturatedFat: 75,
    carbohydrates: 200,
    image: "./assets/img/recipeTest.jpg",
  };

  const Foods = [
    { name: "Apple", amount: 1, unit: "g" },
    { name: "Banana", amount: 2, unit: "kg" },
    { name: "Carrot", amount: 150, unit: "ml" },
    // Add more test data as needed
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

  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
    console.log(`Rezept: ${index}`);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          marginTop: "5%",
        }}
      >
        <Box sx={{ width: "70%", marginRight: "5%" }}>
          <Box
            sx={{
              alignItems: "top",
              justifyContent: "space-between",
              display: "flex",
              flex: 1,
              height: "45%",
            }}
          >
            <Box
              sx={{
                width: "50%",
                marginRight: "10%",
              }}
            >
              <Box sx={{ marginBottom: "5%" }}>
                <BasicFoodField
                  label="Suche hier nach einem Lebensmittel..."
                  value={SearchTextFood}
                  buttonText="Eintrag hinzufügen"
                  setValue={setSearchTextFood}
                  hasError={FoodSearchHasError}
                  setHasError={setFoodSearchHasError}
                  errorText="Du hast kein Lebensmittel eingegeben."
                  width="100%"
                />
              </Box>
              <Box sx={{ marginBottom: "5%" }}>
                <FloatInputField
                  label="Menge eintragen"
                  suffix="Gramm"
                  value={currentFoodAmount}
                  setValue={setCurrentFoodAmount}
                  hasError={foodAmountHasError}
                  setHasError={setFoodAmountHasError}
                  errorText="Die Menge kann nicht negativ oder 0 sein."
                  width="100%"
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
                <BasicFoodField
                  label="Suche hier nach einem Rezept..."
                  value={searchTextRecepie}
                  buttonText="Eintrag hinzufügen"
                  setValue={setSearchTextRecepie}
                  hasError={recepieSearchHasError}
                  setHasError={setRecepieSearchHasError}
                  errorText="Du hast kein Rezept ausgewählt."
                  width="100%"
                />
              </Box>
              <Box sx={{ marginBottom: "5%" }}>
                <FloatInputField
                  label="Portionen eintragen"
                  suffix="Portion(en)"
                  value={currentPortionAmount}
                  setValue={setCurrentPortionAmount}
                  hasError={portionAmountHasError}
                  setHasError={setPortionAmountHasError}
                  errorText="Die Portionen kann nicht negativ oder 0 sein."
                  width="100%"
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

          <Box
            sx={{
              width: "100%",
              marginRight: "5%",
              height: "70%",
            }}
          >
            <Typography>Lebenmittel & Rezepte</Typography>
            <FoodTable foods={Foods} onSelectRow={handleRowClick} />
          </Box>
        </Box>

        <Box
          sx={{
            width: "30%",
          }}
        >
          <Box
            sx={{
              height: "45%",
            }}
          >
            <BasicPie kcal={kcal}></BasicPie>
          </Box>

          <Box
            sx={{
              height: "70%",
              marginRight: "5%",
            }}
          >
            <Typography>Nährwerte</Typography>
            <NutritionalTable
              energy_kcal={Math.round(recipe.energy_kcal / recipe.portions)}
              proteins={Math.round(recipe.proteins / recipe.portions)}
              saturatedFat={Math.round(recipe.saturatedFat / recipe.portions)}
              unsaturatedFat={Math.round(
                recipe.unsaturatedFat / recipe.portions
              )}
              carbohydrates={Math.round(recipe.carbohydrates / recipe.portions)}
            />
          </Box>
        </Box>

      </Box>
    </Layout>
  );
};
