import React from "react";
import { BasicFoodField } from "../common/BasicFoodField";
import { Layout } from "../layout/Layout";
import { Box, useTheme } from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import BasicButton from "../common/BasicButton";
import NutritionalTable from "../common/NutritionalTable";
import FoodTable from "../common/FoodTable";

export const FoodLog = (testParams: any) => {
  const theme = useTheme();

  const [isButtonClicked] = React.useState(false);
  const [SearchTextFood, setSearchTextFood] = React.useState<string>("");
  const [FoodSearchHasError, setFoodSearchHasError] = React.useState(false);

  const [currentFoodAmount, setCurrentFoodAmount] = React.useState<number>(0);
  const [foodAmountHasError, setFoodAmountHasError] = React.useState(false);

  const [searchTextRecepie, setSearchTextRecepie] = React.useState<string>("");
  const [recepieSearchHasError, setRecepieSearchHasError] = React.useState(false);

  const [currentPortionAmount, setCurrentPortionAmount] = React.useState<number>(0);
  const [portionAmountHasError, setPortionAmountHasError] = React.useState(false);

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


  const handleChangeSearchFoodTextAmount = () => {
    setFoodAmountHasError(false);
    setFoodSearchHasError(false);
    console.log(
      `Suchbutton geklickt. Eingegebener Text: ${SearchTextFood}`
    );

  };

  const handleChangeSearchPortionRecepieText = () => {
    setPortionAmountHasError(false);
    setRecepieSearchHasError(false);
    console.log(
      `Suchbutton geklickt. Eingegebener Text: ${searchTextRecepie}`
    );
  };

  return (
    <Layout>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "top",
          justifyContent: "space-around"
        }}>
        <Box sx={{
          height: "9%",
          width: "30%"
        }}>
          <Box sx={{ marginRight: "5%", marginBottom: "5%" }}>
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
          <Box sx={{ marginRight: "5%", marginBottom: "5%" }}>
            <FloatInputField
              label="Menge eintragen"
              suffix="Gramm"
              value={currentFoodAmount}
              setValue={setCurrentFoodAmount}
              hasError={foodAmountHasError}
              setHasError={setFoodAmountHasError}
              errorText="Die Menge kann nicht negativ oder 0 sein."
              width="100%"
            /></Box>
          <Box sx={{ marginRight: "5%", marginBottom: "5%" }}>
            <BasicButton
              label="Lebensmittel hinzufügen"
              width="100%"
              isButtonClicked={isButtonClicked}
              onButtonClick={(e) => {
                if (currentFoodAmount <= 0 || SearchTextFood == "") {
                  if (currentFoodAmount <= 0) {
                    setFoodAmountHasError(true)
                  }
                  if (SearchTextFood == "") {
                    setFoodSearchHasError(true)
                  }
                }
                else {
                  handleChangeSearchFoodTextAmount()
                }
              }}
            />
          </Box>
        </Box>
        <Box sx={{
          height: "9%",
          width: "30%"
        }}>
          <Box sx={{ marginRight: "5%", marginBottom: "5%" }}>
            <BasicFoodField
              label="Suche hier nach einem Rezept..."
              value={searchTextRecepie}
              buttonText="Eintrag hinzufügen"
              setValue={setSearchTextRecepie}
              hasError={recepieSearchHasError}
              setHasError={setRecepieSearchHasError}
              errorText="Du hast kein Rezept ausgewählt."
              width="100%"
            /></Box>
          <Box sx={{ marginRight: "5%", marginBottom: "5%" }}>
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
          <Box sx={{ marginRight: "5%", marginBottom: "5%" }}>
            <BasicButton
              label="Rezept hinzufügen"
              width="100%"
              isButtonClicked={isButtonClicked}
              onButtonClick={(e) => {
                if (currentPortionAmount <= 0 || searchTextRecepie == "") {
                  if (currentPortionAmount <= 0) {
                    setPortionAmountHasError(true)
                  }
                  if (searchTextRecepie == "") {
                    setRecepieSearchHasError(true)
                  }
                }
                else {
                  handleChangeSearchPortionRecepieText()
                }
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          background: theme.palette.primary.light,
          flex: 1,
          display: "flex",
          alignItems: "top",
          justifyContent: "space-around"
        }}>
        <Box sx={{
          height: "9%",
          width: "30%"
        }}>
          <FoodTable
            food="Brokoli"
            value="150"
            einheit="[g]"
          />
        </Box>
        <Box sx={{
          height: "9%",
          width: "30%"
        }}>
          <NutritionalTable
            energy_kcal={Math.round(
              recipe.energy_kcal / recipe.portions
            )}
            proteins={Math.round(recipe.proteins / recipe.portions)}
            saturatedFat={Math.round(
              recipe.saturatedFat / recipe.portions
            )}
            unsaturatedFat={Math.round(
              recipe.unsaturatedFat / recipe.portions
            )}
            carbohydrates={Math.round(
              recipe.carbohydrates / recipe.portions
            )}
          />
        </Box>
      </Box>
    </Layout >
  );
};
