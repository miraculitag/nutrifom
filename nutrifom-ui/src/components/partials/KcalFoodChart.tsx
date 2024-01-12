import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";
import { KcalFoodChartLabel } from "./KcalFoodChartLabel";

export interface KcalFoodChartProps {
  kcalGoal: number;
  consumedKcal: number;
}

export const KcalFoodChart = (props: KcalFoodChartProps) => {
  const [remainingKcal, setRemainingKcal] = React.useState<number>(0);
  const [overConsumedKcal, setOverConsumedKcal] = React.useState<number>(0);
  const [overConsumedKcalRemaining, setOverConsumedKcalRemaining] =
    React.useState<number>(0);

  const theme = useTheme();

  React.useEffect(() => {
    if (props.kcalGoal >= props.consumedKcal) {
      setRemainingKcal(props.kcalGoal - props.consumedKcal);
      setOverConsumedKcal(0);
      setOverConsumedKcalRemaining(0);
    } else {
      setOverConsumedKcal(props.consumedKcal - props.kcalGoal);
      setOverConsumedKcalRemaining(props.kcalGoal - overConsumedKcal);
      setRemainingKcal(0);
    }
  }, [props.kcalGoal, props.consumedKcal, overConsumedKcal]);

  const overconsumedData = [
    { value: overConsumedKcal, color: "red" },
    { value: overConsumedKcalRemaining, color: "white" },
  ];

  const data = [
    {
      value: props.consumedKcal,
      color: theme.palette.primary.main,
    },
    {
      value: remainingKcal,
      color: "lightgrey",
    },
  ];

  return (
    <>
      <PieChart
        margin={{ left: 60 }}
        series={[
          {
            data,
            outerRadius: 75,
            innerRadius: 50,
          },
          {
            data: overconsumedData,
            innerRadius: 80,
            outerRadius: 65,
          },
        ]}
        sx={{
          position: "absolute",
        }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
        tooltip={{ trigger: "none" }}
      >
        <KcalFoodChartLabel
          label={[`${props.consumedKcal} von `, `${props.kcalGoal} kcal`]}
        />
      </PieChart>
    </>
  );
};
