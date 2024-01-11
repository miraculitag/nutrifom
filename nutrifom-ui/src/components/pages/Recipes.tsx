import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  IconButton,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { ExpandMore, FilterAlt } from "@mui/icons-material";
import {
  getRecipeById,
  getRecipes,
  handleTokenExpiration,
  isTokenExpired,
  rateRecipe,
} from "../../api";
import { Recipe } from "../../types";
import { FilterDialog } from "../dialogs/FilterDialog";
import { NutritionalTable } from "../common/NutritionalTable";
import { Layout } from "../layout/Layout";

export const Recipes = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [filterValue, setFilterValue] = React.useState<string>("Alle");
  const [isFilterDialogOpen, setIsFilterDialogOpen] =
    React.useState<boolean>(false);
  const [recipes, setRecipes] = React.useState<Recipe[]>();
  const [shownRecipes, setShownRecipes] = React.useState(recipes);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setIsLoading(true);
    if (isTokenExpired(auth())) {
      handleTokenExpiration(signOut, navigate);
    } else {
      getRecipes(auth())
        .then((response) => {
          setRecipes(response.data);
          setShownRecipes(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const filterHeading = "Rezeptkategorien";
  const filterOptions = ["Alle", "Aufbauen", "Definieren"];

  const handleRecipeExpansion =
    (recipeId: string) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? recipeId : false);
    };

  const refreshRecipe = (recipeId: number) => {
    //Structure from ChatGPT 3.5
    getRecipeById(recipeId, auth()).then((response) => {
      const updatedRecipe = response.data;
      setRecipes((prevRecipes) => {
        const updatedRecipes = prevRecipes?.map((recipe) =>
          recipe.id === recipeId ? updatedRecipe : recipe
        );
        return updatedRecipes;
      });
      setShownRecipes((prevShownRecipes) => {
        const updatedShownRecipes = prevShownRecipes?.map((recipe) =>
          recipe.id === recipeId ? updatedRecipe : recipe
        );
        return updatedShownRecipes;
      });
    });
  };

  const handleRatingChange = //Structure from ChatGPT 3.5

      (recipeId: number) =>
      (event: React.ChangeEvent<{}>, newRatingValue: number | null) => {
        if (newRatingValue !== null) {
          if (isTokenExpired(auth())) {
            handleTokenExpiration(signOut, navigate);
          } else {
            rateRecipe(
              { recipeId: recipeId, score: newRatingValue },
              auth()
            ).then(() => {
              refreshRecipe(recipeId);
            });
          }
        }
      };

  const filterRecipes = (filter: string) => {
    if (filter === "Aufbauen") {
      setShownRecipes(recipes?.filter((recipe) => recipe.tag === "Aufbauen"));
    } else if (filter === "Definieren") {
      setShownRecipes(recipes?.filter((recipe) => recipe.tag === "Definieren"));
    } else {
      setShownRecipes(recipes);
    }
  };

  const handleFilterDialogClose = (newFilterValue?: string) => {
    setIsFilterDialogOpen(false);

    if (newFilterValue) {
      setFilterValue(newFilterValue);
      filterRecipes(newFilterValue);
    }
  };

  const formatImage = (image: string) => {
    //Structure from ChatGPT 3.5
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
        <IconButton onClick={() => setIsFilterDialogOpen(true)}>
          <FilterAlt
            sx={{ fontSize: "150%", color: theme.palette.primary.main }}
          />
        </IconButton>
        <FilterDialog
          keepMounted
          heading={filterHeading}
          options={filterOptions}
          open={isFilterDialogOpen}
          onClose={handleFilterDialogClose}
          valueFilter={filterValue}
        />
        {isLoading && (
          <CircularProgress
            sx={{
              display: "flex",
              margin: "auto",
              height: 5,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          />
        )}
        {shownRecipes?.map((recipe) => (
          <Accordion
            key={recipe.id}
            expanded={expanded === recipe.id.toString()}
            onChange={handleRecipeExpansion(recipe.id.toString())}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMore sx={{ color: theme.palette.primary.main }} />
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {recipe.image && (
                  <img
                    src={formatImage(recipe.image)}
                    alt={recipe.title}
                    width="10%"
                  />
                )}
                <Box sx={{ flex: 1, paddingLeft: "2%" }}>
                  <Typography
                    sx={{
                      fontSize: "150%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {recipe.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      size="medium"
                      precision={0.5}
                      value={recipe.averageRating}
                      onChange={handleRatingChange(recipe.id)}
                    />
                    <Typography
                      sx={{
                        color: "text.secondary",
                        marginLeft: "1%",
                        fontSize: "75%",
                        fontWeight: "bold",
                      }}
                    >
                      {recipe.averageRating === 0
                        ? recipe.averageRating
                        : recipe.averageRating.toFixed(1)}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        marginLeft: "1%",
                        fontSize: "75%",
                      }}
                    >
                      {recipe.ratingCount === 1
                        ? "(" + recipe.ratingCount + " Bewertung)"
                        : "(" + recipe.ratingCount + " Bewertungen)"}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: "100%" }}
                  >
                    {recipe.tag}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    flexShrink: 0,
                    paddingRight: "2%",
                    fontSize: "100%",
                  }}
                >
                  {recipe.uses} mal nachgekocht
                </Typography>
              </Box>
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
                      energyKcal={Math.round(
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
