import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { Box, Typography, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs, { Dayjs } from "dayjs";
import { getNutrilog, handleTokenExpiration, isTokenExpired } from "../../api";
import { FoodEntry, NutritionData, Recipe } from "../../types";
import { useUser } from "../../userContext";
import { NutritionalTable } from "../common/NutritionalTable";
import { Layout } from "../layout/Layout";
import { NutrilogTable } from "../partials/NutrilogTable";
import { FoodSearch } from "../partials/FoodSearch";
import { RecipeSearch } from "../partials/RecipeSearch";
import { KcalChart } from "../partials/KcalChart";

export const Nutrilog = () => {
  const [kcalGoal, setKcalGoal] = React.useState<number>(0);
  const [selectedFood, setSelectedFood] = React.useState<any | null>(null);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [nutrilog, setNutrilog] = React.useState<NutritionData>();
  const [allNutrilogItems, setAllNutrilogItems] = React.useState<
    (FoodEntry | Recipe)[]
  >([...(nutrilog?.products || []), ...(nutrilog?.recipes || [])]);

  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { user, hasFetchedUser } = useUser();

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (isTokenExpired(auth())) {
      handleTokenExpiration(signOut, navigate);
    } else {
      handleNutrilogUpdate();
    }
  }, [selectedDate]);

  React.useEffect(() => {
    if (user) {
      setKcalGoal(
        user.kcalGoal !== undefined && user.kcalGoal !== 0
          ? user.kcalGoal
          : 2000
      );
    }
  }, [user, hasFetchedUser]);

  React.useEffect(() => {
    if (selectedRow != null) {
      setSelectedFood(allNutrilogItems[selectedRow]);
    } else {
      setSelectedFood(null);
    }
  }, [selectedRow, allNutrilogItems]);

  const sevenDaysAgo = dayjs().subtract(7, "day");

  const handleRowClick = (index: number) => {
    if (index === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const handleNutrilogUpdate = async () => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await getNutrilog(formattedDate, auth());
      setNutrilog(response.data);
      setAllNutrilogItems([
        ...(response.data?.products || []),
        ...(response.data?.recipes || []),
      ]);
    }
  };

  const handleChangeDateMinusOne = () => {
    //Structure from ChatGPT 3.5
    if (selectedDate) {
      const daysDifference = dayjs().diff(selectedDate, "day");
      if (daysDifference < 7) {
        const newDate = selectedDate.subtract(1, "day");
        setSelectedDate(newDate);
        setSelectedRow(null);
      }
    }
  };

  const handleChangeDatePlusOne = () => {
    if (selectedDate) {
      const newDate = selectedDate.add(1, "day");
      setSelectedDate(newDate);
      setSelectedRow(null);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateAreas: `"FoodSearch RecipeSearch KcalFoodChart"
        "NutrilogTable NutrilogTable NutritionalTable"`,
          columnGap: 5,
          rowGap: 8,
        }}
      >
        <Box sx={{ gridArea: "FoodSearch" }}>
          <FoodSearch
            selectedDate={selectedDate}
            nutrilogUpdate={handleNutrilogUpdate}
          />
        </Box>

        <Box sx={{ gridArea: "RecipeSearch" }}>
          <RecipeSearch
            selectedDate={selectedDate}
            nutrilogUpdate={handleNutrilogUpdate}
          />
        </Box>

        <Box sx={{ gridArea: "KcalFoodChart", height: "100%" }}>
          <KcalChart
            kcalGoal={kcalGoal}
            consumedKcal={Math.round(nutrilog?.totalEnergyKcal || 0)}
          />
        </Box>

        <Box sx={{ gridArea: "NutrilogTable" }}>
          <Box sx={{ display: "flex", marginBottom: "2%" }}>
            <Typography>Lebenmittel & Rezepte</Typography>
            {selectedDate &&
            !dayjs(selectedDate).isSame(sevenDaysAgo, "day") ? (
              <ArrowBackIosNewIcon
                sx={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  background: theme.palette.primary.main,
                  color: "white",
                }}
                onClick={handleChangeDateMinusOne}
              />
            ) : (
              <ArrowBackIosNewIcon
                sx={{
                  marginLeft: "1%",
                  marginRight: "1%",
                  color: "white",
                }}
              />
            )}

            <Typography>{selectedDate?.format("DD.MM.YYYY")}</Typography>
            {selectedDate && !dayjs(selectedDate).isSame(dayjs(), "day") && (
              <ArrowForwardIosIcon
                sx={{
                  background: theme.palette.primary.main,
                  color: "white",
                  marginLeft: "1%",
                }}
                onClick={handleChangeDatePlusOne}
              ></ArrowForwardIosIcon>
            )}
          </Box>
          <NutrilogTable
            nutrilogItems={allNutrilogItems}
            handleSelectRow={handleRowClick}
            selectedRow={selectedRow}
          />
        </Box>

        <Box sx={{ gridArea: "NutritionalTable" }}>
          <Box sx={{ marginBottom: "2%" }}>
            <Typography>Nährwerte</Typography>
          </Box>
          <NutritionalTable
            energyKcal={Math.round(
              selectedFood
                ? selectedFood.energyKcal
                : nutrilog?.totalEnergyKcal || 0
            )}
            proteins={Math.round(
              selectedFood
                ? selectedFood.proteins
                : nutrilog?.totalProteins || 0
            )}
            saturatedFat={Math.round(
              selectedFood
                ? selectedFood.saturatedFat
                : nutrilog?.totalSaturatedFat || 0
            )}
            unsaturatedFat={Math.round(
              selectedFood
                ? selectedFood.unsaturatedFat
                : nutrilog?.totalUnsaturatedFat || 0
            )}
            carbohydrates={Math.round(
              selectedFood
                ? selectedFood.carbohydrates
                : nutrilog?.totalCarbohydrates || 0
            )}
          />
        </Box>
      </Box>
    </Layout>
  );
};
