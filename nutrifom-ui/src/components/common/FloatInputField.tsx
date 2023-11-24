import { InputAdornment, TextField, Typography } from "@mui/material";

export interface FloatInputFieldProps {
  label: string;
  suffix: string;
  width: string;
  value: number;
  setValue: (value: number) => void;
  required: boolean;
  hasError: boolean;
  errorText: string;
}

export const FloatInputField = (props: FloatInputFieldProps) => {
  return (
    <TextField
      type="number"
      required={props.required}
      variant="standard"
      label={props.label}
      value={props.value}
      sx={{
        width: props.width,
        background: "white",
      }}
      onChange={(e) => {
        props.setValue(parseFloat(e.target.value));
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Typography sx={{ color: "black" }}>{props.suffix}</Typography>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
      error={props.hasError}
      helperText={props.hasError && props.errorText}
    />
  );
};
