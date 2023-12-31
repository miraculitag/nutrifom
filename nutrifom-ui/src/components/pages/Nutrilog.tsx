import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import FoodTable from "../partials/FoodTable";
import { NutritionalTable } from "../common/NutritionalTable";
import { Layout } from "../layout/Layout";
import KcalFoodChart from "../partials/KcalFoodChart";
import { getNutrilog } from "../../api";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { NutritionData } from "../../types";
import { useUser } from "../../userContext";
import FoodSearch from "../partials/FoodSearch";
import RecepieSearch from "../partials/RecepieSearch";
import { useNavigate } from "react-router-dom";

export const Nutrilog = () => {
  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [kcalGoal, setKcalGoal] = React.useState<number>(0);
  const [selectedFood, setSelectedFood] = React.useState<any | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const sevenDaysAgo = dayjs().subtract(7, "day");
  const [nutrilog, setNutrilog] = React.useState<NutritionData>();
  const [allNutrilogItems, setAllNutrilogItems] = React.useState([[], []]);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const { user, hasFetchedUser } = useUser();

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
    if (selectedDate) {
      setSelectedFood(undefined);
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      getNutrilog(formattedDate, auth(), signOut, navigate)
        .then((response) => {
          setNutrilog(response.data);
          setAllNutrilogItems([
            ...(response.data?.products || []),
            ...(response.data?.recipes || []),
          ]);
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen des nutrilogs:", error);
        });
    }
  }, [selectedDate]);

  React.useEffect(() => {
    if (selectedRow != null) {
      setSelectedFood(allNutrilogItems[selectedRow]);
    } else {
      setSelectedFood(null);
    }
  }, [selectedRow]);

  const handleRowClick = (index: number) => {
    if (index === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const handleChangeDateMinusOne = () => {
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

  const handleAddEntry = async () => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await getNutrilog(
        formattedDate,
        auth(),
        signOut,
        navigate
      );
      setNutrilog(response.data);
      setAllNutrilogItems([
        ...(response.data?.products || []),
        ...(response.data?.recipes || []),
      ]);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateAreas: `"Food Recepie PieChart"
        "Foodlog Foodlog Nutrition"`,
          columnGap: 5,
          rowGap: 8,
        }}
      >
        <Box sx={{ gridArea: "Food" }}>
          <FoodSearch
            selectedDate={selectedDate}
            onNutrilogUpdate={handleAddEntry}
          />
        </Box>

        <Box sx={{ gridArea: "Recepie" }}>
          <RecepieSearch
            selectedDate={selectedDate}
            onNutrilogUpdate={handleAddEntry}
          />
        </Box>

        <Box sx={{ gridArea: "PieChart", height: "100%" }}>
          <KcalFoodChart
            totalKcal={kcalGoal}
            consumedKcal={Math.round(nutrilog?.totalEnergyKcal || 0)}
          />
        </Box>

        <Box sx={{ gridArea: "Foodlog" }}>
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
          <FoodTable
            nutrilogItems={allNutrilogItems}
            onSelectRow={handleRowClick}
            selectedRow={selectedRow}
          ></FoodTable>
        </Box>

        <Box sx={{ gridArea: "Nutrition" }}>
          <Box sx={{ marginBottom: "2%" }}>
            <Typography>Nährwerte</Typography>
          </Box>
          <NutritionalTable
            energy_kcal={Math.round(
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
