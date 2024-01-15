import { Button, useTheme } from "@mui/material";

export interface BasicButtonProps {
  label: string;
  width: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isButtonClicked?: boolean;
}

export const BasicButton = (props: BasicButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      onClick={(e) => props.onButtonClick(e)}
      sx={{
        width: props.width,
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
};
