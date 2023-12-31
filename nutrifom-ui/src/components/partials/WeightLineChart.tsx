import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/de";
import { useTheme } from "@mui/material";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { getWeightHistory } from "../../api";
import { useState } from "react";
import React from "react";
import { WeightRequest } from "../../types";
import { useNavigate } from "react-router-dom";

dayjs.extend(localizedFormat);

interface WeightLineChartProps {
  weightUpdate: number;
}

export default function WeightLineChart(props: WeightLineChartProps) {
  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [weightHistory, setWeightHistory] = useState<WeightRequest[]>([]);

  const customize = {
    height: 540,
    legend: { hidden: true },
    margin: { top: 5 },
  };

  React.useEffect(() => {
    getWeightHistory(auth(), signOut, navigate)
      .then((response) => {
        setWeightHistory(response.data);
      })
      .catch((error) => {
        console.log("Fehler:", error);
      });
  }, [props.weightUpdate]);

  const last14Days = Array.from({ length: 14 }, (_, index) =>
    dayjs().subtract(index, "day").format("YYYY-MM-DD")
  ).reverse();

  const dataPoints = last14Days.map((date) => {
    const weightData = weightHistory.find(
      (entry) => dayjs(entry.entryDate).format("YYYY-MM-DD") === date
    );

    return weightData ? weightData.weight : null;
  });

  const filteredDataPoints = dataPoints.map((value) =>
    value !== null ? value : 0
  );
  const maxValue =
    Math.max(...filteredDataPoints) >= 110
      ? Math.max(...filteredDataPoints) * 1.1
      : 110;

  return (
    <>
      {dataPoints.length > 0 && (
        <LineChart
          sx={{
            ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)": {
              fill: theme.palette.primary.light,
            },
          }}
          xAxis={[
            {
              data: last14Days,
              valueFormatter: (date) => dayjs(date).format("DD.MM"),
              scaleType: "point",
            },
          ]}
          yAxis={[
            {
              min: 40,
              max: maxValue,
            },
          ]}
          series={[
            {
              data: dataPoints,
              valueFormatter: (value) =>
                value == null ? "n.a." : value.toString() + " kg",
              color: theme.palette.primary.main,
            },
          ]}
          {...customize}
        />
      )}
    </>
  );
}
