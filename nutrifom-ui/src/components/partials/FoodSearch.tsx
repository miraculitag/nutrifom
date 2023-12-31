import React from "react";
import { Box, Autocomplete, TextField, CircularProgress } from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";
import { addProductToNutrilog, searchOFF } from "../../api";
import dayjs, { Dayjs } from "dayjs";
import useAuthHeader from "react-auth-kit/dist/hooks/useAuthHeader";
import { FoodEntry } from "../../types";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

interface FoodSearchProps {
  onNutrilogUpdate: () => void;
  selectedDate: Dayjs | null;
}

export default function FoodSearch(props: FoodSearchProps) {
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const currentDate = dayjs().format("YYYY-MM-DD");
  const [isButtonClicked] = React.useState(false);
  const [FoodSearchHasError, setFoodSearchHasError] = React.useState(false);
  const [currentFoodAmount, setCurrentFoodAmount] = React.useState<number>(0);
  const [foodAmountHasError, setFoodAmountHasError] = React.useState(false);
  const [apiData, setApiData] = React.useState<FoodEntry[]>([]);
  const [searchTextFood, setSearchTextFood] = React.useState("");
  const [selectedFood, setSelectedFood] = React.useState<
    FoodEntry | undefined
  >();

  React.useEffect(() => {
    if (searchTextFood) {
      if (!selectedFood) {
        try {
          searchOFF(searchTextFood, auth(), signOut, navigate).then(
            (response) => {
              setApiData(response.data);
            }
          );
        } catch (error) {
          console.log("Fehler beim Abrufen der offSearch:", error);
        }
      }
    }
  }, [searchTextFood]);

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
    ).catch((error) => {
      if (error.response.status === 403) {
        console.log("Error 403 while putting weight:", auth());
      }
    });
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
              label="Suche hier nach einem Lebensmittel..."
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
}
