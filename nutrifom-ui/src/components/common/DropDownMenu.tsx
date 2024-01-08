import {
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export interface DropDownProps {
  title: string;
  width: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
  infoIcon?: boolean;
  isInfoIconClicked?: boolean;
  setIsInfoIconClicked?: (isInfoIconClicked: boolean) => void;
  required: boolean;
  hasError?: boolean;
  errorText?: string;
}

export const DropDownMenu = (props: DropDownProps) => {
  const theme = useTheme();

  return (
    <FormControl
      variant="standard"
      required={props.required}
      sx={{ width: props.width }}
    >
      {props.infoIcon && (
        <InfoOutlined
          sx={{
            position: "absolute",
            top: "0%",
            right: "0%",
            fontSize: "medium",
            color: theme.palette.primary.main,
          }}
          onClick={() =>
            props.setIsInfoIconClicked &&
            props.setIsInfoIconClicked(!props.isInfoIconClicked)
          }
        />
      )}
      <InputLabel>{props.title}</InputLabel>
      <Select
        value={props.value}
        error={props.hasError}
        onChange={(e) => props.setValue(e.target.value)}
      >
        {props.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
