import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { Box, Autocomplete, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { addProductToNutrilog, searchOFF } from "../../api";
import { FoodEntry } from "../../types";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";

interface FoodSearchProps {
  onNutrilogUpdate: () => void;
  selectedDate: Dayjs | null;
}

export const FoodSearch = (props: FoodSearchProps) => {
  const [searchTextFood, setSearchTextFood] = React.useState<string>("");
  const [currentFoodAmount, setCurrentFoodAmount] = React.useState<number>(0);
  const [foodAmountHasError, setFoodAmountHasError] =
    React.useState<boolean>(false);
  const [FoodSearchHasError, setFoodSearchHasError] =
    React.useState<boolean>(false);
  const [isButtonClicked] = React.useState(false);
  const [selectedFood, setSelectedFood] = React.useState<
    FoodEntry | undefined
  >();
  const [apiData, setApiData] = React.useState<FoodEntry[]>([]);

  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (searchTextFood && !selectedFood) {
      const timeoutId = setTimeout(async () => {
        const response = await searchOFF(
          searchTextFood,
          auth(),
          signOut,
          navigate
        );
        setApiData(response.data);
      }, 400);
      return () => clearTimeout(timeoutId);
    }
  }, [searchTextFood]);

  const currentDate = dayjs().format("YYYY-MM-DD");

  const handleChangeSearchFoodTextAmount = async () => {
    setFoodAmountHasError(false);
    setFoodSearchHasError(false);

    const dateString: string =
      props.selectedDate?.format("YYYY-MM-DD") || currentDate;

    await addProductToNutrilog(
      {
        productCode: selectedFood?.productCode || "",
        entryDate: dateString,
        productQuantity: currentFoodAmount,
      },
      auth(),
      signOut,
      navigate
    );
    props.onNutrilogUpdate();
  };

  return (
    <>
      <Box sx={{ marginBottom: "5%" }}>
        <Autocomplete
          onChange={(event: any, newValue: FoodEntry | null) => {
            setSelectedFood(newValue || undefined);
          }}
          inputValue={searchTextFood}
          onInputChange={(event, newInputValue) => {
            setSearchTextFood(newInputValue);
          }}
          id="controllable-states-demo"
          options={apiData}
          getOptionLabel={(apiData) => apiData?.productName || ""}
          isOptionEqualToValue={(option, value) =>
            option?.productCode === value?.productCode
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Lebensmittel suchen"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              error={FoodSearchHasError}
              required={true}
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
          required={true}
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
};
