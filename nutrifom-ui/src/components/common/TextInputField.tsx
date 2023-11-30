import { InputAdornment, TextField, Typography } from "@mui/material";

export interface TextInputFieldProps {
  label: string;
  width: string;
  value: string;
  setValue: (value: string) => void;
  required: boolean;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  hasError?: boolean;
  errorText?: string;
}

export const TextInputField = (props: TextInputFieldProps) => {
  return (
    <TextField
      variant="standard"
      label={props.label}
      value={props.value}
      type={props.type}
      required={props.required}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      sx={{
        width: props.width,
        background: "white",
      }}
      onChange={(e) => {
        props.setValue(e.target.value);
      }}
      InputLabelProps={{
        shrink: true,
      }}
      error={props.hasError}
      helperText={props.hasError && props.errorText}
    />
  );
};
