import { Button, useTheme } from "@mui/material";

export interface BasicButtonProps {
  label: string;
  isButtonClicked: boolean;
  onButtonClick: () => void;
}

export default function BasicButton(props: BasicButtonProps) {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      onClick={props.onButtonClick}
      sx={{
        width: "250px",
        backgroundColor: props.isButtonClicked
          ? "primary.secondary"
          : "primary.main",
        color: "white",
        "&:hover": {
          color: "black",
        },
      }}
    >
      {props.label}
    </Button>
  );
}
