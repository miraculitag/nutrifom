import { InfoOutlined } from "@mui/icons-material";
import {
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export interface DropDownProps {
  title: string;
  width: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
  infoIcon?: boolean;
  isInfoIconClicked?: boolean;
  setIsInfoIconClicked?: (isInfoIconClicked: boolean) => void;
}

export default function DropDownMenu(props: DropDownProps) {
  const theme = useTheme();

  return (
    <FormControl variant="standard" sx={{ width: props.width }}>
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
}
