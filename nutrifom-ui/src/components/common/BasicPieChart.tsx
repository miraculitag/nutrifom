import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled, useTheme } from '@mui/material/styles';
import { useDrawingArea } from '@mui/x-charts';

export interface BasicPieChartProps {
    kcal: number;
}

const StyledText = styled('text')(({ theme }) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontFamily:theme.typography.fontFamily
  }));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

export default function BasicPie(props: BasicPieChartProps) {
  const theme = useTheme(); 

    const data = [
        { value: 500, },
        { value: 1200, },
      ];

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 60
        },
      ]}
      colors={[theme.palette.primary.main,'lightgrey']}
    >
    <PieCenterLabel>{props.kcal}{` kcal`}</PieCenterLabel>
    </PieChart>
  );
}
