import React, { ChangeEvent, useState } from "react";
import { Box, Autocomplete, TextField, CircularProgress } from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";
import { addProductToNutrilog, searchOFF } from "../../api";
import dayjs from "dayjs";
import useAuthHeader from "react-auth-kit/dist/hooks/useAuthHeader";
import { FoodEntry } from "../../types";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function FoodSearch() {
  const auth = useAuthHeader();
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [isButtonClicked] = React.useState(false);
  const [FoodSearchHasError, setFoodSearchHasError] = React.useState(false);
  const [currentFoodAmount, setCurrentFoodAmount] = React.useState<number>(0);
  const [foodAmountHasError, setFoodAmountHasError] = React.useState(false);
  const [apiData, setApiData] = React.useState<FoodEntry[]>([]);
  const [searchTextFood, setSearchTextFood] = React.useState("");
  const [selectedFood, setSelectedFood] = React.useState<FoodEntry | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);

  const handleChangeSearchFoodTextAmount = () => {
    setFoodAmountHasError(false);
    setFoodSearchHasError(false);

    const dateString: string = currentDate;
    console.log(
      "Sende Daten ans Backend",
      selectedFood?.productCode || "123",
      dateString,
      currentFoodAmount
    );

    addProductToNutrilog(
      {
        productCode: selectedFood?.productCode || "123",
        entryDate: dateString,
        productQuantity: currentFoodAmount,
      },
      auth()
    ).catch((error) => {
      if (error.response.status === 403) {
        console.log("Error 403 while putting weight:", auth());
      }
    });
    console.log("Daten versendet");
  };

  const handleSearchTextChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTextFood(event.target.value);

    if (searchTextFood !== "") {
      try {
        setLoading(true);
        await sleep(1000); // Simulate asynchronous behavior

        const response = await searchOFF(searchTextFood, auth());
        setApiData(response.data);
      } catch (error) {
        console.log("Fehler beim Abrufen der offSearch:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: "5%" }}>
        <Autocomplete
          id="free-solo-2-demo"
          disableClearable
          options={apiData}
          getOptionLabel={(apiData) => apiData.productName}
          isOptionEqualToValue={(option, value) =>
            option.productName === value.productName
          }
          onChange={(event, value) => setSelectedFood(value)}
          loading={loading}
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
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
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
        onButtonClick={() => {
          if (
            currentFoodAmount <= 0 ||
            isNaN(currentFoodAmount) ||
            !selectedFood
          ) {
            if (currentFoodAmount <= 0 || isNaN(currentFoodAmount)) {
              setFoodAmountHasError(true);
            } else {
              setFoodAmountHasError(false);
            }
            if (!selectedFood) {
              setFoodSearchHasError(true);
            } else {
              setFoodSearchHasError(false);
            }
          } else {
            handleChangeSearchFoodTextAmount();
          }
        }}
      />
    </>
  );
}
