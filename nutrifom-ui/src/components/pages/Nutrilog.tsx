import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import FoodTable from "../partials/FoodTable";
import { NutritionalTable } from "../common/NutritionalTable";
import { Layout } from "../layout/Layout";
import KcalFoodChart from "../partials/KcalFoodChart";
import {
  getNutrilog,
} from "../../api";
import { useAuthHeader } from "react-auth-kit";
import { NurtilogEntryRequest } from "../../types";
import { useUser } from "../../userContext";
import FoodSearch from "../partials/FoodSearch";
import RecepieSearch from "../partials/RecepieSearch";

export const Nutrilog = () => {
  const theme = useTheme();
  const auth = useAuthHeader();
  const { user } = useUser();
  const [kcalGoal, setKcalGoal] = React.useState<number>(0);
  const [selectedFood, setSelectedFood] =
    React.useState<NurtilogEntryRequest | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const sevenDaysAgo = dayjs().subtract(7, "day");

  const [nutrilog, setNutrilog] = React.useState<NurtilogEntryRequest[]>([]);

  React.useEffect(() => {
    setLocalStates();
  }, []);



  React.useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      getNutrilog(formattedDate, auth())
        .then((response) => {
          setNutrilog(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.log("Fehler beim Abrufen des nutrilogs:", error);
        });
    }
  }, [selectedDate, auth]);


  const setLocalStates = () => {
    if (user) {
      setKcalGoal(
        2000
      );
    }
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      getNutrilog(formattedDate, auth())
        .then((response) => {
          setNutrilog(response.data);
        })
        .catch((error) => {
          console.log("Fehler beim Abrufen des nutrilogs (initial):", error);
        });
    }
  };

  const handleRowClick = (index: number) => {
    setSelectedFood(nutrilog[index]);
  };

  const handleChangeDateMinusOne = () => {
    if (selectedDate) {
      const daysDifference = dayjs().diff(selectedDate, "day");
      if (daysDifference < 7) {
        const newDate = selectedDate.subtract(1, "day");
        setSelectedDate(newDate);
      }
    }
  };

  const handleChangeDatePlusOne = () => {
    if (selectedDate) {
      const newDate = selectedDate.add(1, "day");
      setSelectedDate(newDate);
  };}

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
        <FoodSearch/>
        </Box>
        
        <Box sx={{ gridArea: "Recepie" }}>
          <RecepieSearch/>
        </Box>

        <Box sx={{ gridArea: "PieChart", height: "100%" }}>
          <KcalFoodChart totalKcal={kcalGoal} consumedKcal={Math.round(250)} />
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
          <FoodTable nutrilogItems={nutrilog} onSelectRow={handleRowClick} />
        </Box>

        <Box sx={{ gridArea: "Nutrition" }}>
          <Box sx={{ marginBottom: "2%" }}>
            <Typography>Nährwerte</Typography>
          </Box>
          <NutritionalTable
            energy_kcal={selectedFood ? selectedFood.energy_kcal : 100}
            proteins={Math.round(selectedFood ? selectedFood.proteins : 0)}
            saturatedFat={Math.round(
              selectedFood ? selectedFood.saturated_fat : 0
            )}
            unsaturatedFat={Math.round(
              selectedFood ? selectedFood.unsaturated_fat : 0
            )}
            carbohydrates={Math.round(
              selectedFood ? selectedFood.carbohydrates : 0
            )}
          />
        </Box>
      </Box>
    </Layout>
  );
};
