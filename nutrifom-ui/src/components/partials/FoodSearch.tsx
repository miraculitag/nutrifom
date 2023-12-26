import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  useTheme,
} from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";
import { addProductToNutrilog, searchOFF } from "../../api";
import dayjs from "dayjs";
import useAuthHeader from "react-auth-kit/dist/hooks/useAuthHeader";
import { FoodEntry } from "../../types";


export default function FoodSearch() {
  const theme = useTheme();
  const auth = useAuthHeader();
  const [isButtonClicked] = React.useState(false);
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [FoodSearchHasError, setFoodSearchHasError] = React.useState(false);
  const [currentFoodAmount, setCurrentFoodAmount] = React.useState<number>(0);
  const [foodAmountHasError, setFoodAmountHasError] = React.useState(false);
  const [apiData, setApiData] = React.useState<any[]>([]);
  const [searchTextFood, setSearchTextFood] = React.useState("");
  
  const [selectedFood, setSelectedFood] = React.useState<FoodEntry>();


  const handleChangeSearchFoodTextAmount = () => {
    setFoodAmountHasError(false);
    setFoodSearchHasError(false);

    const dateString: string = currentDate;
    const productItem = {
      code: "123456",
      productName: selectedFood?.productName || "",
      product_quantity: currentFoodAmount,
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

    //updateUserAttribute({ kcalGoal: 2500 });
  };

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTextFood(event.target.value);
    setSelectedFood(undefined);

    if (searchTextFood !== "") {
      searchOFF(searchTextFood, auth())
        .then((response) => {
          setApiData(response.data);
        })
        .catch((error) => {
          console.log("Fehler beim Abrufen der offSearch:", error);
        });
    }
  };


  const handleFoodSelection = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setSelectedFood(value);
  };

  return (
    <>
      <Box sx={{ marginBottom: "5%" }}>
        <Autocomplete
          id="free-solo-2-demo"
          disableClearable
          options={apiData}
          getOptionLabel={(apiData) => apiData.productName}
          isOptionEqualToValue={(option, value) => option.productName === value.productName}
          onChange={handleFoodSelection}
          renderInput={(params) => (
            <TextField
              label="Suche hier nach einem Lebensmittel..."
              variant="standard"
              onChange={handleSearchTextChange}
              value={searchTextFood}
              required={false}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={FoodSearchHasError}
              helperText={
                FoodSearchHasError
                  ? "Du hast kein Lebensmittel eingegeben."
                  : ""
              }
            />
          )}
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
          if (currentFoodAmount <= 0 || isNaN(currentFoodAmount) || !selectedFood) {
            if (currentFoodAmount <= 0 || isNaN(currentFoodAmount)) {
              setFoodAmountHasError(true);
            } else {
              setFoodAmountHasError(false);
            }
            if (!selectedFood) {
              setFoodSearchHasError(true);
            } else {
              setFoodSearchHasError(true);
            }
          } else {
            handleChangeSearchFoodTextAmount();
          }
        }}
      />
    </>
  );
}
