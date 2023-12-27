import React from "react";
import { ExpandMore, FilterAlt } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { useAuthHeader } from "react-auth-kit";
import { FilterDialog } from "../common/FilterDialog";
import { NutritionalTable } from "../common/NutritionalTable";
import { Layout } from "../layout/Layout";
import { getRecipes, rateRecipe } from "../../api";
import { Recipe } from "../../types";

export const Recipes = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [ratingValues, setRatingValues] = React.useState<{
    [key: number]: number;
  }>({});
  const [filterValue, setFilterValue] = React.useState("Alle");
  const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
  const [recipes, setRecipes] = React.useState<Recipe[]>();
  const [shownRecipes, setShownRecipes] = React.useState(recipes);

  React.useEffect(() => {
    getRecipes(auth()).then((response) => {
      setRecipes(response.data);
      setShownRecipes(response.data);
    });
  }, []);

  const theme = useTheme();
  const auth = useAuthHeader();
  const filterHeading = "Rezeptkategorien";
  const filterOptions = ["Alle", "Aufbauen", "Definieren"];

  const handleChange =
    (recipeId: string) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? recipeId : false);
    };

  const handleRatingChange =
    (recipeId: number) =>
    (event: React.ChangeEvent<{}>, newRatingValue: number | null) => {
      setRatingValues((prevRatingValues) => ({
        ...prevRatingValues,
        [recipeId]: newRatingValue || 0,
      }));

      if (newRatingValue !== null) {
        rateRecipe({ recipeId: recipeId, score: newRatingValue }, auth());
      }
    };

  const filterRecipes = (filter: String) => {
    if (filter === "Aufbauen") {
      setShownRecipes(recipes?.filter((recipe) => recipe.tag === "Aufbauen"));
    } else if (filter === "Definieren") {
      setShownRecipes(recipes?.filter((recipe) => recipe.tag === "Definieren"));
    } else {
      setShownRecipes(recipes);
    }
  };

  const handleClose = (newFilterValue?: string) => {
    setOpenFilterDialog(false);

    if (newFilterValue) {
      setFilterValue(newFilterValue);
      filterRecipes(newFilterValue);
    }
  };

  const formatImage = (image: string) => {
    const byteCharacters = atob(image);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    return URL.createObjectURL(blob);
  };

  return (
    <Layout>
      <Box>
        <IconButton onClick={() => setOpenFilterDialog(true)}>
          <FilterAlt
            sx={{ fontSize: "150%", color: theme.palette.primary.main }}
          />
        </IconButton>
        <FilterDialog
          id="filterRecipes"
          keepMounted
          heading={filterHeading}
          options={filterOptions}
          open={openFilterDialog}
          onClose={handleClose}
          valueFilter={filterValue}
        />
        {shownRecipes?.map((recipe) => (
          <Accordion
            key={recipe.id}
            expanded={expanded === recipe.id.toString()}
            onChange={handleChange(recipe.id.toString())}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMore sx={{ color: theme.palette.primary.main }} />
              }
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {recipe.image && (
                  <img
                    src={formatImage(recipe.image)}
                    alt={recipe.title}
                    width="10%"
                  />
                )}
                <Box sx={{ paddingLeft: "5%" }}>
                  <Typography
                    sx={{ fontSize: "150%", width: "100%", flexShrink: 0 }}
                  >
                    {recipe.title}
                  </Typography>
                  <Rating
                    size="medium"
                    precision={0.1}
                    value={ratingValues[recipe.id] || recipe.averageRating}
                    onChange={handleRatingChange(recipe.id)}
                  />
                  <Typography sx={{ color: "text.secondary" }}>
                    {recipe.tag}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  color: "text.secondary",
                  marginLeft: "auto",
                  paddingRight: "5%",
                }}
              >
                {recipe.uses} mal nachgekocht
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "25%" }}>
                  <Typography>Zutaten:</Typography>
                  {recipe.ingredients.split(",").map((ingredient, index) => (
                    <Box key={index} sx={{ marginLeft: "20px" }}>
                      <Typography>{ingredient}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ minWidth: "25%", maxWidth: "40%" }}>
                  <Typography>Beschreibung:</Typography>
                  <Box
                    sx={{
                      marginLeft: "20px",
                    }}
                  >
                    <Typography>{recipe.description}</Typography>
                  </Box>
                </Box>
                <Box sx={{ minWidth: "25%" }}>
                  <Typography>Nährwerte pro Portion:</Typography>
                  <Box sx={{ paddingTop: "5%", paddingBottom: "5%" }}>
                    <NutritionalTable
                      energy_kcal={Math.round(
                        recipe.energyKcal / recipe.portions
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
                  <Typography>
                    Das Rezept ergibt {recipe.portions} Portionen.
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Layout>
  );
};
