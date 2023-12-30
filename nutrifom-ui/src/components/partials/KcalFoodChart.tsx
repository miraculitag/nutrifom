import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled, useTheme } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts";

export interface KcalFoodChartProps {
  totalKcal: number;
  consumedKcal: number;
}

const StyledText = styled("text")(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fontFamily: theme.typography.fontFamily,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  const lineHeight = 20;
  const textLines = React.Children.toArray(children);

  return (
    <StyledText x={left + width / 2} y={top + height / 2 - lineHeight / 2}>
      {textLines.map((line, index) => (
        <tspan
          key={index}
          dy={index === 0 ? 0 : lineHeight}
          x={left + width / 2}
        >
          {line}
        </tspan>
      ))}
    </StyledText>
  );
}

export default function KalcFoodChart(props: KcalFoodChartProps) {
  const theme = useTheme();
  const [remainingKcal, setRemainingKcal] = React.useState(0);
  const [overConsumedKcal, setOverConsumedKcal] = React.useState(0);
  const [overConsumedRemainingKcal, setOverConsumedRemainingKcal] =
    React.useState(0);

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
      label: "Verzehrt",
      color: theme.palette.primary.main,
    },
    { value: remainingKcal, label: "Verbleibend", color: "lightgrey" },
  ];

  return (
    <>
      <PieChart
        margin={{ left: 60 }}
        series={[
          {
            data,
            outerRadius: 70,
            innerRadius: 50,
          },
          {
            data: overconsumedData,
            innerRadius: 70,
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
        <PieCenterLabel>
          {[`${props.consumedKcal} von `, `${props.totalKcal} kcal`]}
        </PieCenterLabel>
      </PieChart>
    </>
  );
}
