import { Autocomplete, Box, TextField } from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";
import { addProductToNutrilog, getRecipes } from "../../api";
import { useAuthHeader } from "react-auth-kit";
import dayjs from "dayjs";
import React, { ChangeEvent } from "react";
import { Recipe } from "../../types";

export default function RecepieSearch() {
  const auth = useAuthHeader();
  const [isButtonClicked] = React.useState(false);
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [recepieSearchHasError, setRecepieSearchHasError] =
    React.useState(false);
  const [currentPortionAmount, setCurrentPortionAmount] =
    React.useState<number>(0);
  const [portionAmountHasError, setPortionAmountHasError] =
    React.useState(false);
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [selectedRecepie, setSelectedRecepie] = React.useState<Recipe>();

  React.useEffect(() => {
    getRecipes(auth()).then((response) => {
      setRecipes(response.data);
    });
  }, []);


  const handleChangeSearchPortionRecepieText = () => {
    setPortionAmountHasError(false);
    setRecepieSearchHasError(false);

    const dateString: string = currentDate;
    const productItem = {
      code: "123456",
      productName: selectedRecepie?.title || "",
      product_quantity: currentPortionAmount,
      proteins: 200,
      carbohydrates: 3,
      energy_kcal_serving: 150,
      saturated_fat: 30,
      unsaturated_fat: 40,
    };

    addProductToNutrilog(
      { product: productItem, entryDate: dateString },
      auth()
    ).catch((error) => {
      if (error.response.status === 403) {
        console.log("Error 403 while putting weight:", auth());
      }
    });
  };

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedRecepie(undefined);
  };


  const handleRecepieSelection = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setSelectedRecepie(value);
  };


  return (
    <>
      <Box sx={{ marginBottom: "5%" }}>
        <Autocomplete
          id="free-solo-2-demo"
          disableClearable
          options={recipes}
          getOptionLabel={(recipe) => recipe.title}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          onChange={handleRecepieSelection}
          renderInput={(params) => (
            <TextField
              label="Suche hier nach einem Rezept..."
              variant="standard"
              onChange={handleSearchTextChange}
              required={false}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={recepieSearchHasError}
              helperText={
                recepieSearchHasError ? "Du hast kein Rezept ausgewählt." : ""
              }
            />
          )}
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
          required={true}
        />
      </Box>
      <BasicButton
        label="Rezept hinzufügen"
        width="100%"
        isButtonClicked={isButtonClicked}
        onButtonClick={(e) => {
          if (
            currentPortionAmount <= 0 ||
            isNaN(currentPortionAmount) ||
            !selectedRecepie
          ) {
            if (currentPortionAmount <= 0 || isNaN(currentPortionAmount)) {
              setPortionAmountHasError(true);
            } else {
              setPortionAmountHasError(false);
            }
            if (!selectedRecepie) {
              setRecepieSearchHasError(true);
            } else {
              setRecepieSearchHasError(false);
            }
          } else {
            handleChangeSearchPortionRecepieText();
          }
        }}
      />
    </>
  );
}
