import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";

export interface BasicFoodFieldProps {
  label: string;
  value: string;
  buttonText: string;
  setValue: (value: string) => void;
  hasError: boolean;
  errorText: string;
  width: string;
}

export const BasicFoodField = (props: BasicFoodFieldProps) => {
  const theme = useTheme();

  return (
    <TextField
      variant="standard"
      label={props.label}
      value={props.value}
      sx={{
        background: "white",
        width: props.width,
      }}
      onChange={(event) => {
        props.setValue(event.target.value);
      }}
      InputLabelProps={{
        shrink: true,
      }}
      error={props.hasError}
      helperText={props.hasError && props.errorText}
    />
  );
};
