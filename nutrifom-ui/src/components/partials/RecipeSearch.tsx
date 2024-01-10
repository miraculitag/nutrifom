import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { Autocomplete, Box, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { addRecipeToNutrilog, getRecipes } from "../../api";
import { Recipe } from "../../types";
import { FloatInputField } from "../common/FloatInputField";
import { BasicButton } from "../common/BasicButton";


interface RecipeSearchProps {
  nutrilogUpdate: () => void;
  selectedDate: Dayjs | null;
}

export const RecipeSearch = (props: RecipeSearchProps) => {
  const [isButtonClicked] = React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe>();
  const [recipeSearchHasError, setRecipeSearchHasError] = React.useState<boolean>(false);
  const [portionAmountHasError, setPortionAmountHasError] = React.useState<boolean>(false);
  const [currentPortionAmount, setCurrentPortionAmount] = React.useState<number>(0);
 
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    getRecipes(auth(), signOut, navigate).then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleAddButtonClick = async () => {
    setPortionAmountHasError(false);
    setRecipeSearchHasError(false);

    const dateString: string =
      props.selectedDate?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");

    await addRecipeToNutrilog(
      {
        recipeId: selectedRecipe?.id || 0,
        entryDate: dateString,
        recipePortions: currentPortionAmount,
      },
      auth(),
      signOut,
      navigate
    )
    props.nutrilogUpdate();
  };

  return (
    <>
      <Box sx={{ marginBottom: "5%" }}>
        <Autocomplete
          onChange={(event: any, newValue: Recipe | null) => {
            setSelectedRecipe(newValue || undefined);
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
              label="Rezept suchen"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              error={recipeSearchHasError}
              required={true}
              helperText={
                recipeSearchHasError ? "Du hast kein Rezept ausgewählt." : ""
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
            !selectedRecipe
          ) {
            if (currentPortionAmount <= 0 || isNaN(currentPortionAmount)) {
              setPortionAmountHasError(true);
            } else {
              setPortionAmountHasError(false);
            }
            if (!selectedRecipe) {
              setRecipeSearchHasError(true);
            } else {
              setRecipeSearchHasError(false);
            }
          } else {
            handleAddButtonClick();
          }
        }}
      />
    </>
  );
}
