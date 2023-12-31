import { Autocomplete, Box, TextField } from "@mui/material";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";
import { addRecipeToNutrilog, getRecipes } from "../../api";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Recipe } from "../../types";
import { useNavigate } from "react-router-dom";

interface RecipeSearchProps {
  onNutrilogUpdate: () => void;
  selectedDate: Dayjs | null;
}

export default function RecepieSearch(props: RecipeSearchProps) {
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
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
    getRecipes(auth(), signOut, navigate).then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleChangeSearchPortionRecepieText = () => {
    setPortionAmountHasError(false);
    setRecepieSearchHasError(false);

    const dateString: string =
      props.selectedDate?.format("YYYY-MM-DD") || currentDate;

    addRecipeToNutrilog(
      {
        recipeId: selectedRecepie?.id || 0,
        entryDate: dateString,
        recipePortions: currentPortionAmount,
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
          onChange={(event: any, newValue: Recipe | null) => {
            setSelectedRecepie(newValue || undefined);
          }}
          id="controllable-states-demo"
          options={recipes}
          getOptionLabel={(recipes) => recipes?.title || ""}
          isOptionEqualToValue={(option, value) =>
            option?.title === value?.title
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Suche hier nach einem Rezept..."
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              error={recepieSearchHasError}
              required={true}
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
