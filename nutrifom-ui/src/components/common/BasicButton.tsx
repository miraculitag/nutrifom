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
        backgroundColor: theme.palette.primary.main,
        color: "white",
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
          color: "black",
        },
      }}
    >
      {props.label}
    </Button>
  );
}
