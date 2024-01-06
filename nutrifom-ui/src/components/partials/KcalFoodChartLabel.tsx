import { styled } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts";

const StyledText = styled("text")(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fontFamily: theme.typography.fontFamily,
}));

interface KcalFoodChartLabelProps {
  label: [string, string];
}

export const KcalFoodChartLabel = (props: KcalFoodChartLabelProps) => {
  const { width, height, left, top } = useDrawingArea();

  const lineHeight = 20;

  return (
    <StyledText x={left + width / 2} y={top + height / 2 - lineHeight / 2}>
      {props.label.map((line, index) => (
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
};
