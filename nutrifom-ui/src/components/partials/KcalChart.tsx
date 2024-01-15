import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";
import { KcalChartLabel } from "./KcalChartLabel";

export interface KcalChartProps {
  kcalGoal: number;
  consumedKcal: number;
}

export const KcalChart = (props: KcalChartProps) => {
  const [remainingKcal, setRemainingKcal] = React.useState<number>(0);
  const [overConsumedKcal, setOverConsumedKcal] = React.useState<number>(0);
  const [outerSectionPlaceholder, setOuterSectionPlaceholder] =
    React.useState<number>(0);

  const theme = useTheme();

  React.useEffect(() => {
    if (props.kcalGoal >= props.consumedKcal) {
      setRemainingKcal(props.kcalGoal - props.consumedKcal);
      setOverConsumedKcal(0);
      setOuterSectionPlaceholder(0);
    } else {
      setOverConsumedKcal(props.consumedKcal - props.kcalGoal);
      setOuterSectionPlaceholder(props.kcalGoal - overConsumedKcal);
      setRemainingKcal(0);
    }
  }, [props.kcalGoal, props.consumedKcal, overConsumedKcal]);

  const outerSectionData = [
    { value: overConsumedKcal, color: "red" },
    { value: outerSectionPlaceholder, color: "white" },
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
            data: outerSectionData,
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
        <KcalChartLabel
          label={[`${props.consumedKcal} von `, `${props.kcalGoal} kcal`]}
        />
      </PieChart>
    </>
  );
};
