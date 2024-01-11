import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import "dayjs/locale/de";
import {
  getWeightHistory,
  handleTokenExpiration,
  isTokenExpired,
} from "../../api";
import { WeightRequest } from "../../types";

interface WeightLineChartProps {
  weightUpdate: number;
}

export const WeightLineChart = (props: WeightLineChartProps) => {
  const [weightHistory, setWeightHistory] = React.useState<WeightRequest[]>([]);

  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (isTokenExpired(auth())) {
      handleTokenExpiration(signOut, navigate);
    } else {
      getWeightHistory(auth()).then((response) => {
        setWeightHistory(response.data);
      });
    }
  }, [props.weightUpdate]);

  const customize = {
    height: 540,
    legend: { hidden: true },
    margin: { top: 5 },
  };

  //Structure from ChatGPT 3.5
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

  //Idea from ChatGPT 3.5
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
};
