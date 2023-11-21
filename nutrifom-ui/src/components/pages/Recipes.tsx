import * as React from "react";
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
import { ExpandMore, FilterAlt } from "@mui/icons-material";
import FilterDialog from "../common/FilterDialog";
import NutritionalTable from "../common/NutritionalTable";
import { Layout } from "../layout/Layout";

export const Recipes = (testParams: any) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [ratingValues, setRatingValues] = React.useState<{
    [key: number]: number;
  }>({});
  const [filterValue, setFilterValue] = React.useState("Alle");
  const [openFilterDialog, setOpenFilterDialog] = React.useState(false);

  const filterHeading = "Rezeptkategorien";
  const filterOptions = ["Alle", "Aufbauen", "Definieren"];

  //testdata
  const recipes = [
    {
      id: 1,
      title: "Rezept Name1",
      ingredients: "200g Apfel, 100g Banane, 2TL Honig",
      rating: 3,
      uses: 23,
      tag: "Aufbauen",
      description:
        "Testbeschreibung des ersten Rezeptes. Zweiter Satz um Beschreibung zu verlängern. Dritter Satz um Beschreibung zu verlängern. Vierter Satz um Beschreibung zu verlängern.",
      portions: 2,
      energy_kcal: 2300,
      proteins: 150,
      saturatedFat: 25,
      unsaturatedFat: 75,
      carbohydrates: 200,
      image: "./assets/img/recipeTest.jpg",
    },
    {
      id: 2,
      title: "Rezept längerer Name2",
      ingredients: "75g Möhre, 150g Brokkoli, 75g Blumenkohl",
      rating: 4.5,
      uses: 19,
      tag: "Definieren",
      portions: 4,
      description: "Testbeschreibung des zweiten Rezeptes",
      energy_kcal: 2300,
      proteins: 150,
      saturatedFat: 25,
      unsaturatedFat: 75,
      carbohydrates: 200,
      image: "./assets/img/recipeTest.jpg",
    },
  ];
  const [shownRecipes, setShownRecipes] = React.useState(recipes);

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
    };

  const filterRecipes = (filter: String) => {
    if (filter === "Aufbauen") {
      setShownRecipes(recipes.filter((recipe) => recipe.tag === "Aufbauen"));
    } else if (filter === "Definieren") {
      setShownRecipes(recipes.filter((recipe) => recipe.tag === "Definieren"));
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
        {shownRecipes.map((recipe) => (
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
                <img src={recipe.image} alt={recipe.title} width="10%" />
                <Box sx={{ paddingLeft: "5%" }}>
                  <Typography
                    sx={{ fontSize: "150%", width: "100%", flexShrink: 0 }}
                  >
                    {recipe.title}
                  </Typography>
                  <Rating
                    size="medium"
                    precision={0.1}
                    value={ratingValues[recipe.id] || recipe.rating}
                    onChange={handleRatingChange(recipe.id)}
                  />
                  <Typography sx={{ color: "text.secondary" }}>
                    {recipe.tag}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: "text.secondary" }}>
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
                <Box sx={{ minWidth: "25%" }}>
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
                        recipe.energy_kcal / recipe.portions
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