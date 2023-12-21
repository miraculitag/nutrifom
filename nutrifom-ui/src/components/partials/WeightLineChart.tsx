import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/de";
import { useTheme } from "@mui/material";
import { useAuthHeader } from "react-auth-kit";
import { getWeightHistory } from "../../api";
import { useState } from "react";
import React from "react";
import { WeightRequest } from "../../types";

dayjs.extend(localizedFormat);

export default function WeightLineChart() {
  const theme = useTheme();
  const auth = useAuthHeader();
  const [weightHistory, setWeightHistory] = useState<WeightRequest[]>([]);

  const customize = {
    height: 540,
    legend: { hidden: true },
    margin: { top: 5 },
  };

  React.useEffect(() => {
    getWeightHistory(auth())
      .then((response) => {
        setWeightHistory(response.data);
      })
      .catch((error) => {
        console.log("Fehler:", error);
      });
  }, [auth]);

  const last14Days = Array.from({ length: 14 }, (_, index) =>
    dayjs().subtract(index, "day").format("YYYY-MM-DD")
  ).reverse();

  const dataPoints = last14Days.map((date) => {
    const weightData = weightHistory.find(
      (entry) => dayjs(entry.entryDate).format("YYYY-MM-DD") === date
    );

    return weightData ? weightData.weight : null

  });

/*
          yAxis={[{ 
            min: minValue, 
            max: maxValue 
          }]}*/ 
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

          series={[
            {              
              data:dataPoints,
              color: theme.palette.primary.main,
            },
          ]}
          {...customize}
        />
      )}
    </>
  );
}
