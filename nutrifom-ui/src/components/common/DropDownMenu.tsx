import {
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export interface DropDownProps {
  title: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

export default function DropDownMenu(props: DropDownProps) {
  const theme = useTheme();

  return (
    <FormControl variant="standard" sx={{ width: "250px" }}>
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
