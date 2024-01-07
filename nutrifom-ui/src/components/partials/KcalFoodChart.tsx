import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";
import { KcalFoodChartLabel } from "./KcalFoodChartLabel";

export interface KcalFoodChartProps {
  totalKcal: number;
  consumedKcal: number;
}

export const KcalFoodChart = (props: KcalFoodChartProps) => {
  const [remainingKcal, setRemainingKcal] = React.useState(0);
  const [overConsumedKcal, setOverConsumedKcal] = React.useState(0);
  const [overConsumedRemainingKcal, setOverConsumedRemainingKcal] =
    React.useState(0);

  const theme = useTheme();

  React.useEffect(() => {
    if (props.totalKcal >= props.consumedKcal) {
      setRemainingKcal(props.totalKcal - props.consumedKcal);
      setOverConsumedKcal(0);
      setOverConsumedRemainingKcal(0);
    } else {
      setRemainingKcal(0);
      setOverConsumedKcal(props.consumedKcal - props.totalKcal);
      setOverConsumedRemainingKcal(props.totalKcal - overConsumedKcal);
    }
  }, [props.totalKcal, props.consumedKcal, overConsumedKcal]);

  const overconsumedData = [
    { value: overConsumedKcal, color: "red" },
    { value: overConsumedRemainingKcal, color: "white" },
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
          label={[`${props.consumedKcal} von `, `${props.totalKcal} kcal`]}
        />
      </PieChart>
    </>
  );
};
