import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled, useTheme } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts";

export interface BasicPieChartProps {
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
  const lineHeight = 20; // adjust as needed
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

export default function BasicPie(props: BasicPieChartProps) {
  const theme = useTheme();
  const remainingKcal = props.totalKcal - props.consumedKcal;
  const data = [
    { value: props.consumedKcal, label: "Consumed" },
    { value: remainingKcal, label: "Remaining" },
  ];

  return (
    <>
      <PieChart
       margin={{left: 60}}

        series={[
          {
            data,
            innerRadius: 70,
          },
        ]}
        colors={[theme.palette.primary.main, "lightgrey"]}
        sx={{
          position: "absolute",
        }}
        slotProps={{
          legend: {
            hidden: true,
          },          
        }}
      >
        <PieCenterLabel>
          {[`${props.consumedKcal} von `, `${props.totalKcal} kcal`]}
        </PieCenterLabel>
      </PieChart>
    </>
  );
}
