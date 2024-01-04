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

export const RecipeSearch = (props: RecipeSearchProps) => {
  const [isButtonClicked] = React.useState(false);
  const [recipes, setRecipes] = React.useState<any[]>([]);
  const [selectedRecepie, setSelectedRecepie] = React.useState<Recipe>();
  const [recepieSearchHasError, setRecepieSearchHasError] = React.useState(false);
  const [portionAmountHasError, setPortionAmountHasError] = React.useState(false);
  const [currentPortionAmount, setCurrentPortionAmount] = React.useState(0);
 
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    getRecipes(auth(), signOut, navigate).then((response) => {
      setRecipes(response.data);
    });
  }, []);

  const handleChangeSearchPortionRecepieText = async () => {
    setPortionAmountHasError(false);
    setRecepieSearchHasError(false);

    const dateString: string =
      props.selectedDate?.format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD");

    await addRecipeToNutrilog(
      {
        recipeId: selectedRecepie?.id || 0,
        entryDate: dateString,
        recipePortions: currentPortionAmount,
      },
      auth(),
      signOut,
      navigate
    )
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
              label="Rezept suchen"
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
